import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Add a valid name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'last name',
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: isEmail,
      message: 'Add a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Add a valid password'],
    minlength: 6,
  },
  location: {
    type: String,
    trim: true,
    default: 'my city',
  },
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
