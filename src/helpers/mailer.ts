/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: `${process.env.MAIL_TRAP_USERNAME}`,
        pass: `${process.env.MAIL_TRAP_PASSWORD}`,
      },
    });

    const mailOptions = {
      from: "aman@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}&emailType=${emailType}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } Or copy and paste the link below in your browser. <br>
       ${
         process.env.DOMAIN
       }/verifyemail?token=${hashedToken}&emailType=${emailType}
      </p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
