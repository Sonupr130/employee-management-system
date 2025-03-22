import mongoose from "mongoose";
import chalk from "chalk"; 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(chalk.green(`
===========================================
🔥 ${chalk.bold("MongoDB Connected Successfully!")}
-------------------------------------------
🔹 Host : ${conn.connection.host}
===========================================
`));
  } catch (error) {
    console.error(chalk.red(`
===========================================
❌ ${chalk.bold("MongoDB Connection Failed!")}
-------------------------------------------
🔹 Error : ${error.message}
===========================================
`));
    process.exit(1);
  }
};

export default connectDB;

