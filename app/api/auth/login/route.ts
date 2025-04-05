import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // TODO: Find user in database and verify password
    // For now, we'll just return a token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error logging in' },
      { status: 500 }
    );
  }
} 