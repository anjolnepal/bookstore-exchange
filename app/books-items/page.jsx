import BookCard from '../components/BookCard';
import { getFeaturedBooks } from '../lib/books';
export default async function BookItems() {
  const books = await getFeaturedBooks();
  return (
    <>
      {/* ---------- Featured Books ---------- */}
      <section className="max-w-[1120px] w-full mx-auto px-6 pb-20 ">
        <h2 className="text-center font-display text-3xl font-semibold p-6">
          Books
        </h2>

        {/*
          Same .map() pattern as before — this is the part that will
          eventually iterate over data from fetch('/api/books') instead
          of the hardcoded array above, with zero changes needed here.
        */}
       <div className="
          grid
          grid-cols-[repeat(auto-fit,minmax(220px,1fr))]
          gap-[20px]
          ">
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
