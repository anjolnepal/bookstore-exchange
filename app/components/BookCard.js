// Same props as before (title, author, price, emoji, type) plus one new
// optional prop, `id`, used only to pick a consistent spine color per
// book. Nothing about how this component is called needs to change
// except adding id={book.id} in the .map() call in page.js.

const SPINE_PALETTE = [
  ['#3B5470', '#22344A'],
  ['#7A2E2E', '#4E1D1D'],
  ['#5B3A5E', '#3A253C'],
  ['#8A5A2E', '#5C3B1E'],
  ['#2E5C5C', '#1D3A3A'],
  ['#2F4A3B', '#1E3227'],
];

function spineGradient(id = 0) {
  const [c1, c2] = SPINE_PALETTE[id % SPINE_PALETTE.length];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

export default function BookCard({ id, title, author, price, emoji, type }) {
  const isExchange = type === 'exchange';

  return (
    <div className="group bg-white rounded-lg border border-line overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg flex flex-col">
      <div
        className="h-[150px] flex items-center justify-center text-6xl"
        style={{ background: spineGradient(id) }}
      >
        {emoji}
      </div>
      <div className="p-3.5 flex flex-col gap-1.5 flex-1">
        <span
          className={`stamp ${isExchange ? 'stamp-exchange' : 'stamp-new'} self-start`}
        >
          {isExchange ? 'For Exchange' : 'New'}
        </span>
        <h3 className="font-display font-semibold text-[15px] truncate">
          {title}
        </h3>
        <p className="text-muted text-[12.5px]">{author}</p>
        <div className="flex items-center justify-between pt-2 mt-auto">
          <span className="font-mono font-semibold text-spine text-[13.5px]">
            {isExchange ? 'Swap' : `$${price.toFixed(2)}`}
          </span>
          <button className="bg-spine group-hover:bg-spine-dark text-white text-sm font-semibold px-3 py-1.5 rounded-md transition-colors">
            {isExchange ? 'Request' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
