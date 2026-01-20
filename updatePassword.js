const bcrypt = require("bcryptjs");
const { MongoClient } = require("mongodb");

// MongoDB connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function updatePassword() {
  try {
    await client.connect();
    const db = client.db("foodcourtDB"); // Make sure this matches your DB name
    const users = db.collection("users");

    // Hash the password
    const hashedPassword = await bcrypt.hash("securepassword", 10);

    // Update user password in the database
    const result = await users.updateOne(
      { email: "johndoe@example.com" }, // Find the user by email
      { $set: { password: hashedPassword } } // Update with hashed password
    );

    console.log("Password updated successfully:", result.modifiedCount);
  } catch (error) {
    console.error("Error updating password:", error);
  } finally {
    await client.close();
  }
}

updatePassword();
