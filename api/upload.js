import { Configuration, OpenAIApi } from "openai";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: { bodyParser: false },
};

export default function handler(req, res) {
  upload.single("image")(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "업로드 실패" });
    try {
      // 실제 동작 코드 (OpenAI 호출 등) 작성
      res.status(200).json({ url: "여기에 결과 URL" });
    } catch (error) {
      res.status(500).json({ error: "변환 중 오류 발생" });
    }
  });
}
