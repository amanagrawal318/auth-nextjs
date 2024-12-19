import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, emailType } = reqBody;
    const user = await User.findOne(
      emailType === "VERIFY"
        ? {
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() },
          }
        : {
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
          }
    );
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    user.isVerified = true;
    if (emailType === "VERIFY") {
      user.verifyToken = undefined;
      user.verifyTokenExpiry = undefined;
    } else {
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;
    }
    await user.save();
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
      userId: user._id,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
