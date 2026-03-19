const { addDocument } = require('./_lib/firebase')
const { sendNewsletterConfirmation } = require('./_lib/email')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const { email } = req.body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(422).json({ success: false, message: 'Valid email required' })
    }

    await addDocument('newsletter_subscribers', { email })
    await sendNewsletterConfirmation(email).catch(e =>
      console.warn('Newsletter email failed:', e.message)
    )

    res.json({ success: true, message: 'Subscribed successfully!' })
  } catch (err) {
    console.error('Newsletter error:', err)
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}
