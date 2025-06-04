import Survey from "../models/survey_model.js";

// Submit or update survey
export const submitSurvey = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    // Upsert: update if exists, else create
    const survey = await Survey.findOneAndUpdate(
      { email },
      { ...req.body },
      { upsert: true, new: true }
    );
    res.json({ message: "Submission successful", data: survey });
  } catch (err) {
    console.error("Error submitting survey:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all surveys (admin/testing)
export const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};