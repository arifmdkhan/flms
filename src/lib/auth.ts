import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./emails/email";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "AMK <onboarding@resend.dev>",
          to: [email],
          subject: "Verify Your Email",
          html: `<p> Your OTP is: <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin() 
  ],
});
