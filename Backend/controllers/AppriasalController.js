import Appraisal from "../models/AppraisalSchema.js";

// Submit Appraisal Request (User Side)
export const requestAppraisal = async (req, res) => {
  try {
    console.log("Received Appraisal Request:", req.body); // Debugging

    const { user, kpis, selfAppraisal } = req.body; // ✅ Expect correct names from frontend

    if (!user || !Array.isArray(kpis) || kpis.length === 0) {
      return res.status(400).json({ message: "User and KPIs are required" });
    }

    // ✅ Ensure kpis contain valid objects
    const formattedKPIs = kpis.map((kpi) => ({
      kpiId: kpi.kpiId, // Keep only the ID reference
      title: kpi.title || "Untitled KPI", // Provide a fallback
      kpiWeight: kpi.kpiWeight || 0, // Provide a default weight if missing
    }));

    const newAppraisal = new Appraisal({
      user, // ✅ Store userId correctly
      kpis: formattedKPIs, // ✅ Now correctly storing KPI details
      selfAppraisal: selfAppraisal || "No self-appraisal provided.", // Default if missing
      finalScore: 0,
      feedback: "No feedback provided.",
      status: "Pending",
    });

    await newAppraisal.save();

    console.log("Appraisal saved successfully:", newAppraisal);
    res.status(201).json({ message: "Appraisal request submitted successfully", appraisal: newAppraisal });
  } catch (error) {
    console.error("Error submitting appraisal request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Update Appraisal Score (Admin Side)
export const updateAppraisal = async (req, res) => {
  try {
    const { finalScore, feedback } = req.body;
    const appraisalId = req.params.id;

    const updatedAppraisal = await Appraisal.findByIdAndUpdate(
      appraisalId,
      { finalScore, feedback, status: "Reviewed" },
      { new: true }
    );

    if (!updatedAppraisal) {
      return res.status(404).json({ message: "Appraisal not found" });
    }

    res.status(200).json({ message: "Appraisal updated successfully", updatedAppraisal });
  } catch (error) {
    console.error("Error updating appraisal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch User's Appraisal Scores (For Bar Chart)
export const getUserAppraisalScores = async (req, res) => {
  try {
    const userId = req.params.userId;

    const scores = await Appraisal.find({ user: userId, status: "Reviewed" })
      .select("finalScore createdAt") // Only get score & date
      .sort({ createdAt: 1 });

    const formattedScores = scores.map((item) => ({
      month: new Date(item.createdAt).toLocaleString("en-US", { month: "short" }),
      score: item.finalScore,
    }));

    res.status(200).json(formattedScores);
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllAppraisalScores = async (req, res) => {
  try {
    const scores = await Appraisal.find({ status: "Pending" })
      .populate("user", "firstName lastName")
      .sort({ createdAt: 1 });

    const formattedScores = scores.map((item) => ({
      _id: item._id,
      user: item.user ? `${item.user.firstName} ${item.user.lastName}` : "Unknown User",
      month: new Date(item.createdAt).toLocaleString("en-US", { month: "short" }),
      score: item.finalScore,
      selfAppraisal: item.selfAppraisal, // Include self-appraisal text
      kpis: item.kpis.map((kpi) => ({
        kpiId: kpi.kpiId,
        title: kpi.title,
        kpiWeight: kpi.kpiWeight,
      })),
    }));

    res.status(200).json(formattedScores);
  } catch (error) {
    console.error("Error fetching all appraisal scores:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


