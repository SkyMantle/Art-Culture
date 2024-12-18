import multer from "multer"
import path, { dirname } from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  )
  const mimetype = allowedTypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only images are allowed",
      ),
    )
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 15 * 1920 * 1080 }, // 10 MB limit
})

const processImages = async (req, res, next) => {
  if (!req.files || !req.files.logoImages)
    return next(new Error("No files uploaded or missing 'logoImages'."))
  try {
    await Promise.all(
      req.files.logoImages.map(async (file) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const filename = `${uniqueSuffix}.webp`
        const outputPath = path.join(
          __dirname,
          "../../uploads/museumLogoImages",
          filename,
        )
        await sharp(file.buffer)
          .resize(1920)
          .webp({ quality: 80 })
          .toFile(outputPath)
        // Replace file information with the new processed file
        file.filename = filename
        file.path = outputPath
      }),
    )
    next()
  } catch (error) {
    logger.error("Error processing images:", error)
    next(error)
  }
}

export default {
  upload: upload.array("logoImages", 10),
  processImages,
}
