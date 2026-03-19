const { addDocument } = require('./_lib/firebase')
const { sendQuoteEmail } = require('./_lib/email')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const { contactInfo, items, projectDetails } = req.body

    if (!contactInfo?.email || !items?.length) {
      return res.status(422).json({ success: false, message: 'Contact info and at least one item are required.' })
    }

    const quoteData = { contactInfo, items, projectDetails, status: 'pending' }
    const { id } = await addDocument('quotes', quoteData)

    await sendQuoteEmail(quoteData).catch(e =>
      console.warn('Quote email failed:', e.message)
    )

    res.json({
      success: true,
      message: "Quote request received. We'll send pricing within 1–2 business days.",
      quoteId: id,
      reference: `NTQ-${id.slice(-6).toUpperCase()}`,
    })
  } catch (err) {
    console.error('Quote error:', err)
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' })
  }
}
