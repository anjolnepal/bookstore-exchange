import { NextResponse } from "next/server";
import clientPromise from "../../services/database/db"; 
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Standard unpacking
    const client = await clientPromise;
    const db = client.db(); 
    const existingUser = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.collection("users").insertOne({
      name: name || "",
      email: email.toLowerCase(),
      password: hashedPassword,
      image:'',
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
