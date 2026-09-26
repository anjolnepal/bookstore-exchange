'use client';

import { useEffect, useState } from 'react';

export default function ExchangeRequestForm({ requestedBookId }) {
  const [myBooks, setMyBooks] = useState([]);
  const [offeredBookId, setOfferedBookId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingBooks, setFetchingBooks] = useState(true);
  const [result, setResult] = useState('');

  useEffect(() => {
    async function fetchMyBooks() {
      try {
        const response = await fetch('/api/mybooks');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch your books.');
        }

        setMyBooks(Array.isArray(data) ? data : []);
      } catch (error) {
        setResult(error.message);
      } finally {
        setFetchingBooks(false);
      }
    }

    fetchMyBooks();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!offeredBookId) {
      setResult('Please select a book to offer.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/exchange-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestedBookId,
          offeredBookId,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send request.');
      }

      setResult('Exchange request sent successfully!');
      setOfferedBookId('');
      setMessage('');
    } catch (error) {
      setResult(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Request Exchange</h3>

      {fetchingBooks ? (
        <p>Loading your books...</p>
      ) : myBooks.length === 0 ? (
        <p className="text-gray-500">You don't have any books to offer.</p>
      ) : (
        <>
          <div>
            <label className="block mb-2 font-semibold">
              Select a book to offer
            </label>

            <select
              value={offeredBookId}
              onChange={(event) => setOfferedBookId(event.target.value)}
              className="w-full rounded-md border border-gray-300 p-3"
            >
              <option value="">Choose your book</option>

              {myBooks.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Message (optional)
            </label>

            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a message to the book owner..."
              maxLength={500}
              rows={4}
              className="w-full rounded-md border border-gray-300 p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-spine px-5 py-3 font-semibold text-white transition-colors hover:bg-spine-dark disabled:bg-gray-400"
          >
            {loading ? 'Sending...' : 'Send Exchange Request'}
          </button>
        </>
      )}

      {result && <p className="rounded-md bg-gray-100 p-3 text-sm">{result}</p>}
    </form>
  );
}
