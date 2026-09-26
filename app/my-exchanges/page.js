'use client';

import { useEffect, useState } from 'react';

export default function MyExchangesPage() {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function fetchExchangeRequests() {
    try {
      setError('');

      const response = await fetch('/api/exchange-requests');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch requests.');
      }

      setSentRequests(data.sentRequests || []);
      setReceivedRequests(data.receivedRequests || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExchangeRequests();
  }, []);

  async function handleAction(requestId, action) {
    const actionText = {
      accept: 'accept this exchange',
      reject: 'reject this exchange',
      cancel: 'cancel this exchange',
    };

    if (!window.confirm(`Are you sure you want to ${actionText[action]}?`)) {
      return;
    }

    try {
      setActionLoading(`${action}-${requestId}`);
      setError('');
      setMessage('');

      const response = await fetch('/api/exchange-requests', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update exchange request.');
      }

      setMessage(data.message);
      await fetchExchangeRequests();
    } catch (error) {
      setError(error.message);
    } finally {
      setActionLoading('');
    }
  }

  if (loading) {
    return (
      <main className="p-8">
        <p>Loading exchange requests...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">My Exchanges</h1>

        {error && (
          <p className="mb-6 rounded-md bg-red-100 p-3 text-red-700">{error}</p>
        )}

        {message && (
          <p className="mb-6 rounded-md bg-green-100 p-3 text-green-700">
            {message}
          </p>
        )}

        {/* Sent Requests */}
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Sent Requests
          </h2>

          {sentRequests.length === 0 ? (
            <p className="text-gray-500">
              You have not sent any exchange requests.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sentRequests.map((exchange) => (
                <div
                  key={exchange._id}
                  className="rounded-lg bg-white p-5 shadow"
                >
                  <h3 className="text-lg font-semibold">
                    {exchange.requestedBookId?.title ||
                      'Requested book unavailable'}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Offered book:{' '}
                    {exchange.offeredBookId?.title ||
                      'Offered book unavailable'}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Owner:{' '}
                    {exchange.ownerId?.name ||
                      exchange.ownerId?.email ||
                      'Unknown'}
                  </p>

                  <p className="mt-3">
                    Status:{' '}
                    <span className="font-semibold capitalize">
                      {exchange.status}
                    </span>
                  </p>

                  {exchange.message && (
                    <p className="mt-2 text-sm text-gray-600">
                      Message: {exchange.message}
                    </p>
                  )}

                  {exchange.status === 'pending' && (
                    <button
                      type="button"
                      onClick={() => handleAction(exchange._id, 'cancel')}
                      disabled={actionLoading === `cancel-${exchange._id}`}
                      className="mt-4 rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:bg-gray-400"
                    >
                      {actionLoading === `cancel-${exchange._id}`
                        ? 'Cancelling...'
                        : 'Cancel Request'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Received Requests */}
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Received Requests
          </h2>

          {receivedRequests.length === 0 ? (
            <p className="text-gray-500">
              You have not received any exchange requests.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {receivedRequests.map((exchange) => (
                <div
                  key={exchange._id}
                  className="rounded-lg bg-white p-5 shadow"
                >
                  <h3 className="text-lg font-semibold">
                    {exchange.requestedBookId?.title || 'Your book unavailable'}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    Offered book:{' '}
                    {exchange.offeredBookId?.title ||
                      'Offered book unavailable'}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Requester:{' '}
                    {exchange.requesterId?.name ||
                      exchange.requesterId?.email ||
                      'Unknown'}
                  </p>

                  <p className="mt-3">
                    Status:{' '}
                    <span className="font-semibold capitalize">
                      {exchange.status}
                    </span>
                  </p>

                  {exchange.message && (
                    <p className="mt-2 text-sm text-gray-600">
                      Message: {exchange.message}
                    </p>
                  )}

                  {exchange.status === 'pending' && (
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleAction(exchange._id, 'accept')}
                        disabled={
                          actionLoading === `accept-${exchange._id}` ||
                          actionLoading === `reject-${exchange._id}`
                        }
                        className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                      >
                        {actionLoading === `accept-${exchange._id}`
                          ? 'Accepting...'
                          : 'Accept'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAction(exchange._id, 'reject')}
                        disabled={
                          actionLoading === `accept-${exchange._id}` ||
                          actionLoading === `reject-${exchange._id}`
                        }
                        className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-gray-400"
                      >
                        {actionLoading === `reject-${exchange._id}`
                          ? 'Rejecting...'
                          : 'Reject'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
