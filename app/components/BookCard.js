
import Link from 'next/link';

const SPINE_PALETTE = [
  ['#3B5470', '#22344A'],
  ['#7A2E2E', '#4E1D1D'],
  ['#5B3A5E', '#3A253C'],
  ['#8A5A2E', '#5C3B1E'],
  ['#2E5C5C', '#1D3A3A'],
  ['#2F4A3B', '#1E3227'],
];

export default function BookCard({ id, title, author, price, imageUri, type }) {
  const isExchange = type === 'exchange';

  return (
    <Link className='w-full sm:min-w-60 max-w-75 ' href={`/books-items/${id}`}>
      <div className="group flex flex-col bg-white rounded-lg border border-line overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
        {/* Book Cover */}
        <div className="h-[280px] aspect-[2/3] overflow-hidden">
          <img
            src={imageUri}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Information */}
        <div className="p-3.5 flex flex-col gap-1.5 flex-1">
          {/* Type */}
          <span
            className={`stamp ${
              isExchange ? 'stamp-exchange' : 'stamp-new'
            } self-start`}
          >
            {isExchange ? 'For Exchange' : 'New'}
          </span>

          {/* Title */}
          <h3 className="font-display font-semibold text-[15px] truncate">
            {title}
          </h3>

          {/* Author */}
          <p className="text-muted text-[12.5px]">{author}</p>

          {/* Price + Action */}
          <div className="flex items-center justify-between pt-2 mt-auto">
            <span className="font-mono font-semibold text-spine text-[13.5px]">
              {isExchange ? 'Swap' : `$${price.toFixed(2)}`}
            </span>

            <span className="bg-spine group-hover:bg-spine-dark text-white text-sm font-semibold px-3 py-1.5 rounded-md transition-colors">
              {isExchange ? 'Request' : 'Add to Cart'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
