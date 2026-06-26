import { env } from "@fullstack-boilerplate/env/server";
import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  return resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    react,
  });
}
