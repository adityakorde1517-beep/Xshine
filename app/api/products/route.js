import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

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

// GET - Get all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products.",
      },
      { status: 500 }
    );
  }
}

// POST - Add product
export async function POST(request) {
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

    const body = await request.json();

    const {
      name,
      slug,
      category,
      description,
      image,
    } = body;

    if (
      !name?.trim() ||
      !slug?.trim() ||
      !category?.trim() ||
      !description?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, slug, category and description are required.",
        },
        { status: 400 }
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product name must contain at least 2 characters.",
        },
        { status: 400 }
      );
    }

    if (description.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Description must contain at least 10 characters.",
        },
        { status: 400 }
      );
    }

    const slugPattern =
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    if (!slugPattern.test(slug.trim())) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slug can contain only lowercase letters, numbers and hyphens.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingProduct = await Product.findOne({
      slug: slug.trim(),
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A product with this slug already exists.",
        },
        { status: 409 }
      );
    }

    const product = await Product.create({
      name: name.trim(),
      slug: slug.trim(),
      category: category.trim(),
      description: description.trim(),
      image:
        image?.trim() ||
        "/images/product-one.jpg",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product.",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
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
          message: "Product ID is required.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedProduct =
      await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete product.",
      },
      { status: 500 }
    );
  }
}