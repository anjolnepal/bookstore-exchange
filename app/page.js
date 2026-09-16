import Link from 'next/link';
import BookCard from './components/BookCard';
import { getFeaturedBooks } from './lib/books';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
export default async function Home() {
  const books = await getFeaturedBooks();
  const session = await getServerSession(authOptions);

  const handleProtectedClick = (href) => {
    if (session) {
      window.location.href = href;
    } else {
      alert('Please log in to continue.');
      window.location.href = `/login?callbackUrl=${href}`;
    }
  };
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
          {session ? (
            <>
              <Link
                href="/books-items"
                className="bg-spine hover:bg-spine-dark text-white rounded-md px-5 py-3 text-sm font-semibold transition-colors"
              >
                Browse Books
              </Link>

              <Link
                href="/newListing"
                className="border-2 border-spine text-spine hover:bg-spine hover:text-white rounded-md px-5 py-3 text-sm font-semibold transition-colors"
              >
                List a Book
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-spine hover:bg-spine-dark text-white rounded-md px-5 py-3 text-sm font-semibold transition-colors"
              >
                Browse Books
              </Link>

              <Link
                href="/login"
                className="border-2 border-spine text-spine hover:bg-spine hover:text-white rounded-md px-5 py-3 text-sm font-semibold transition-colors"
              >
                List a Book
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ---------- Featured Books ---------- */}
      <section className="max-w-[1120px] w-full mx-auto px-6 pb-20">
        <h2 className="font-display text-xl font-semibold mb-4">
          Featured Books
        </h2>
        <div
          className="
          grid
          grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
          gap-[20px]
          "
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              imageUri={book.coverImageUrl}
              type={book.type}
            />
          ))}
        </div>
      </section>
    </>
  );
}
