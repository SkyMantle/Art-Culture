<<<<<<< HEAD
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import morgan from "morgan"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import errorHandler from "./src/middleware/errorHandler.js"
import adminRoutes from "./src/routes/adminRoutes.js"
import artTermsRoutes from "./src/routes/artTermsRoutes.js"
import authRoutes from "./src/routes/authRoutes.js"
import exhibitionRoutes from "./src/routes/exhibitionRoutes.js"
import geoRoutes from "./src/routes/geoRoutes.js"
import likeRoutes from "./src/routes/likeRoutes.js"
import postRoutes from "./src/routes/postRoutes.js"
import productRoutes from "./src/routes/productRoutes.js"
import searchRoutes from "./src/routes/searchRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set("trust proxy", true)

app.use(express.json())

// Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'unsafe-inline'", "'self'"],
        //styleSrc: ["''"],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://*.tile.openstreetmap.org",
        ], // Added 'blob:' here
        connectSrc: ["'self'"],
        //fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
  }),
)

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)

// Rate Limiting
const limiter = rateLimit({
  windowMs: 0.2 * 60 * 1000, // 2 sec
  max: 10000, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)

// HTTP request logger
app.use(morgan("combined"))

// Middleware to parse JSON
app.use(express.json())

// Enforce HTTPS
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
      next()
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`)
    }
  })
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
// server.js or index.js

app.use(
  "/uploads/profileImages",
  express.static(path.join(__dirname, "uploads/profileImages")),
)

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts/postId", postRoutes)
app.use("/api/exhibitions", exhibitionRoutes)
app.use("/api/art-terms", artTermsRoutes)
app.use("/api/search", searchRoutes)
app.use("/api/geo", geoRoutes)
app.use("/api/like", likeRoutes)

// Route debugging
console.log("Environment", process.env.NODE_ENV)
console.log("Client URL", process.env.CLIENT_URL)

// Error Handling Middleware
app.use(errorHandler)

export default app
=======
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

const app = express();
let vite;

if (!isProd) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
} else {
  app.use(
    express.static(path.resolve(__dirname, '../dist/client'), {
      index: false,
    })
  );
}

app.use('*', async (req, res) => {
  const url = req.originalUrl;

  try {
    let template, render;

    if (!isProd) {
      template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = fs.readFileSync(path.resolve(__dirname, '../dist/client/index.html'), 'utf-8');
      render = (await import('../dist/server/entry-server.js')).render;
    }

    const { html } = await render();

    const $ = cheerio.load(template);
    $('#root').html(html);

    if (isProd) {
      const manifest = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, '../dist/client/manifest.json'), 'utf-8')
      );
      const clientEntry = Object.values(manifest).find((entry) => entry.isEntry);
      const clientScript = clientEntry.file;
      $('body').append(`<script type="module" src="/${clientScript}"></script>`);
    }

    const finalHtml = $.html();
    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.error(e);
    res.status(500).end(e.message);
  }
});

export default app;
>>>>>>> b9ccf9a (Initial commit with SSR-ready project)
