import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

function getLikeField(entityType) {
  switch (entityType) {
    case "post":
      return "postId"
    case "product":
      return "productId"
    case "exhibition":
      return "exhibitionId"
    case "user":
    case "creator":
    case "museum":
    case "exhibition":
      return "likedUserId"
    default:
      return null
  }
}

export const toggleLikeEntity = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user?.id) {
      return res.status(401).json({ error: "User not authenticated" })
    }

    const { entityId, entityType } = req.body
    const entityIdInt = parseInt(entityId, 10)
    const userId = req.user.id

    const field = getLikeField(entityType)
    if (!field || !entityIdInt) {
      return res.status(400).json({ error: "Invalid or missing parameters" })
    }

    // Check if user already liked
    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        [field]: entityIdInt,
      },
    })

    let liked = false
    if (existingLike) {
      // If already liked, remove it
      await prisma.like.delete({
        where: { id: existingLike.id },
      })
    } else {
      // If not liked, create a new like
      await prisma.like.create({
        data: {
          userId,
          [field]: entityIdInt,
        },
      })
      liked = true
    }

    // Count the new total
    const likeCount = await prisma.like.count({
      where: { [field]: entityIdInt },
    })

    return res.status(200).json({ liked, likeCount })
  } catch (error) {
    next(error)
  }
}

export const getLikeStatus = async (req, res) => {
  try {
    // Since it's a GET request, read from req.query:
    const { entityId, entityType } = req.query
    const entityIdInt = parseInt(entityId, 10)

    // If your route requires auth:
    const userId = req.user?.id || null

    const field = getLikeField(entityType)
    if (!field || !entityIdInt) {
      return res.status(400).json({ error: "Invalid entity type" })
    }
    const likeCount = await prisma.like.count({
      where: { [field]: entityIdInt },
    })

    let liked = false
    if (userId) {
      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          [field]: entityIdInt,
        },
      })
      liked = Boolean(existingLike)
    }

    return res.status(200).json({ liked, likeCount })
  } catch (error) {
    next(error)
  }
}

export const getLikeCount = async (req, res) => {
  try {
    // Since it's a GET request, read from req.query:
    const { entityId, entityType } = req.query
    const entityIdInt = parseInt(entityId, 10)

    const field = getLikeField(entityType)
    if (!field || !entityIdInt) {
      return res.status(400).json({ error: "Invalid or missing parameters" })
    }
    const count = await prisma.like.count({
      where: { [field]: entityIdInt },
    })

    return res.status(200).json({ likeCount: count })
  } catch (error) {
    next(error)
  }
}

export const getTopLikedPosts = async (req, res) => {
  try {
    const topPosts = await prisma.post.findMany({
      include: {
        _count: {
          select: { likes: true }, // Count likes for each post
        },
      },
      orderBy: {
        likes: {
          _count: "desc", // Sort by like count in descending order
        },
      },
      take: 10, // You can adjust the limit
    })

    res.status(200).json(topPosts)
  } catch (error) {
    next(error)
  }
}

export const getTopLikedMuseums = async (req, res) => {
  try {
    const topMUseums = await prisma.user.findMany({
      where: {
        role: "MUSEUM",
      },
      include: {
        _count: {
          select: { likesReceived: true },
          // Count likes for each post
        },
      },
      orderBy: {
        likesReceived: {
          _count: "desc", // Sort by like count in descending order
        },
      },
      take: 10, // You can adjust the limit
    })

    res.status(200).json(topMUseums)
  } catch (error) {
    console.error("Error fetching top liked museum:", error)
    res.status(500).json({ error: "Failed to fetch top liked museum" })
  }
}

export const getTopLikedExhibitions = async (req, res) => {
  try {
    const topExhibitions = await prisma.exhibition.findMany({
      include: {
        images: true,
        _count: {
          select: { likes: true }, // Count likes for each post
        },
      },
      orderBy: {
        likes: {
          _count: "desc", // Sort by like count in descending order
        },
      },
      take: 10, // You can adjust the limit
    })

    res.status(200).json(topExhibitions)
  } catch (error) {
    console.error("Error fetching top liked posts:", error)
    res.status(500).json({ error: "Failed to fetch top liked posts" })
  }
}

export const getTopLikedPaintings = async (req, res) => {
  try {
    const topPaintings = await prisma.product.findMany({
      include: {
        images: true,
        _count: {
          select: { likes: true }, // Count likes for each post
        },
      },
      orderBy: {
        likes: {
          _count: "desc", // Sort by like count in descending order
        },
      },
      take: 10, // You can adjust the limit
    })

    res.status(200).json(topPaintings)
  } catch (error) {
    console.error("Error fetching top liked paintings:", error)
    res.status(500).json({ error: "Failed to fetch top liked paintings" })
  }
}
