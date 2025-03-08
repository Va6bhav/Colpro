import { asyncHandler } from "../utils/asyncHandler.js";

const registerBusiness = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "business registered successfully"
  });
});

export { registerBusiness };