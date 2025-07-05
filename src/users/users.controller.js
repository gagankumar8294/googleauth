import { getDB } from "../../config/mongo.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'zj8fN3lq1v4WySX3cFKeddcy8piHz8dt';
const JWT_EXPIRES_IN = '1d';

export default class userController {
  async signUp(req, res) {
    const data = req.body;
    const { email } = data;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      const db = getDB();
      const existingUser = await db.collection('users').findOne({ email });

      if (existingUser) {
        return res.status(409).json({
          message: 'User already exists with this email. Please sign in instead.',
        });
      }

      const result = await db.collection('users').insertOne(data);

      res.status(201).json({
        message: 'User registered successfully.',
        insertedId: result.insertedId,
      });
    } catch (error) {
      console.error('Error during sign up:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      const db = getDB();
      const user = await db.collection('users').findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: 'No user found with this email. Please sign up.',
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          message: 'Incorrect password.',
        });
      }

      // ✅ Generate JWT Token
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: JWT_EXPIRES_IN,
        }
      );


      res.status(200).json({
        message: 'Sign in successful.',

        token,
        user: {
          name: user.name,
          email: user.email,
          // Avoid sending password
        }
      });
    } catch (error) {
      console.error('Error during sign in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}