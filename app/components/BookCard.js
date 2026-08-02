// app/components/BookCard.js
//
// This is a "component" — a reusable piece of UI. Instead of writing the same
// card markup 6 times on the homepage, we write it once here and pass in
// different data each time using "props" (short for properties).
//
// Usage example:
//   <BookCard title="Dune" author="Frank Herbert" price={14.99} emoji="🪐" />

export default function BookCard({ title, author, price, emoji, type }) {
  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden border border-gray-100">
      {/* Cover placeholder — swap this for a real <img> once Cloudinary is wired in */}
      <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-6xl">
        {emoji}
      </div>

      <div className="p-4">
        {/* Small badge showing whether this is a new book or an exchange listing */}
        <span
          className={`inline-block text-xs font-semibold px-2 py-1 rounded-full mb-2 ${
            type === 'exchange'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {type === 'exchange' ? 'For Exchange' : 'New'}
        </span>

        <h3 className="text-lg font-bold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{author}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="text-blue-600 font-bold">
            {type === 'exchange' ? 'Swap' : `$${price.toFixed(2)}`}
          </span>
          <button className="text-sm font-medium bg-gray-900 text-white px-3 py-1.5 rounded-md group-hover:bg-blue-600 transition-colors">
            {type === 'exchange' ? 'Request' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
