"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AddProductPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Generate slug automatically
  const handleNameChange = (e) => {
    const value = e.target.value;

    setName(value);

    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(generatedSlug);
  };

  // Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    // Preview
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
      setImagePreview("");
      setImage("");
    } finally {
      setUploading(false);
    }
  };

  // Save product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (uploading) {
      setError("Please wait until the image upload finishes.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
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
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create product."
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
            Add Product
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new product to your website.
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
                onChange={handleNameChange}
                placeholder="Enter product name"
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
                placeholder="product-slug"
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />

              <p className="mt-2 text-xs text-slate-400">
                Automatically generated from product name.
              </p>
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
                placeholder="Enter category"
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
                placeholder="Enter product description"
                rows={6}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-700 outline-none resize-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold text-slate-700 mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-600 bg-white"
              />

              <p className="mt-2 text-xs text-slate-400">
                Maximum file size: 5MB
              </p>

              {/* Upload Status */}
              {uploading && (
                <p className="mt-3 text-blue-600 text-sm font-medium">
                  Uploading image...
                </p>
              )}

              {image && !uploading && (
                <p className="mt-3 text-green-600 text-sm font-medium">
                  ✓ Image uploaded successfully
                </p>
              )}

              {/* Preview */}
              {imagePreview && (
                <div className="mt-5">

                  <p className="text-sm font-semibold text-slate-600 mb-2">
                    Image Preview
                  </p>

                  <div className="w-full max-w-sm h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-contain"
                    />
                  </div>

                </div>
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
                  : "Add Product"}
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