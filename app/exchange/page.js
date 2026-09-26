import { getBooks } from '../lib/books';
import BookCard from '../components/BookCard';

export default async function ExchangePage() {
  const books = await getBooks();

  const exchangeBooks = books.filter(
    (book) => book.type === 'exchange' && book.status === 'open'
  );

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Exchange Books</h1>

        {exchangeBooks.length === 0 ? (
          <p className="text-gray-500">
            No books are currently available for exchange.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {exchangeBooks.map((book) => (
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
        )}
      </div>
    </main>
  );
}
