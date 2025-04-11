import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the path to the main server directory (one level above src)
const uploadPath = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Absolute path to /uploads
  },
  filename: (req, file, cb) => {
    const sanitized = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + sanitized);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter,
});
