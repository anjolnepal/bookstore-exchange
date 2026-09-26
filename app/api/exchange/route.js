import connectDB from '@/app/services/database/mongodb';
import BookListing from '@/app/models/booklisting';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const condition = searchParams.get('condition');
    const searchTerm = searchParams.get('search');

    const filter = {
      listingType: 'exchange',
      status: 'active'
    };

    if (genre && genre !== '') {
      filter.genre = genre;
    }

    if (condition && condition !== '') {
      filter.condition = condition;
    }

    if (searchTerm && searchTerm !== '') {
      filter.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { author: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const books = await BookListing.find(filter)
      .populate('postedBy', 'username email')
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
