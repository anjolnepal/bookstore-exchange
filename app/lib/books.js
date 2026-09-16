import connectDB from '../services/database/mongodb';
import Books from '../models/booklisting';

export async function getFeaturedBooks() {
  await connectDB();

  const books = await Books.find({})
  
    .lean();

  return books.map((book) => ({
    ...book,
    id: book._id.toString(),
  }));
}
export async function getBookDetails({ id }) {
  await connectDB();

  return await Books.findById(id).lean();
}