import nodemailer from "nodemailer";

export async function sendContactNotification(input: { name: string; email: string; subject: string; message: string }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!host || !user || !pass || !to) return { skipped: true };

  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({
    from: user,
    to,
    replyTo: input.email,
    subject: `[Portfolio] ${input.subject}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(input.name)}</p><p><strong>Email:</strong> ${escapeHtml(input.email)}</p><p><strong>Subject:</strong> ${escapeHtml(input.subject)}</p><p style="white-space:pre-wrap">${escapeHtml(input.message)}</p></div>`,
  });
  return { skipped: false };
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char] ?? char));
}
