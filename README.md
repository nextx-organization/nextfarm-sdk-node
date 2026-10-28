# @nextfarm/sdk

Thư viện chính thức để gọi NextFarm API từ Node.js và TypeScript.

Mã trong kho này được sinh tự động từ [OpenAPI của NextFarm](https://developers.nextfarm.vn/openapi.json). Vui lòng không sửa trực tiếp, xem [CONTRIBUTING.md](CONTRIBUTING.md).

## Cài đặt

```sh
npm i @nextfarm/sdk
```

Yêu cầu Node.js 18 trở lên. Gói hỗ trợ cả `import` và `require`, chạy được trên Deno, Bun và trình duyệt.

## Bắt đầu

```ts
import { createNextFarmClient, SANDBOX_URL } from "@nextfarm/sdk";

const nf = createNextFarmClient({ apiKey: process.env.NEXTFARM_API_KEY!, baseUrl: SANDBOX_URL });

const { data, error } = await nf.GET("/api/v1/iot/devices", { params: { query: { page: 1, pageSize: 20 } } });
if (error) throw new Error(`${error.status} ${error.title}`);
for (const d of data.items ?? []) console.log(d.name);
```

## Ghi chú

- Mặc định client gọi môi trường production. Khi thử nghiệm, dùng `SANDBOX_URL` với khoá sandbox.
- Lỗi trả về theo chuẩn RFC 7807 trong `error` (`status`, `title`, `detail`, `code`), không ném ngoại lệ.
- Với các lệnh ghi (POST, PUT, PATCH), nên gửi `Idempotency-Key` để thử lại an toàn:
  `nf.POST(path, { body, headers: { "Idempotency-Key": crypto.randomUUID() } })`.
- Không đưa khoá API vào mã chạy trên trình duyệt của người dùng cuối. Ứng dụng phía máy khách nên dùng access token OAuth.

## Tài liệu

- Hướng dẫn: https://developers.nextfarm.vn/docs/sdk
- Phiên bản và chính sách ngừng hỗ trợ: [VERSIONING.md](VERSIONING.md)
- Nhật ký thay đổi: [CHANGELOG.md](CHANGELOG.md)

Giấy phép MIT.
