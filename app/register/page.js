"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill out all mandatory fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      // Success! Send them straight to the login screen
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="section wrap flex justify-center px-4 py-16">
      <div className="w-full max-w-[380px] bg-paper-white border border-line rounded-xl p-8">
        <h2 className="text-2xl mb-5">Create Account</h2>

        <form onSubmit={handleRegister} noValidate>
          {error && (
            <div className="mb-4 text-sm text-danger bg-danger/10 border border-danger/30 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Full Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-white text-ink focus:outline-none focus:ring-2 focus:ring-spine focus:border-spine"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Email *
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-white text-ink focus:outline-none focus:ring-2 focus:ring-spine focus:border-spine"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5">
              Password *
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-white text-ink focus:outline-none focus:ring-2 focus:ring-spine focus:border-spine"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 bg-spine hover:bg-spine-dark text-paper-white font-semibold text-sm rounded-md py-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account…" : "Register"}
          </button>

          <div className="text-center text-sm text-muted mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-spine font-semibold underline">
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
