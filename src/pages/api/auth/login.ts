import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password, rememberMe } = req.body;

    const response = await fetch('https://api.onepeloton.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username_or_email: username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const pelotonData = await response.json();

    const token = jwt.sign(
      {
        id: pelotonData.user_id,
        name: pelotonData.name,
        email: username,
        pelotonId: pelotonData.user_id,
      },
      process.env.JWT_SECRET,
      { 
        expiresIn: rememberMe ? '30d' : '24h'
      }
    );

    res.setHeader('Set-Cookie', serialize('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: rememberMe ? 2592000 : 86400,
      path: '/',
    }));

    res.status(200).json({
      id: pelotonData.user_id,
      name: pelotonData.name,
      email: username,
      pelotonId: pelotonData.user_id,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
}