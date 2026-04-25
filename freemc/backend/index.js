const express = require('express');
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json'); // You need to add this file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project.firebaseio.com' // Replace with your Firebase project URL
});

const db = admin.firestore();

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await db.collection('users').doc(username).get();
    if (!userDoc.exists) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = userDoc.data();
    const isValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ userId: username, rank: user.rank });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await db.collection('users').doc(username).get();
    if (userDoc.exists) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').doc(username).set({
      username,
      hashedPassword,
      rank: 'User',
      ownedCapes: [],
      cosmetics: [],
      stats: {},
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Watch ad endpoint
app.post('/watchAd', async (req, res) => {
  const { userId } = req.body;
  try {
    const userDoc = await db.collection('users').doc(userId);
    const user = (await userDoc.get()).data();
    const newAds = (user.adsWatched || 0) + 1;
    await userDoc.update({ adsWatched: newAds });
    if (newAds >= 50 && user.rank === 'User') {
      await userDoc.update({ rank: 'Caper' });
    }
    res.json({ message: 'Ad watched' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Cape creation
app.post('/createCape', async (req, res) => {
  const { userId, name } = req.body;
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    const user = userDoc.data();
    if (!['Caper', 'Free+', 'Creator', 'Owner'].includes(user.rank)) {
      return res.status(403).json({ error: 'Insufficient rank' });
    }
    const capeRef = await db.collection('capes').add({
      name,
      creator: userId,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    res.json({ capeId: capeRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get capes
app.get('/capes', async (req, res) => {
  try {
    const capes = await db.collection('capes').get();
    const capeList = [];
    capes.forEach(doc => {
      capeList.push({ id: doc.id, ...doc.data() });
    });
    res.json(capeList);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});