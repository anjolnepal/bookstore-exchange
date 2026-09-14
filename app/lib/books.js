import connectDB from '../services/database/mongodb';
import Books from '../models/booklisting';

export async function getFeaturedBooks() {
  await connectDB();

  const books = await Books.find({})
    .limit(6)
    .lean();

  return books;
}
