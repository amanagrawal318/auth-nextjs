import { connect } from "@/dbconfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Please provide a valid email" },
        { status: 400 }
      );
    }

    //verify the mail
    const response = await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
      response,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
