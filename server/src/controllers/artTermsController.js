import prisma from '../../prismaClient.js'

export const getArtTermsByLang = async (req, res, next) => {
	try {
		const lang = req.params.lang ?? "uk"
		if (lang != "uk" && lang != "en") {
			return res.status(400).json({ error: 'invalid creator id' })
		}

        const orderBy = lang === "uk" ? { title_uk: 'asc' } : { title_en: 'asc' };
        console.log(prisma);
		const artTerms = await prisma.artTerm.findMany({
            orderBy: orderBy,
            select: {
                id: true,
                title_en: lang !== "uk",
                title_uk: lang === "uk",
                description_en: lang !== "uk",
                description_uk: lang === "uk",
            }
        });

        const terms = artTerms.map(term => {
            return lang === "uk" 
                ? { id: term.id, letter: term.title_uk[0], title: term.title_uk, description: term.description_uk }
                : { id: term.id, letter: term.title_en[0], title: term.title_en, description: term.description_en };
        })
        const firstTerms = [];
        terms.forEach(item => {
            const letterExists = firstTerms.filter(term => term.letter === item.letter).length
            if (letterExists) {
                return;
            }

            firstTerms.push(item);
        })

		res.json({ artTerms: firstTerms })
	} catch (error) {
		console.error('Error fetch data art-term id', error)
		next(error)
	}
}