import express from 'express'

const router = express.Router()

router.get('/search', async (req, res) => {
	const { query } = req.body

	try {
		const results = await client.search({
			index: ['posts', 'products', 'exhibitions'],
			body: {
				query: {
					multi_match: {
						query,
						fields: [
							'title_en',
							'title_uk',
							'description_en',
							'description_uk',
							'content_en',
							'content_uk',
						],
					},
				},
			},
		})
		res.json(results.hits.hits.map(hit => hit._source))
	} catch (error) {
		console.error('Error searching:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
})

export default router
