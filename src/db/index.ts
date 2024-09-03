import mongoose from 'mongoose';

const connectDB = async () => {
  try {    
    const mongoURI = process.env.MONGO_URI || 'your_default_mongodb_uri_here';
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
