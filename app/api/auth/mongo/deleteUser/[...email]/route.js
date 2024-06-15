import connectDB from "../../../../../lib/connectDB";
import user from "../../../../../Model/User";
import { NextResponse } from "next/server";
export async function DELETE(req, res) {
  try {
    console.log("inside delete request");
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    console.log(email);
    await connectDB();

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      console.log("User not found");
      return NextResponse.json({ message: "User not found" });
    }
    await deleteUserFromDB(email);

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user", error);
    return NextResponse.json(
      { message: "Error deleting user" },
      { status: 500 }
    );
  }
}

const deleteUserFromDB = async (email) => {
  await user.findOneAndDelete({ email: email });
};
