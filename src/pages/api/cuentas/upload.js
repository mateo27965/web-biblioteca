import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    console.log('Destination:', uploadDir); // Add a debug statement
    cb(null, uploadDir); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    console.log('Filename:', filename); // Add a debug statement
    cb(null, filename); // Rename the file to avoid collisions
  },
});

const upload = multer({ storage: storage });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('myfile')(req, res, async (err) => {
      if (err) {
        console.error('Error:', err); // Add a debug statement
        return res.status(500).json({ error: 'Error al subir la imagen.' });
      }

      console.log('File uploaded:', req.file); // Add a debug statement

      const imageUrl = `/uploads/${req.file.filename}`;
      console.log('Image URL:', imageUrl); // Add a debug statement

      res.status(200).json({ imageUrl });
    });
  } else {
    res.status(405).end(); // Método no permitido
  }
}
