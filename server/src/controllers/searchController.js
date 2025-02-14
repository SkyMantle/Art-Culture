import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const searchAuthors = async (req, res, next) => {
  try {
    const query = req.query.q || ""

    const authors = await prisma.user.findMany({
      where: {
        role: "CREATOR",
        OR: [
          { email: { contains: query.toLowerCase() } },
          { title: { contains: query.toLowerCase() } },
        ],
      },
      select: {
        id: true,
        email: true,
        title: true,
        bio: true,
        images: true,
      },
      take: 10, //Limit request
    })
    res.json({ authors })
  } catch (error) {
    console.error("Error searching for authors:", error)
    next(error)
  }
}

export const searchPainting = async (req, res, next) => {
  try {
    const query = req.query.q || ""
    const authorId = req.params.authorId
      ? parseInt(req.params.authorId, 10)
      : null

    const paintings = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { title_en: { contains: query.toLowerCase() } },
              { description_en: { contains: query.toLowerCase() } },
              { title_uk: { contains: query.toLowerCase() } },
              { description_uk: { contains: query.toLowerCase() } },
            ],
          },
          authorId ? { authorId: authorId } : {},
        ],
      },
      include: {
        images: true,
        author: {
          select: {
            id: true,
            email: true,
            title: true,
            bio: true,
            images: true,
          },
        },
      },
      take: 10, //Limit request
    })

    res.json({ paintings })
  } catch (error) {
    console.error("Error searching for paintings:", error)
    next(error)
  }
}

export const searchMuseum = async (req, res, next) => {
  try {
    const query = req.query.q || ""

    const museums = await prisma.user.findMany({
      where: {
        role: "MUSEUM",
        OR: [
          { email: { contains: query.toLowerCase() } },
          { title: { contains: query.toLowerCase() } },
          { bio: { contains: query.toLowerCase() } },
        ],
      },
      select: {
        id: true,
        email: true,
        title: true,
        bio: true,
        images: true,
        country: true,
        house_number: true,
        lat: true,
        lon: true,
        postcode: true,
        state: true,
        street: true,
        city: true,
      },
      take: 10, //Limit request
    })
    res.json({ museums })
  } catch (error) {
    console.error("Error searching for museums:", error)
    next(error)
  }
}

export const searchQuery = async (req, res, next) => {
  try {
    const query = req.query.q || ""

    const searchQuery = await prisma.user.findMany({
      where: {
        role: { in: ["CREATOR", "MUSEUM", "EXHIBITION", "MUSEUM"] },
        OR: [
          { email: { contains: query.toLowerCase() } },
          { title: { contain: query.toLowerCase() } },
        ],
      },
      select: {
        id: true,
        email: true,
        title: true,
        bio: true,
        images: true,
      },
      take: 10,
    })
    res.json({ searchQuery })
  } catch (error) {
    console.error("error searching", error)
    next(error)
  }
}

export const searchProductQuery = async (res, req, next) => {
  try {
    const query = req.query.q || ""
    const authorId = req.params.authorId
      ? parseInt(req.params.authorId, 10)
      : null

    const searchProduct = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { title_en: { contains: query.toLowerCase() } },
              { description_en: { contains: query.toLowerCase() } },
              { title_uk: { contains: query.toLowerCase() } },
              { description_uk: { contains: query.toLowerCase() } },
            ],
          },
          authorId ? { authorId: authorId || museumId } : {},
        ],
      },
      include: {
        images: true,
        author: {
          select: {
            id: true,
            email: true,
            title: true,
            bio: true,
            images: true,
          },
        },
      },
      take: 10,
    })

    res.json({ searchProduct })
  } catch (error) {
    console.error("error searching for product", error)
    next(error)
  }
}
