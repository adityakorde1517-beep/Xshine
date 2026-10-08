import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

function isValidAdmin(request) {
  const token = request.cookies.get("admin_logged_in")?.value;

  if (!token || !process.env.ADMIN_SECRET) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [timestamp, signature] = parts;
  const tokenTime = Number(timestamp);

  if (!Number.isFinite(tokenTime)) {
    return false;
  }

  const tokenAge = Date.now() - tokenTime;

  if (
    tokenAge < 0 ||
    tokenAge > 60 * 60 * 24 * 1000
  ) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.ADMIN_SECRET)
    .update(timestamp)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}

// POST - Customer sends enquiry
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      subject,
      message,
    } = body;

    if (
      !name?.trim() ||
      !phone?.trim() ||
      !subject?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const newContact = await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    console.log("Contact saved:", newContact);
    const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: process.env.RESEND_FROM_EMAIL,
  to: process.env.MANAGER_EMAIL,
  subject: `New Enquiry: ${subject.trim()}`,
  html: `
    <h2>New Customer Enquiry</h2>

    <p><strong>Name:</strong> ${name.trim()}</p>
    <p><strong>Phone:</strong> ${phone.trim()}</p>
    <p><strong>Subject:</strong> ${subject.trim()}</p>

    <h3>Message</h3>
    <p>${message.trim()}</p>
  `,
});

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been submitted successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error occurred.",
      },
      { status: 500 }
    );
  }
}

// GET - Admin gets enquiries
export async function GET(request) {
  try {
    if (!isValidAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin login required.",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        contacts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CONTACT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch messages.",
      },
      { status: 500 }
    );
  }
}

// DELETE - Admin deletes enquiry
export async function DELETE(request) {
  try {
    if (!isValidAdmin(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized. Admin login required.",
        },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Message ID is required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedContact =
      await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE CONTACT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete message.",
      },
      { status: 500 }
    );
  }
}