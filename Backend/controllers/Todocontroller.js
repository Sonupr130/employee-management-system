import mongoose from "mongoose";
import Todo from "../models/TodoSchema.js";
import KPI from "../models/KPI.js"; // Assuming your KPI model is named KPI

export const initiateTodo = async (req, res) => {
  const { userId, kpiId, title, description} = req.body;

  console.log("Received request to initiate KPI for user:", userId, "KPI ID:", kpiId);

  // ✅ Validate userId & kpiId existence
  if (!userId || !kpiId) {
    return res.status(400).json({ message: "User ID and KPI ID are required" });
  }

  // ✅ Check if userId & kpiId are valid MongoDB ObjectIds
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(kpiId)) {
    return res.status(400).json({ message: "Invalid User ID or KPI ID format" });
  }

  try {
    // ✅ Find the specific KPI (Todo) for the given user
    let todo = await Todo.findOne({ _id: kpiId, user: userId });

    // ✅ Fetch KPI details to get startDate & endDate
    const kpi = await KPI.findById(kpiId);
    if (!kpi) {
      return res.status(404).json({ message: "KPI not found" });
    }

    // ✅ Format targetDate as "YYYY-MM-DD to YYYY-MM-DD"
    const targetDate = `${kpi.startDate} to ${kpi.endDate}`;

    if (!todo) {
      console.log("No KPI found for user:", userId, "KPI ID:", kpiId);
      // ✅ Create a new KPI if it does not exist
      todo = new Todo({
        _id: kpiId, // Ensure it uses the provided KPI ID
        user: userId,
        title: title || kpi.title || "Untitled KPI", // Use KPI title if available
        targetDate: targetDate, // Assign formatted target date
        description: description || kpi.description || "No description provided", // Use KPI description if available
        status: "In Progress", // Set status to In Progress
      });

      await todo.save();
      console.log("New KPI created successfully:", todo);
      return res.status(201).json({ message: "New KPI created successfully", todo });
    }

    // ✅ Update KPI status to "In Progress"
    todo.status = "In Progress";
    await todo.save();

    console.log("KPI initiated successfully:", todo);
    res.status(200).json({ message: "KPI initiated successfully", todo });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getAllTodos = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request parameters

    // ✅ Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format." });
    }

    // ✅ Fetch todos only for the specified user
    const userTodos = await Todo.find({ user: userId }).populate("user", "firstName lastName");

    if (!userTodos || userTodos.length === 0) {
      return res.status(404).json({ message: "No todos found for this user." });
    }

    // console.log(`Fetched Todos for user ${userId}:`, userTodos); 

    res.status(200).json(userTodos);
  } catch (error) {
    console.error("Error fetching user todos:", error);
    res.status(500).json({ message: "Failed to fetch user todos", error: error.message });
  }
};


export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "KPI not found" });
    }

    res.status(200).json({ message: "KPI deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete KPI", error: error.message });
  }
};


export const updateTodoStatus = async (req, res) => 
  {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Update the Todo collection
    const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the Performance collection (assuming the same ID exists)
    const updatedPerformance = await KPI.findOneAndUpdate(
      { _id: id }, // If Performance uses the same ID
      { status },
      { new: true }
    );

    if (!updatedPerformance) {
      return res.status(404).json({ message: "Performance record not found" });
    }

    res.json({
      message: "Status updated successfully in both collections",
      updatedTodo,
      updatedPerformance,
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};


// export const getPendingTodos = async (req, res) => {
//   try {
//     const { userId } = req.params; // Get userId from request parameters

//     // ✅ Validate if userId is a valid MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid User ID format." });
//     }

//     // ✅ Fetch only pending todos (not completed) for the specified user
//     const pendingTodos = await Todo.find({ user: userId, status: { $ne: "Completed" } })
//       .populate("user", "firstName lastName");

//     if (!pendingTodos || pendingTodos.length === 0) {
//       return res.status(404).json({ message: "No pending todos found for this user." });
//     }

//     console.log(`Fetched Pending Todos for user ${userId}:`, pendingTodos);

//     res.status(200).json(pendingTodos);
//   } catch (error) {
//     console.error("Error fetching pending todos:", error);
//     res.status(500).json({ message: "Failed to fetch pending todos", error: error.message });
//   }
// };



export const getPendingTodos = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request parameters

    // ✅ Validate if userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format." });
    }

    // ✅ Fetch only pending todos (not completed) for the specified user
    const pendingTodos = await Todo.find({ user: userId, status: { $ne: "Completed" } })
      .populate("user", "firstName lastName");

    // ✅ If no todos exist, return 200 with an empty array and log a message
    if (!pendingTodos || pendingTodos.length === 0) {
      console.log(`No pending todos initiated for user ${userId}`);
      return res.status(200).json({ message: "No todos initiated", todos: [] });
    }

    console.log(`Fetched Pending Todos for user ${userId}:`, pendingTodos);

    res.status(200).json({ todos: pendingTodos });
  } catch (error) {
    console.error("Error fetching pending todos:", error);
    res.status(500).json({ message: "Failed to fetch pending todos", error: error.message });
  }
};
