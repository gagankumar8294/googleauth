import { getDB } from '../../config/mongo.js';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export const isUserSignedIn = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        if(!token) {
            return res.status(401).json({ message: 'No token found.Please Sign in.' });
        }

        const decoded = jwt.verify(token, 'zj8fN3lq1v4WySX3cFKeddcy8piHz8dt');
        
        const db = getDB();
        const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.id) });

        if (!user) {
            return  res.status(404).json({ message: 'User not found' });
        }

         // ✅ Check if token matches the one stored in DB
        if (user.token !== token) {
        return res.status(403).json({ message: 'Session invalidated' });
        }

        req.user = user;
        next();
        
    } catch(err) {
        console.log('Auth error', err);
        return res.status(403).json({ message: 'Invalid or expired token'});
    }
}