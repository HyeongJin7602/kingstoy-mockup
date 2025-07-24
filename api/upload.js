import { Configuration, OpenAIApi } from "openai";
import multer from "multer";

// Multer 셋업: 업로드된 이미지를 메모리에 저장
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

// Next.js API Route용 래퍼
export default function handler(req, res) {
  upload.single("image")(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "업로드 실패" });
    try {
      const fileBuffer = req.file.buffer;
      const material = req.body.material || "acrylic";
      // OpenAI 호출 등등...
      res.status(200).json({ url: "여기에 결과 URL" });
    } catch (error) {
      res.status(500).json({ error: "변환 중 오류 발생" });
    }
  });
}
