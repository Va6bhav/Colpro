const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: [true, "User ID is required"]
    },
    businessId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Business', 
      required: [true, "Business ID is required"]
    },
    rating: { 
      type: Number, 
      required: [true, "Rating is required"], 
      min: [1, "Rating must be at least 1"], 
      max: [5, "Rating cannot exceed 5"]
    },
    comment: { 
      type: String, 
      trim: true, 
      maxlength: [500, "Comment cannot exceed 500 characters"]
    }
  },
  { 
    timestamps: true // Auto-handles `createdAt` & `updatedAt`
  }
);

// Prevent duplicate reviews by the same user for the same business
ReviewSchema.index({ businessId: 1, userId: 1 }, { unique: true });

// Pre-save hook to update `updatedAt`
ReviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Review', ReviewSchema);
