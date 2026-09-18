import connectDB from '../../services/database/mongodb';
import Book from '../../models/booklisting';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const books = await Book.find({
      ownerId: session.user.id
    }).lean();

    return Response.json(books);

  } catch (error) {
    console.error("GET books error:", error);

    return Response.json(
      { error: "Failed to fetch books." },
      { status: 500 }
    );
  }
}