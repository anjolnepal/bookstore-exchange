import connectDB from '@/app/services/database/mongodb';
import BookListing from '@/app/models/booklisting';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const condition = searchParams.get('condition');
    const searchTerm = searchParams.get('search');

    // First: Check ALL books with listingType='exchange'
    const allExchangeBooks = await BookListing.find({ listingType: 'exchange' });
    console.log(`[DEBUG] Total exchange books in DB: ${allExchangeBooks.length}`);
    console.log(`[DEBUG] Exchange books:`, allExchangeBooks.map(b => ({ title: b.title, author: b.author, status: b.status })));

    // Second: Check books matching the search term
    if (searchTerm) {
      const searchFilter = {
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } }
        ]
      };
      const searchResults = await BookListing.find(searchFilter);
      console.log(`[DEBUG] Books matching search "${searchTerm}": ${searchResults.length}`);
      console.log(`[DEBUG] Search results:`, searchResults.map(b => ({ title: b.title, author: b.author, listingType: b.listingType, status: b.status })));
    }

    // Third: Apply the actual filter
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

    console.log(`[DEBUG] Final filter:`, JSON.stringify(filter, null, 2));

    const books = await BookListing.find(filter)
      .populate('postedBy', 'username email')
      .sort({ createdAt: -1 })
      .limit(50);

    console.log(`[DEBUG] Final results: ${books.length} books found`);
    console.log(`[DEBUG] Final books:`, books.map(b => ({ title: b.title, author: b.author })));

    return Response.json(books);

  } catch (error) {
    console.error('Error fetching exchange books:', error);
    return Response.json(
      { error: 'Failed to fetch books', message: error.message },
      { status: 500 }
    );
  }
}