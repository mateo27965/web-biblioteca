const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configura multer para manejar la carga de archivos.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../public/uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile-image-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.post('/upload-image', upload.single('image'), (req, res) => {
  try {
    // Aquí puedes actualizar la dirección de la imagen en el JSON del usuario.
    const imagePath = `./public/uploads/${req.file.filename}`;
    res.json({ imagePath });
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    res.status(500).json({ error: 'Error al cargar la imagen.' });
  }
});

module.exports = router;
