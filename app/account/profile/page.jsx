'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/account/profile');
    }
  }, [status, router]);

  // Fill form once session data is available
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
      setImage(session.user.image || '');
    }
  }, [session]);

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional validation
    if (!file.type.startsWith('image/')) {
      setMessage({
        type: 'error',
        text: 'Please select an image file.',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: 'error',
        text: 'Image must be smaller than 5MB.',
      });
      return;
    }

    // Store the actual File
    setImageFile(file);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);

    setMessage(null);
  }

  async function handleSave(e) {
    e.preventDefault();

    setSaving(true);
    setMessage(null);

    try {
      let imageUrl = image;

      // Only upload if user selected a new image
      if (imageFile) {
        const formData = new FormData();

        formData.append('file', imageFile);
        formData.append(
          'upload_preset',
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        );

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryRes.json();

        if (!cloudinaryRes.ok) {
          throw new Error(
            cloudinaryData.error?.message || 'Cloudinary upload failed.'
          );
        }

        imageUrl = cloudinaryData.secure_url;
      }

      // Save profile to your API
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          image: imageUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save changes.');
      }

      // Update NextAuth session
      await update({
        name,
        image: imageUrl,
      });

      // Remove old blob preview
      if (imageFile && image.startsWith('blob:')) {
        URL.revokeObjectURL(image);
      }

      setImageFile(null);

      setMessage({
        type: 'success',
        text: 'Profile updated.',
      });
    } catch (err) {
      console.error('Profile update error:', err);

      setMessage({
        type: 'error',
        text: err.message || 'Profile update failed.',
      });
    } finally {
      setSaving(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="wrap px-4 py-16 text-center text-sm text-muted">
        Loading profile…
      </div>
    );
  }

  if (status !== 'authenticated') return null;

  const initials = (name || email || '?').charAt(0).toUpperCase();

  return (
    <div className="wrap px-4 py-12 max-w-2xl mx-auto">
      <nav className="text-xs text-muted mb-2 font-mono">Account / Profile</nav>
      <h1 className="text-3xl mb-8">Your Profile</h1>

      <div className="bg-paper-white border border-line rounded-card shadow-card p-8">
        {/* Avatar block */}
        <div className="flex items-center gap-5 mb-8 pb-8 border-b border-line">
          <div className="relative shrink-0">
            <div
              className="w-20 h-20 rounded-full bg-paper-2 border border-line overflow-hidden
                         flex items-center justify-center text-2xl font-display text-spine"
            >
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-ink/50 flex items-center justify-center">
                <span className="w-4 h-4 border-2 border-paper-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="border border-line rounded-md px-4 py-2 text-sm font-semibold text-ink
                         bg-paper-white hover:bg-paper-2 transition-colors disabled:opacity-60"
            >
              {uploading ? 'Uploading…' : 'Change photo'}
            </button>
            <p className="text-xs text-muted mt-2">JPG or PNG, up to 5MB.</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave}>
         
          {message && (
            <div
              className={`mb-5 text-sm rounded-md px-3 py-2 border ${
                message.type === 'success'
                  ? 'text-[#3E7A4C] bg-[#3E7A4C]/10 border-[#3E7A4C]/30'
                  : 'text-danger bg-danger/10 border-danger/30'
              }`}
            >
              {message.text}
            </div>
          )}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-white text-ink
                         focus:outline-none focus:ring-2 focus:ring-spine focus:border-spine"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wide text-muted mb-1.5"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              disabled
              className="w-full border border-line rounded-md px-3 py-2.5 text-sm bg-paper-2 text-muted
                         cursor-not-allowed"
            />
            <p className="text-xs text-muted mt-1.5">
              Email is tied to your sign-in method and can&apos;t be changed
              here.
            </p>
          </div>
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-spine hover:bg-spine-dark text-white font-semibold text-sm
                       rounded-md py-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
