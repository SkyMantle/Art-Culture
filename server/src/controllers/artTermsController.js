import prisma from '../../prismaClient.js'

export const getArtTermsByLang = async (req, res, next) => {
	try {
		const lang = req.params.lang ?? "uk"
		if (lang != "uk" && lang != "en") {
			return res.status(400).json({ error: 'invalid language' })
		}

        const orderBy = lang === "uk" ? { title_uk: 'asc' } : { title_en: 'asc' };
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

export const getArtTermsByLetter = async (req, res, next) => {
	try {
		let letter = req.params.letter
		if (!letter) {
			return res.status(400).json({ error: 'invalid letter' })
		}

        letter = letter[0]
        const orderBy = letter === "uk" ? { title_uk: 'asc' } : { title_en: 'asc' };
		const artTerms = await prisma.artTerm.findMany({
            orderBy: orderBy,
            where: {
                OR: [ 
                    {
                        title_uk: {
                            startsWith: letter
                        }
                    },
                    {
                        title_en: {
                            startsWith: letter
                        }
                    },
                ]
            }
        });

		res.json({ artTerms })
	} catch (error) {
		console.error('Error fetch data art-term id', error)
		next(error)
	}
}