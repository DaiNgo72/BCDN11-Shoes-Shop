import axios from "axios";

// ENV
const BASE_URL = "https://movienew.cybersoft.edu.vn/api";
const TOKEN_CYBER_SOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxMSIsIkhldEhhblN0cmluZyI6IjIyLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNzUwNDAwMDAwMCIsIm5iZiI6MTcwOTc0NDQwMCwiZXhwIjoxNzM3NjUxNjAwfQ.nl0s6U9TVtfCtNNz9yMfG6ZupTn18NciJE96XGDOTmQ";
// ENV

// Không cần login (Public)
export const axiosWithoutAuth = axios.create({
  baseURL: BASE_URL,
  // Quá 3 phút sẽ xem như là gọi api thất bại.
  timeout: 180_000,

  headers: {
    TokenCybersoft: TOKEN_CYBER_SOFT,
  },
});

// Interceptor: Middleware
// Sau khi gọi api thành công, thất bại thì dữ liệu trả về sẽ đi qua interceptors.response này trước.

axiosWithoutAuth.interceptors.response.use(
  (value) => {
    return value.data;
  },
  (e) => {
    return Promise.reject(e);
  },
);

// axiosWithoutAuth({
//   method: "get",
//   url: "QuanLyPhim/LayThongTinPhim",
// });

// Cần login mới có thể gọi api (Private)
export const axiosWithAuth = axios.create({
  baseURL: BASE_URL,
  // Quá 3 phút sẽ xem như là gọi api thất bại.
  timeout: 180_000,

  headers: {
    TokenCybersoft: TOKEN_CYBER_SOFT,
  },
});
