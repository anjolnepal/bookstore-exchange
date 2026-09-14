'use client';

import { useRef, useState } from 'react';

export default function NewListingForm() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    stock: '',
    genre: '',
    type: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let coverImageUrl = '';

      if (coverImage) {
        const imageFormData = new FormData();

        imageFormData.append('file', coverImage);

        imageFormData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: imageFormData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();

        if (!cloudinaryResponse.ok) {
          throw new Error(
            cloudinaryData.error?.message || 'Image upload failed'
          );
        }

        coverImageUrl = cloudinaryData.secure_url;
      }

      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          description: formData.description,
          price: Number(formData.price),
          coverImageUrl: coverImageUrl,
          stock: Number(formData.stock),
          genre: formData.genre,
          type: formData.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to list book.');
      }

      setSuccess('Book listed successfully!');

      setFormData({
        title: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        genre: '',
        type: '',
      });

      setCoverImage(null);
      setCoverImagePreview('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  function handleBookCover(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setCoverImage(file);

    const previewUrl = URL.createObjectURL(file);
    setCoverImagePreview(previewUrl);
  }

  return (
    <>
      <h2 className="text-center p-5 text-4xl">List Your Book</h2>
      <br />
      <form onSubmit={handleSubmit} className="w-full max-w-[530px] mx-auto">
        {/* TITLE */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            TITLE
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full h-9 border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
          />
        </div>

        {/* AUTHOR */}
        <div className="mb-5">
          <label
            htmlFor="author"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            AUTHOR
          </label>

          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full h-9 border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
          />
        </div>

        {/* GENRE */}
        <div className="mb-5">
          <label
            htmlFor="genre"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            GENRE
          </label>

          <input
            id="genre"
            name="genre"
            type="text"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g. Fiction, Romance, Mystery"
            required
            className="w-full h-9 border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            DESCRIPTION
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full border border-gray-400 px-3 py-2 text-sm resize-none outline-none focus:border-gray-700"
          />
        </div>

        {/* PRICE */}
        <div className="mb-5">
          <label
            htmlFor="price"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            PRICE
          </label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full h-9 border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
          />
        </div>

        <div className="relative mb-5">
          <label
            htmlFor="type"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            Select Type:
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full h-9 border border-gray-400 px-3 pr-8 text-sm bg-white outline-none focus:border-gray-700 appearance-none"
            >
              <option value="new">New</option>
              <option value="exchange">Exchange</option>
            </select>
            <span className="absolute right-3 top-1/2  pointer-events-none text-gray-600">
              ▾
            </span>
          </label>
        </div>

        {/* STOCK */}
        <div className="mb-5">
          <label
            htmlFor="stock"
            className="block text-xs font-medium text-gray-700 mb-2"
          >
            STOCK
          </label>

          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full h-9 border border-gray-400 px-3 text-sm outline-none focus:border-gray-700"
          />
        </div>

        <label
          htmlFor="book-cover"
          className="flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
        >
          {coverImagePreview ? (
            <img
              src={coverImagePreview}
              alt="Book cover"
              className="h-full w-full rounded-lg object-contain"
            />
          ) : (
            <span className="text-gray-500">
              No image selected — Click to upload
            </span>
          )}
        </label>

        <input
          id="book-cover"
          type="file"
          accept="image/*"
          onChange={handleBookCover}
          className="hidden"
        />

        {/* ERROR */}
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {/* SUCCESS */}
        {success && <p className="mb-4 text-sm text-green-600">{success}</p>}
        <br />
        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 border border-gray-500 bg-gray-100 text-sm text-[#155b87] hover:bg-gray-200 disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Listing'}
        </button>
      </form>
    </>
  );
}
