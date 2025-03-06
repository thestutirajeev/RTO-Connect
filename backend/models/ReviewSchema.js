import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Refers to the user who posted the review
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-populate user details in reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

// Calculate average rating dynamically when needed
reviewSchema.statics.calcAverageRatings = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        numOfRatings: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    return {
      totalReviews: stats[0].numOfRatings,
      averageRating: stats[0].avgRating,
    };
  }
  return { totalReviews: 0, averageRating: 0 };
};

const Review = mongoose.model("Review", reviewSchema);
export default Review;
