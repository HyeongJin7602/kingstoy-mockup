import { Configuration, OpenAIApi } from "openai";
import multer from "multer";

// Multer 셋업: 업로드된 이미지를 메모리에 저장
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

// OpenAI 클라이언트 설정
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 서버리스 핸들러: 업로드 & 변환
export default upload.single("image"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;              // 업로드된 이미지
    const material = req.body.material || "acrylic"; // 선택 옵션

    // DALL·E 이미지 편집 API 호출
    const response = await openai.createImageEdit(
      fileBuffer,                                   // 원본 이미지
      fileBuffer,                                   // 마스크 (전체 변환)
      `Convert this character into a high-quality ${material} mockup`,
      1,                                             // n=1장
      "512x512"
    );

    // 결과 URL 반환
    const imageUrl = response.data.data[0].url;
    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "변환 중 오류 발생" });
  }
};
