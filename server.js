
import express from "express";
import cors from "cors";
import { scrapeWRPF } from "./scraper.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/api/test", (req, res) => {
  res.json({ message: "✅ WRPF backend is alive!" });
});

app.get("/api/progress-meets", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    res.write(`data: ${JSON.stringify({ progress: 50, federation: "WRPF" })}\n\n`);
    const wrpfMeets = await scrapeWRPF();
    res.write(`data: ${JSON.stringify({ complete: true, data: wrpfMeets })}\n\n`);
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`🚀 WRPF backend running on port ${PORT}`);
});
