/**
 * NextFarm SDK cho Node.js/TypeScript. Kiểu `paths` sinh từ https://developers.nextfarm.vn/openapi.json — chỉ gồm các tuyến
 * khoá API gọi được — nên trình soạn thảo gợi đúng đường, tham số và hình dạng phản hồi.
 *
 *   const nf = createNextFarmClient({ apiKey: process.env.NEXTFARM_API_KEY! });
 *   const { data, error } = await nf.GET("/api/v1/iot/devices", { params: { query: { page: 1 } } });
 */
import createClient, { type Client } from "openapi-fetch";
import type { paths } from "./schema.js";
import { VERSION } from "./version.js";

export type { paths, components, operations } from "./schema.js";
export { VERSION };

export const PROD_URL = "https://api-prod.nextfarm.vn";
export const SANDBOX_URL = "https://api-dev.nextfarm.vn";

export interface NextFarmOptions {
  /** Khoá API `nfk_…` hoặc access token của ứng dụng OAuth. */
  apiKey: string;
  /** Mặc định prod; thử nghiệm dùng `SANDBOX_URL`. */
  baseUrl?: string;
  /** Ngôn ngữ thông báo lỗi: `vi` (mặc định) hoặc `en`. */
  language?: "vi" | "en";
  /** Thay fetch (proxy, đo đạc, kiểm thử). */
  fetch?: typeof globalThis.fetch;
}

export type NextFarmClient = Client<paths>;

/** Lỗi theo RFC 7807 mà API trả về khi `error` khác rỗng. */
export interface NextFarmProblem {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  code?: string;
  traceId?: string;
  errors?: Record<string, string[]>;
}

export function createNextFarmClient({ apiKey, baseUrl = PROD_URL, language = "vi", fetch }: NextFarmOptions): NextFarmClient {
  if (!apiKey) throw new Error("NextFarm SDK: thiếu apiKey");
  return createClient<paths>({
    baseUrl: baseUrl.replace(/\/+$/, ""),
    fetch,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Accept-Language": language,
      // Trình duyệt tự bỏ User-Agent nên chỉ có tác dụng phía máy chủ.
      "User-Agent": `nextfarm-sdk-node/${VERSION}`,
    },
  });
}
