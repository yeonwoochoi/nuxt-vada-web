import axios from "axios";

/**
 * 서버 미들웨어
 * 클라이언트 사이드 -> CORS 에러
 * 클라이언트 -> 서버 (/api/pg-approve) -> PG -> 서버 -> 클라이언트
 */
export default async function (req, res, next) {
  const config = req.body
  console.log('hello')
  const { data } = await axios(config)
  res.end(JSON.stringify(data))
}
