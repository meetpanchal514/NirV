const { addDocument } = require('./_lib/firebase')
const { sendContactEmail } = require('./_lib/email')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const { name, company, email, phone, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(422).json({ success: false, message: 'Name, email, subject, and message are required.' })
    }

    const { id } = await addDocument('contacts', { name, company, email, phone, subject, message })

    await sendContactEmail({ name, company, email, phone, subject, message }).catch(e =>
      console.warn('Contact email failed:', e.message)
    )

    res.json({
      success: true,
      message: "Your message has been received. We'll respond within 1 business day.",
      id,
    })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}
