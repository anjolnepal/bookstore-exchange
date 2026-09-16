import { notFound } from 'next/navigation';
import { getBookDetails } from '../../lib/books';

export default async function BookDetailsPage({ params }) {
  const { listingId } = await params;

  const book = await getBookDetails({
    id: listingId,
  });

  if (!book) {
    notFound();
  }

  return (
    <div className="max-w-[1120px] w-full mx-auto px-6 md:px-10 lg:px-12 py-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Book Cover */}
        <div className="flex items-center justify-center bg-gray-50 rounded-lg h-[440px] overflow-hidden">
          <img
            src={book.coverImageUrl}
            alt={book.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Book Information */}
        <div className="flex flex-col">

          {/* Type */}
          <span
            className={`stamp ${
              book.type === 'exchange'
                ? 'stamp-exchange'
                : 'stamp-new'
            } self-start`}
          >
            {book.type === 'exchange' ? 'For Exchange' : 'New'}
          </span>

          {/* Title */}
          <h1 className="font-display text-3xl font-semibold mt-4">
            {book.title}
          </h1>

          {/* Author */}
          <p className="text-muted mt-2">
            by {book.author}
          </p>

          {/* Genre */}
          <p className="text-sm text-muted mt-4 mb-5">
            Genre: {book.genre}
          </p>

          {/* Description */}
          <h4>Description</h4>

          <p className="text-gray-700 mt-2 mb-5 leading-7">
            {book.description}
          </p>

          {/* Price / Exchange */}
          <div className="mt-5">
            {book.type === 'exchange' ? (
              <p className="font-semibold text-spine text-xl">
                Available for Exchange
              </p>
            ) : (
              <p className="font-mono font-semibold text-spine text-2xl">
                ${book.price.toFixed(2)}
              </p>
            )}
          </div>

          {/* Stock */}
          <p className="text-sm text-muted mt-3">
            {book.stock > 0
              ? `${book.stock} available`
              : 'Out of stock'}
          </p>

          {/* Button */}
          <button
            disabled={book.stock <= 0 && book.type !== 'exchange'}
            className="mt-6 bg-spine hover:bg-spine-dark disabled:bg-gray-400 text-white font-semibold px-5 py-3 rounded-md transition-colors"
          >
            {book.type === 'exchange'
              ? 'Request Exchange'
              : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  );
}