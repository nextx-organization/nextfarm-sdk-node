# @nextfarm/sdk

> Mã trong kho này được sinh tự động từ [OpenAPI công khai](https://developers.nextfarm.vn/openapi.json). Đừng sửa tay — xem [CONTRIBUTING.md](CONTRIBUTING.md).

Gọi NextFarm API từ Node.js và TypeScript, có kiểu đầy đủ. Kiểu sinh từ [`/openapi.json`](https://developers.nextfarm.vn/openapi.json)
và chỉ gồm các tuyến khoá API gọi được, nên trình soạn thảo gợi đúng đường dẫn, tham số và hình dạng phản hồi.

```sh
npm i @nextfarm/sdk
```

```ts
import { createNextFarmClient, SANDBOX_URL } from "@nextfarm/sdk";

const nf = createNextFarmClient({ apiKey: process.env.NEXTFARM_API_KEY!, baseUrl: SANDBOX_URL });

const { data, error } = await nf.GET("/api/v1/iot/devices", { params: { query: { page: 1, pageSize: 20 } } });
if (error) throw new Error(`${error.status} ${error.title}`);
for (const d of data.items ?? []) console.log(d.name);
```

- Node.js ≥ 18, Deno, Bun và trình duyệt (dùng `fetch` chuẩn). Hỗ trợ cả ESM (`import`) và CommonJS (`require`).
- Mặc định gọi prod (`PROD_URL`). Thử nghiệm thì dùng `SANDBOX_URL` với khoá sandbox.
- Lỗi theo RFC 7807, trả trong `error` (`status`, `title`, `detail`, `code`), không ném ngoại lệ.
- Gọi ghi (POST/PUT/PATCH) nên gửi kèm `Idempotency-Key` để thử lại an toàn:
  `nf.POST(path, { body, headers: { "Idempotency-Key": crypto.randomUUID() } })`.
- Không đưa khoá API ra trình duyệt của người dùng cuối. Phía máy khách, dùng access token OAuth của ứng dụng.

Tài liệu: https://developers.nextfarm.vn/docs/sdk · Phiên bản và bỏ dần: [VERSIONING.md](https://github.com/nextx-organization/nextfarm-sdk-node/blob/main/VERSIONING.md) · Giấy phép MIT
