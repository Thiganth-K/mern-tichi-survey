import mongoose from "mongoose";

const SurveySchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  collegeName: { type: String, required: true },
  yearOfStudy: { type: String, required: true },
  city: String,
  lookedForServices: String,
  services: [String],
  whereFind: [String],
  wouldUseApp: String,
  whatPost: String,
  payToUnlock: String,
  earlyAccess: String,
  campusCircle: String,
}, { timestamps: true });

export default mongoose.model("Survey", SurveySchema);