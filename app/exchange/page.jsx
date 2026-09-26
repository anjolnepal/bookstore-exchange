'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ExchangePage() {
  const [filters, setFilters] = useState({
    genre: '',
    condition: '',
    searchTerm: ''
  });

  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams({
        genre: filters.genre,
        condition: filters.condition,
        search: filters.searchTerm,
        type: 'exchange'
      });
      
      const response = await fetch(`/api/exchange?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setAvailableBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setAvailableBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="max-w-[1120px] w-full mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display text-4xl font-semibold text-ink mb-2">
          Exchange Books
        </h1>
        <p className="text-muted text-base">
          Find books from our community and trade your own
        </p>
      </div>

      {/* Filters Section */}
      <div className="border border-line rounded-card bg-paper2 p-6 mb-8">
        <h2 className="font-display text-lg font-semibold text-ink mb-4">
          Find Books
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Search
            </label>
            <input
              type="text"
              name="searchTerm"
              placeholder="Title or author"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-line rounded-card text-sm bg-paperWhite text-ink placeholder-muted outline-none focus:border-spine"
            />
          </div>

          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Genre
            </label>
            <select
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-line rounded-card text-sm bg-paperWhite text-ink outline-none focus:border-spine"
            >
              <option value="">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="romance">Romance</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="textbook">Textbook</option>
              <option value="self-help">Self-Help</option>
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              Condition
            </label>
            <select
              name="condition"
              value={filters.condition}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-line rounded-card text-sm bg-paperWhite text-ink outline-none focus:border-spine"
            >
              <option value="">Any Condition</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-spine hover:bg-spine-dark text-white px-4 py-2 rounded-card text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted text-base">Loading books...</p>
        </div>
      ) : searched && availableBooks.length === 0 ? (
        <div className="text-center py-12 border border-line rounded-card bg-paper">
          <h3 className="font-display text-lg font-semibold text-ink mb-2">
            No books found
          </h3>
          <p className="text-muted text-sm mb-5">
            Try adjusting your filters
          </p>
          <button
            onClick={() => {
              setFilters({ genre: '', condition: '', searchTerm: '' });
              setSearched(false);
            }}
            className="inline-block bg-spine hover:bg-spine-dark text-white px-5 py-3 rounded-card text-sm font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : searched && availableBooks.length > 0 ? (
        <div>
          <h2 className="font-display text-lg font-semibold text-ink mb-6">
            Available Books ({availableBooks.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[30px] justify-items-center">
            {availableBooks.map(book => (
              <div 
                key={book._id} 
                className="w-full border border-line rounded-card p-4 bg-paper shadow-card hover:shadow-dropdown transition"
              >
                <div className="mb-3">
                  <h3 className="font-display text-sm font-semibold text-ink line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted">{book.author}</p>
                </div>
                
                <div className="mb-3 text-xs space-y-1">
                  <p className="text-muted">
                    Genre: <span className="font-semibold text-ink">{book.genre || 'N/A'}</span>
                  </p>
                  <p className="text-muted">
                    Condition: <span className="font-semibold text-ink">{book.condition || 'N/A'}</span>
                  </p>
                </div>

                <div className="mb-4 pb-4 border-t border-line">
                  <p className="text-xs text-muted mt-3">
                    By: <span className="font-semibold text-ink">{book.ownerId?.username || 'Anonymous'}</span>
                  </p>
                </div>

                <Link href={`/books-items/${book._id}`}>
                  <button className="w-full bg-spine hover:bg-spine-dark text-white px-3 py-2 rounded-card text-sm font-semibold transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted text-base">
            Use the filters above to find books to exchange
          </p>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-12 border-t border-line pt-8">
        <div className="border border-line rounded-card bg-paper p-6 text-center">
          <h2 className="font-display text-xl font-semibold text-ink mb-2">
            Want to Exchange a Book?
          </h2>
          <p className="text-muted text-sm mb-4">
            List your used books and find perfect trades with other readers
          </p>
          <Link href="/newListing">
            <button className="inline-block bg-spine hover:bg-spine-dark text-white px-6 py-3 rounded-card font-semibold transition-colors">
              Post Your Book
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
