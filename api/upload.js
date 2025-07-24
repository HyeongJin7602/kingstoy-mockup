import multer from "multer";

export const config = {
  api: { bodyParser: false },
};

const upload = multer({ storage: multer.memoryStorage() });

export default function handler(req, res) {
  upload.single("image")(req, res, function (err) {
    if (err) return res.status(500).json({ error: "업로드 실패" });
    if (!req.file) return res.status(400).json({ error: "파일 없음" });

    // 정상 동작 확인용
    res.status(200).json({
      message: "파일 업로드 성공!",
      originalname: req.file.originalname,
      size: req.file.size,
    });
  });
}
