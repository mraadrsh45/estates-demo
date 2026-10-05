import { Resend } from "resend";
import type { ContactFormData } from "./validation";
import { siteConfig } from "./config";

const resend = new Resend(process.env.RESEND_API_KEY);

function sanitize(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}

export async function sendContactEmail(data: ContactFormData) {
  const name = sanitize(data.name);
  const phone = sanitize(data.phone);
  const email = sanitize(data.email);
  const requirement = sanitize(data.requirement);
  const message = sanitize(data.message);

  const to = process.env.CONTACT_EMAIL ?? siteConfig.email;
  const from =
    process.env.EMAIL_FROM ?? "Western Real Estates <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New Enquiry — ${requirement} — ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0D0F; color: #F4F1EA; padding: 40px; border-radius: 8px;">
        <div style="border-bottom: 1px solid #C6A15B; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #C6A15B; margin: 0; font-size: 24px;">Western Real Estates</h1>
          <p style="color: #8C8C87; margin: 4px 0 0 0; font-size: 14px;">New Enquiry Received</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20; color: #8C8C87; font-size: 13px; width: 140px;">Full Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20; color: #8C8C87; font-size: 13px;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20; color: #8C8C87; font-size: 13px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20;"><a href="mailto:${email}" style="color: #C6A15B;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20; color: #8C8C87; font-size: 13px;">Requirement</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #1a1d20; color: #C6A15B; font-weight: 600;">${requirement}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #8C8C87; font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #1a1d20; font-size: 12px; color: #8C8C87;">
          <p>Western Real Estates · Sunny Enclave, Sector 125, Mohali, Punjab 140301</p>
        </div>
      </div>
    `,
  });

  if (error) throw new Error(error.message);
}
