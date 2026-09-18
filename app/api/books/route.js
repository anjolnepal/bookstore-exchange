import connectDB from '../../services/database/mongodb';
import Book from '../../models/booklisting';

// export async function GET() {
//   try {
//     await connectDB();

//     const books = await Book.find({});

//     return Response.json(books);
//   } catch (error) {
//     console.error("GET books error:", error);

//     return Response.json(
//       { error: "Failed to fetch books." },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    const {
      title,
      author,
      description,
      price,
      coverImageUrl,
      coverImagePublicId,
      stock,
      genre,
      type,
      ownerId,
      wantedInReturn
    } = await request.json();

    if (!title || !description || !coverImageUrl || price === undefined) {
      return Response.json(
        { error: "Missing required field." },
        { status: 400 }
      );
    }
console.log(wantedInReturn)
    await connectDB();

    const newListing = await Book.create({
      title,
      author,
      description,
      price,
      coverImageUrl,
      coverImagePublicId,
      stock,
      genre,
      type,
      wantedInReturn,
      ownerId,
      
    });

    return Response.json(
      {
        message: "Book listed successfully!",
        book: newListing,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Listing Error:", error);

    return Response.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
