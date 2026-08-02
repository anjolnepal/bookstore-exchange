// app/page.js
//
// This is the homepage — in Next.js's App Router, whatever this file
// returns is what shows up at your site's root URL ("/").
//
// The `books` array below is FAKE data for now — hardcoded so we have
// something real to render. Later (Week 2+), this same array will instead
// come from a `fetch()` call to a database-backed API route. Notice that
// once that happens, nothing below in the actual page markup needs to
// change — only where `books` comes from changes. That's the whole point
// of building it this way from the start.

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
    <main className="min-h-screen bg-gray-50">
      {/* ---------- Header ---------- */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">📚 BookSwap</span>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#" className="hover:text-blue-600">
              Browse
            </a>
            <a href="#" className="hover:text-blue-600">
              Exchange
            </a>
            <a href="#" className="hover:text-blue-600">
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Buy new books. Exchange old ones.
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          A marketplace for readers — shop new titles or trade the books already
          on your shelf for something new to you.
        </p>
      </section>

      {/* ---------- Book Grid ---------- */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured Books
        </h2>

        {/*
          This is where the array of hardcoded books above becomes visible
          UI. `.map()` loops over every item in `books` and turns each one
          into a <BookCard>, passing that book's data in as props.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              emoji={book.emoji}
              type={book.type}
            />
          ))}
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BookSwap — built as a student project.
      </footer>
    </main>
  );
}
