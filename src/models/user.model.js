const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firebaseUID: { 
      type: String, 
      unique: true, 
      sparse: true // Allows users without Firebase authentication
    },
    name: { 
      type: String, 
      required: [true, "Name is required"], 
      trim: true 
    },
    email: { 
      type: String, 
      unique: true, 
      required: [true, "Email is required"], 
      trim: true, 
      lowercase: true, 
      match: [/.+\@.+\..+/, "Please enter a valid email"] 
    },
    password: { 
      type: String, 
      select: false // Prevents password from being returned in queries 
    },
    phone: { 
      type: String, 
      trim: true, 
      match: [/^\d{10}$/, "Phone number must be 10 digits"] 
    },
    location: { 
      latitude: { type: Number, min: -90, max: 90 },
      longitude: { type: Number, min: -180, max: 180 }
    }
  },
  { 
    timestamps: true // Automatically adds `createdAt` & `updatedAt`
  }
);

// Ensure `updatedAt` updates on document save
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
