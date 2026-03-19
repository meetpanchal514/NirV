const nodemailer = require('nodemailer')

const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@nirtrades.com'
const EMAIL_TO_SALES = process.env.EMAIL_TO_SALES || 'sales@nirtrades.com'

function getTransporter() {
  if (!process.env.SMTP_HOST) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function contactEmailHtml({ name, company, email, phone, subject, message }) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#020817;font-family:Inter,sans-serif;">
    <div style="max-width:560px;margin:40px auto;background:#061029;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      <div style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:24px 32px;">
        <p style="margin:0;color:#000;font-weight:800;font-size:20px;">Nir Trades</p>
        <p style="margin:4px 0 0;color:rgba(0,0,0,0.6);font-size:13px;">New Contact Form Submission</p>
      </div>
      <div style="padding:32px;">
        <table style="width:100%;border-collapse:collapse;">
          ${[['Name', name], ['Company', company || '—'], ['Email', `<a href="mailto:${email}" style="color:#f59e0b;">${email}</a>`], ['Phone', phone || '—'], ['Subject', subject]]
            .map(([k, v]) => `<tr><td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:13px;width:100px;">${k}</td><td style="padding:10px 0;color:#fff;font-size:14px;">${v}</td></tr>`)
            .join('')}
        </table>
        <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.04);border-radius:12px;">
          <p style="margin:0 0 8px;color:rgba(255,255,255,0.4);font-size:12px;">Message</p>
          <p style="margin:0;color:rgba(255,255,255,0.8);font-size:14px;line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    </div>
  </body></html>`
}

function quoteEmailHtml({ contactInfo, items, projectDetails }) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#020817;font-family:Inter,sans-serif;">
    <div style="max-width:600px;margin:40px auto;background:#061029;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
      <div style="background:linear-gradient(135deg,#f59e0b,#d97706);padding:24px 32px;">
        <p style="margin:0;color:#000;font-weight:800;font-size:20px;">Nir Trades</p>
        <p style="margin:4px 0 0;color:rgba(0,0,0,0.6);font-size:13px;">New Quote Request</p>
      </div>
      <div style="padding:32px;">
        <p style="color:#fff;font-size:15px;font-weight:600;margin:0;">${contactInfo.name} — ${contactInfo.company || ''}</p>
        <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:4px 0 16px;">
          <a href="mailto:${contactInfo.email}" style="color:#f59e0b;">${contactInfo.email}</a>
          ${contactInfo.phone ? ` · ${contactInfo.phone}` : ''}
        </p>
        <p style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 10px;">Requested Items</p>
        ${items.map(i => `<div style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
          <p style="color:#fff;font-size:13px;margin:0;">${i.productName}</p>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:2px 0 0;">Qty: ${i.quantity} × ${i.unit}</p>
        </div>`).join('')}
        <div style="margin-top:16px;padding:16px;background:rgba(245,158,11,0.08);border-radius:12px;border:1px solid rgba(245,158,11,0.2);">
          <p style="color:#fff;font-size:13px;margin:0;">Type: ${projectDetails.projectType}</p>
          <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:4px 0 0;">Location: ${projectDetails.location}</p>
          ${projectDetails.targetDate ? `<p style="color:rgba(255,255,255,0.6);font-size:13px;margin:4px 0 0;">Target: ${projectDetails.targetDate}</p>` : ''}
          ${projectDetails.notes ? `<p style="color:rgba(255,255,255,0.6);font-size:13px;margin:8px 0 0;">${projectDetails.notes}</p>` : ''}
        </div>
      </div>
    </div>
  </body></html>`
}

async function sendContactEmail(data) {
  const transport = getTransporter()
  if (!transport) return
  await transport.sendMail({
    from: `"Nir Trades Website" <${EMAIL_FROM}>`,
    to: EMAIL_TO_SALES,
    replyTo: data.email,
    subject: `[Contact] ${data.subject} — ${data.name}`,
    html: contactEmailHtml(data),
  })
}

async function sendQuoteEmail(data) {
  const transport = getTransporter()
  if (!transport) return
  await transport.sendMail({
    from: `"Nir Trades Website" <${EMAIL_FROM}>`,
    to: EMAIL_TO_SALES,
    replyTo: data.contactInfo.email,
    subject: `[Quote Request] ${data.contactInfo.company || data.contactInfo.name} — ${data.items.length} item(s)`,
    html: quoteEmailHtml(data),
  })
}

async function sendNewsletterConfirmation(email) {
  const transport = getTransporter()
  if (!transport) return
  await transport.sendMail({
    from: `"Nir Trades" <${EMAIL_FROM}>`,
    to: email,
    subject: "You're subscribed to Nir Trades updates",
    html: `<div style="max-width:480px;margin:40px auto;background:#061029;border-radius:16px;padding:32px;font-family:Inter,sans-serif;">
      <p style="color:#f59e0b;font-weight:800;font-size:22px;margin:0 0 8px;">Nir Trades</p>
      <p style="color:#fff;font-size:16px;font-weight:600;margin:0 0 12px;">You're in!</p>
      <p style="color:rgba(255,255,255,0.6);font-size:14px;line-height:1.6;margin:0 0 20px;">
        Thanks for subscribing. You'll receive new product announcements and updates.
      </p>
    </div>`,
  })
}

module.exports = { sendContactEmail, sendQuoteEmail, sendNewsletterConfirmation }
