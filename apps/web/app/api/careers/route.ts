import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: { name?: string; email?: string; role?: string; linkedin?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, role, linkedin, message } = body;

  if (!name || !email || !role || !message) {
    return NextResponse.json({ error: "Name, email, role, and message are required." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Ark Industries <onboarding@resend.dev>",
      to: "anthonyachkarian@gmail.com",
      replyTo: email,
      subject: `New Application: ${role} — ${name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Inter',sans-serif;max-width:600px;margin:0 auto;background:#0a1628;color:#ffffff;padding:40px;border-radius:16px;">
          <div style="margin-bottom:28px;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <p style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#60a5fa;margin:0 0 4px;">Ark Industries — Careers</p>
            <h1 style="font-size:22px;font-weight:800;margin:0;color:#ffffff;">New Job Application</h1>
          </div>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:14px 16px 14px 0;border-bottom:1px solid rgba(255,255,255,0.07);vertical-align:top;width:100px;">
                <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Name</span>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#ffffff;font-weight:600;font-size:15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px 14px 0;border-bottom:1px solid rgba(255,255,255,0.07);vertical-align:top;">
                <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Email</span>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                <a href="mailto:${email}" style="color:#60a5fa;text-decoration:none;font-size:15px;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 16px 14px 0;border-bottom:1px solid rgba(255,255,255,0.07);vertical-align:top;">
                <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Role</span>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.07);color:#a78bfa;font-weight:700;font-size:15px;">${role}</td>
            </tr>
            <tr>
              <td style="padding:14px 16px 14px 0;border-bottom:1px solid rgba(255,255,255,0.07);vertical-align:top;">
                <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">LinkedIn</span>
              </td>
              <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                ${linkedin ? `<a href="${linkedin}" style="color:#60a5fa;text-decoration:none;font-size:15px;">${linkedin}</a>` : '<span style="color:#64748b;font-size:15px;">Not provided</span>'}
              </td>
            </tr>
            <tr>
              <td style="padding:14px 16px 14px 0;vertical-align:top;">
                <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Cover Letter</span>
              </td>
              <td style="padding:14px 0;color:#cbd5e1;line-height:1.65;font-size:15px;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>
          </table>

          <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);">
            <a href="mailto:${email}" style="display:inline-block;padding:12px 28px;background:#3b82f6;color:#ffffff;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">
              Reply to ${name}
            </a>
          </div>
          <p style="margin-top:28px;color:#475569;font-size:11px;line-height:1.6;">
            Submitted via <a href="https://arkindustriestech.com/careers" style="color:#64748b;">arkindustriestech.com/careers</a>
          </p>
        </div>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to submit your application. Please try again." }, { status: 500 });
  }
}
