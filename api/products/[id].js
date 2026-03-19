const { getDocument } = require('../_lib/firebase')
const staticProducts = require('../_lib/staticProducts')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const { id } = req.query

    let product = await getDocument('products', id).catch(() => null)
    if (!product) product = staticProducts.find(p => p.id === id)
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' })

    res.json({ success: true, data: product })
  } catch (err) {
    console.error('Product fetch error:', err)
    res.status(500).json({ success: false, message: 'Failed to fetch product.' })
  }
}
