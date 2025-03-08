const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Business name is required"], 
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    ownerId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, "Owner ID is required"] 
    },
    location: {
      latitude: { type: Number, min: -90, max: 90 },
      longitude: { type: Number, min: -180, max: 180 }
    },
    address: { 
      type: String, 
      trim: true 
    },
    category: { 
      type: String, 
      required: [true, "Category is required"], 
      index: true, // Improves search performance
      trim: true 
    },
    images: [{ 
      type: String, 
      validate: {
        validator: function (urls) {
          return urls.every(url => /^https?:\/\/.+\..+$/.test(url)); // Basic URL validation
        },
        message: "Invalid image URL format"
      }
    }], 
    contact: {
      phone: { 
        type: String, 
        trim: true, 
        match: [/^\d{10}$/, "Phone number must be 10 digits"] 
      },
      email: { 
        type: String, 
        trim: true, 
        lowercase: true, 
        match: [/.+\@.+\..+/, "Invalid email format"] 
      },
      website: { 
        type: String, 
        trim: true, 
        match: [/^https?:\/\/.+\..+$/, "Invalid website URL"] 
      }
    },
    rating: { 
      type: Number, 
      min: 0, 
      max: 5, 
      default: 0 
    }
  },
  { 
    timestamps: true // Automatically adds createdAt & updatedAt
  }
);

// Pre-save hook to update `updatedAt` on modifications
BusinessSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Business', BusinessSchema);
