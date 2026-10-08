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

// GET - Get single product
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
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
        product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET SINGLE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch product.",
      },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request, { params }) {
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

    const { id } = await params;
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

    await connectDB();

    const existingProduct = await Product.findOne({
      slug: slug.trim(),
      _id: { $ne: id },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Another product already uses this slug.",
        },
        { status: 409 }
      );
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        {
          name: name.trim(),
          slug: slug.trim(),
          category: category.trim(),
          description: description.trim(),
          image:
            image?.trim() ||
            "/images/product-one.jpg",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
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
        message: "Product updated successfully.",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update product.",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete single product
export async function DELETE(request, { params }) {
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

    const { id } = await params;

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
      "DELETE SINGLE PRODUCT ERROR:",
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