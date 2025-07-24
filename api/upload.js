// /api/upload.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST 요청만 지원합니다." });
    return;
  }

  // 테스트용 응답
  res.status(200).json({ ok: true, message: "API가 정상 작동합니다!" });
}
