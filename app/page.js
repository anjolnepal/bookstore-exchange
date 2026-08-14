// app/page.js
//
// Header and Footer now come from app/layout.js, so every page gets them
// automatically — this file only owns what's unique to the homepage:
// the hero and the featured books grid.
//
// `books` is still fake data — same as before, still commented as a
// placeholder for the future fetch() call to /api/books once MongoDB is
// connected (Week 2 / Days 8-10 milestone). Nothing below the fetch swap
// needs to change when that happens.

import BookCard from './components/BookCard';

const books = [
  {
    id: 1,
    title: 'Dune',
    author: 'Frank Herbert',
    price: 14.99,
    emoji: '🪐',
    type: 'new',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    price: 9.99,
    emoji: '👁️',
    type: 'new',
  },
  {
    id: 3,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 12.5,
    emoji: '🧙',
    type: 'new',
  },
  {
    id: 4,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    price: 0,
    emoji: '🧠',
    type: 'exchange',
  },
  {
    id: 5,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 0,
    emoji: '⏱️',
    type: 'exchange',
  },
  {
    id: 6,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 10.0,
    emoji: '🌅',
    type: 'new',
  },
];

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="text-center px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl font-semibold max-w-xl mx-auto mb-4 leading-tight">
          Buy new books. <em className="text-spine not-italic">Exchange</em> old
          ones.
        </h1>
        <p className="text-muted text-base max-w-md mx-auto mb-6">
          A marketplace for readers — shop new titles or trade the books already
          on your shelf for something new to you.
        </p>
        <div className="flex gap-3 justify-center">
          <a
            href="/browse"
            className="bg-spine hover:bg-spine-dark text-white rounded-md px-5 py-3 text-sm font-semibold transition-colors"
          >
            Browse Books
          </a>
          <a
            href="/exchange"
            className="border-2 border-spine text-spine hover:bg-spine hover:text-white rounded-md px-5 py-3 text-sm font-semibold transition-colors"
          >
            List a Book
          </a>
        </div>
      </section>

      {/* ---------- Featured Books ---------- */}
      <section className="max-w-[1120px] w-full mx-auto px-6 pb-20">
        <h2 className="font-display text-xl font-semibold mb-4">
          Featured Books
        </h2>

        {/*
          Same .map() pattern as before — this is the part that will
          eventually iterate over data from fetch('/api/books') instead
          of the hardcoded array above, with zero changes needed here.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              emoji={book.emoji}
              type={book.type}
            />
          ))}
        </div>
      </section>
    </>
  );
}
