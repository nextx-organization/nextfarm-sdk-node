/**
 * NextFarm SDK for Node.js and TypeScript. Types are generated from https://developers.nextfarm.vn/openapi.json.
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
  /** API key (`nfk_...`) or OAuth access token. */
  apiKey: string;
  /** Defaults to production. Use `SANDBOX_URL` for testing. */
  baseUrl?: string;
  /** Language of error messages: `vi` (default) or `en`. */
  language?: "vi" | "en";
  /** Custom fetch implementation. */
  fetch?: typeof globalThis.fetch;
}

export type NextFarmClient = Client<paths>;

/** RFC 7807 problem details returned in `error`. */
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
  if (!apiKey) throw new Error("NextFarm SDK: apiKey is required");
  return createClient<paths>({
    baseUrl: baseUrl.replace(/\/+$/, ""),
    fetch,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Accept-Language": language,
      "User-Agent": `nextfarm-sdk-node/${VERSION}`,
    },
  });
}
