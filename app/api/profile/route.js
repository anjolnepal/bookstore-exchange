import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import clientPromise from '../../services/database/db';
import { ObjectId } from 'mongodb';

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated.' },
        { status: 401 }
      );
    }

    const { name, image } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name cannot be empty.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    await db.collection('users').updateOne(
      { _id: new ObjectId(session.user.id) },

      { $set: { name: name.trim(), image: image || null } }
    );

    return NextResponse.json(
      { message: 'Profile updated successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
