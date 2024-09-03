import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define an interface for the user inputs
export interface UserModelInputs {
  name: string;
  email: string;
  password: string;
}

// Define an interface that extends mongoose.Document, which represents a MongoDB document
export interface UserModel extends Document, UserModelInputs {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the schema
const UserSchema: Schema<UserModel> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Pre-save hook to hash the password before saving the user document
UserSchema.pre('save', async function (next) {
  const user = this as UserModel;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
  }
});

// Create and export the model
const User = mongoose.model<UserModel>('User', UserSchema);

export default User;