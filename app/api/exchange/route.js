import connectDB from '@/app/services/database/mongodb';
import BookListing from '@/app/models/booklisting';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const condition = searchParams.get('condition');
    const searchTerm = searchParams.get('search');

    // Filter for exchange books with 'open' status
    const filter = {
      type: 'exchange',
      status: 'open'
    };

    // Add genre filter if provided
    if (genre && genre !== '') {
      filter.genre = genre;
    }

    // Add condition filter if provided
    if (condition && condition !== '') {
      filter.condition = condition;
    }

    // Add search filter if provided
    if (searchTerm && searchTerm !== '') {
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const books = await BookListing.find(filter)
      .populate('ownerId', 'username email')
      .sort({ createdAt: -1 })
      .limit(50);

    return Response.json(books);

  } catch (error) {
    console.error('Error fetching exchange books:', error);
    return Response.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
