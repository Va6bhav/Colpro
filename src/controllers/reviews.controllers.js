import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "review created successfully"
  });
});

export { createReview };