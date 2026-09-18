
import connectDB from '../../../services/database/mongodb';
import Book from '../../../models/booklisting';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    console.log("DELETE BOOK ID:", id);

    await connectDB();

    const book = await Book.findById(id);

    if (!book) {
      return Response.json(
        { error: "Book not found" },
        { status: 404 }
      );
    }

    // Check owner
    if (book.ownerId.toString() !== session.user.id) {
      return Response.json(
        { error: "You are not allowed to delete this listing" },
        { status: 403 }
      );
    }

    // Delete Cloudinary image
    if (book.coverImagePublicId) {
      await cloudinary.uploader.destroy(book.coverImagePublicId);
    }

    // Delete MongoDB document
    await Book.findByIdAndDelete(id);

    return Response.json({
      message: "Book and image deleted successfully",
    });

  } catch (error) {
    console.error("DELETE listing error:", error);

    return Response.json(
      { error: "Failed to delete listing" },
      { status: 500 }
    );
  }
}

