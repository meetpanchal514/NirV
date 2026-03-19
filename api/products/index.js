const { getCollection } = require('../_lib/firebase')
const staticProducts = require('../_lib/staticProducts')

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })

  try {
    const { category, coating, inStock } = req.query

    let products
    try {
      const filters = []
      if (category && category !== 'all') filters.push({ field: 'category', op: '==', value: category })
      if (coating && coating !== 'all') filters.push({ field: 'coating', op: '==', value: coating })
      products = await getCollection('products', filters)
      if (!products.length) products = staticProducts
    } catch {
      products = staticProducts
    }

    if (inStock === 'true') products = products.filter(p => p.inStock)

    res.json({ success: true, data: products, total: products.length })
  } catch (err) {
    console.error('Products error:', err)
    res.status(500).json({ success: false, message: 'Failed to fetch products.' })
  }
}
