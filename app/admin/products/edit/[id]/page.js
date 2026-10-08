"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const productId = params.id;

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch product
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/${productId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product."
          );
        }

        const product = data.product;

        setName(product.name || "");
        setSlug(product.slug || "");
        setCategory(product.category || "");
        setDescription(product.description || "");
        setImage(product.image || "");
        setImagePreview(
          product.image || "/images/product-one.jpg"
        );
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Upload new image
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    setUploading(true);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Image upload failed."
        );
      }

      setImage(data.imageUrl);
    } catch (error) {
      console.error(error);

      setError(error.message);

      setImagePreview(image || "/images/product-one.jpg");
    } finally {
      setUploading(false);
    }
  };

  // Update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (uploading) {
      setError(
        "Please wait until the image upload finishes."
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            slug,
            category,
            description,
            image,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product."
        );
      }

      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <AdminSidebar />

        <div className="lg:ml-64 pt-20 lg:pt-0 px-5 sm:px-8 py-8 lg:py-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <p className="text-slate-500">
              Loading product...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="lg:ml-64 pt-20 lg:pt-0 px-5 sm:px-8 py-8 lg:py-12">

        {/* Header */}
        <div>
          <p className="text-blue-600 font-semibold tracking-wide">
            PRODUCTS
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-700">
            Edit Product
          </h1>

          <p className="mt-2 text-slate-500">
            Update your product information.
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 max-w-3xl bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Product Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={6}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none resize-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Current / New Image */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Product Image
              </label>

              {imagePreview && (
                <div className="mb-5">
                  <div className="w-full max-w-sm h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src={imagePreview}
                      alt={name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 bg-white"
              />

              <p className="mt-2 text-xs text-slate-400">
                Choose a new image to replace the current image.
                Maximum size: 5MB.
              </p>

              {uploading && (
                <p className="mt-3 text-blue-600 text-sm font-medium">
                  Uploading new image...
                </p>
              )}

              {image && !uploading && (
                <p className="mt-3 text-green-600 text-sm font-medium">
                  ✓ Image ready
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-red-600 text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={saving || uploading}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving
                  ? "Saving..."
                  : uploading
                  ? "Uploading..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push("/admin/products")
                }
                className="border border-slate-300 bg-white text-slate-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>
    </main>
  );
}