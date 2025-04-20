
import express, { Request, Response, NextFunction } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define custom request interface to include user property
interface AuthRequest extends Request {
  user?: {
    _id: ObjectId;
    name: string;
    email: string;
    role: string;
    [key: string]: any;
  };
}

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = 'yourjwtsecretkey'; // In production, use env variables

app.use(express.json());

// MongoDB Connection
const uri = "mongodb+srv://shuklashreyansh0207:gFyxp0L0uz3tgoQ8@cluster0.vlkn4.mongodb.net/law_website";
const client = new MongoClient(uri);

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!') as any);
    }
  }
});

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

connectToMongo();

// Authentication middleware
const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const db = client.db('law_website');
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Explicitly cast the MongoDB document to the expected type
    req.user = {
      _id: user._id as ObjectId,
      name: user.name as string,
      email: user.email as string,
      role: user.role as string,
      ...user
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Auth Routes
app.post('/api/auth/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (role !== 'Lawyer' && role !== 'User') {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const db = client.db('law_website');
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date()
    });
    
    const user = {
      _id: result.insertedId,
      name,
      email,
      role
    };
    
    const token = jwt.sign({ userId: result.insertedId }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const db = client.db('law_website');
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/verify', authMiddleware, (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    profileImage: req.user.profileImage
  });
});

// Lawyer Profile Routes
app.post('/api/lawyer-profile', authMiddleware, upload.single('profileImage'), async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (req.user.role !== 'Lawyer') {
      return res.status(403).json({ message: 'Only lawyers can create profiles' });
    }
    
    const { phone, specialization, licenseId, experience, bio } = req.body;
    
    if (!phone || !specialization || !licenseId || !experience || !bio) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const profileData = {
      userId: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone,
      specialization,
      licenseId,
      experience: Number(experience),
      bio,
      profileImage: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date()
    };
    
    const db = client.db('law_website');
    
    // Check if profile already exists
    const existingProfile = await db.collection('lawyer_profiles').findOne({ userId: req.user._id });
    
    if (existingProfile) {
      await db.collection('lawyer_profiles').updateOne(
        { userId: req.user._id },
        { $set: profileData }
      );
    } else {
      await db.collection('lawyer_profiles').insertOne(profileData);
    }
    
    // Update the user record with the profile image
    if (req.file) {
      await db.collection('users').updateOne(
        { _id: req.user._id },
        { $set: { profileImage: `/uploads/${req.file.filename}` } }
      );
    }
    
    res.status(200).json({ message: 'Profile updated successfully', profile: profileData });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/lawyer-profile/:id', async (req: Request, res: Response) => {
  try {
    const db = client.db('law_website');
    let profile;
    
    if (ObjectId.isValid(req.params.id)) {
      profile = await db.collection('lawyer_profiles').findOne({ userId: new ObjectId(req.params.id) });
    }
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// FAQ Routes
app.post('/api/faq', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ message: 'Question is required' });
    }
    
    const faqItem = {
      userId: req.user._id,
      userName: req.user.name,
      question,
      answers: [],
      createdAt: new Date()
    };
    
    const db = client.db('law_website');
    const result = await db.collection('faqs').insertOne(faqItem);
    
    res.status(201).json({
      _id: result.insertedId,
      ...faqItem
    });
  } catch (error) {
    console.error('FAQ post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/faq/:id/answer', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    
    if (req.user.role !== 'Lawyer') {
      return res.status(403).json({ message: 'Only lawyers can answer questions' });
    }
    
    const { answer } = req.body;
    
    if (!answer) {
      return res.status(400).json({ message: 'Answer is required' });
    }
    
    const db = client.db('law_website');
    
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid question ID' });
    }
    
    const faqItem = await db.collection('faqs').findOne({ _id: new ObjectId(req.params.id) });
    
    if (!faqItem) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const answerItem = {
      _id: new ObjectId(),
      lawyerId: req.user._id,
      lawyerName: req.user.name,
      answer,
      createdAt: new Date()
    };
    
    await db.collection('faqs').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $push: { answers: answerItem } }
    );
    
    res.status(200).json({ message: 'Answer added successfully', answer: answerItem });
  } catch (error) {
    console.error('Answer post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/faq', async (req: Request, res: Response) => {
  try {
    const db = client.db('law_website');
    const faqs = await db.collection('faqs').find().sort({ createdAt: -1 }).toArray();
    
    res.json(faqs);
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create server instead of using app.listen directly
const server = app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

// Add error handler for unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  server.close(() => {
    process.exit(1);
  });
});

export default app;
