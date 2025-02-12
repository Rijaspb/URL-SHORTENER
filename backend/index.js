import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();
import QRCode from 'qrcode';

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect to database:", err));

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String, // Store only the ID, not the full URL
  clicks: { type: Number, default: 0 },
});

const Url = mongoose.model('Url', urlSchema);

app.post('/api/short', async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: 'Invalid URL' });

    const shortUrl = nanoid(8);
    const url = new Url({ originalUrl, shortUrl });
    await url.save();

    // Generate the full shortened URL
    const fullShortUrl = `http://localhost:3000/${shortUrl}`;

    // Generate QR code with the full shortened URL
    const qrCodeImg = await QRCode.toDataURL(fullShortUrl);

    return res.status(200).json({ message: "URL Generated", shortUrl: fullShortUrl, qrCodeImg });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/:shortUrl', async (req, res) => {
  try {
    const { shortUrl } = req.params;
    console.log(`Received request for short URL: ${shortUrl}`); 

    const url = await Url.findOne({ shortUrl });

    if (url) {
      url.clicks++;
      await url.save();

      const redirectUrl = url.originalUrl.startsWith('http') ? url.originalUrl : `http://${url.originalUrl}`;
      console.log(`Redirecting to: ${redirectUrl}`); 
      return res.redirect(redirectUrl);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(3000, () => console.log(`Server running on port 3000`));
