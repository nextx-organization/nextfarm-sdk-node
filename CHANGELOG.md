# Nhật ký thay đổi

Theo [Semantic Versioning](https://semver.org/lang/vi/). Chính sách phiên bản: [VERSIONING.md](VERSIONING.md).

## 0.1.3 (2026-10-29)

### Thêm mới

- `GET /api/v1/gis/facilities`: Thêm tham số query:branchId
- `GET /api/v1/gis/parcels`: Thêm tham số query:branchId
- `GET /api/v1/gis/zones`: Thêm tham số query:branch_id
- `#/Gis.CreateFacilityRequest`: Thêm trường branch_id
- `#/Gis.CreateParcelRequest`: Thêm trường branch_id
- `#/Gis.CreatePondRequest`: Thêm trường branch_id
- `#/Gis.CreateZoneRequest`: Thêm trường branch_id
- `#/Gis.FacilityDetailDto`: Thêm trường branch_id
- `#/Gis.FacilityListItemDto`: Thêm trường branch_id
- `#/Gis.ParcelDetailDto`: Thêm trường branch_id
- `#/Gis.ParcelListItemDto`: Thêm trường branch_id
- `#/Gis.UpdateFacilityRequest`: Thêm trường branch_id
- `#/Gis.UpdateParcelRequest`: Thêm trường branch_id
- `#/Gis.UpdatePondRequest`: Thêm trường branch_id
- `#/Gis.UpdateZoneRequest`: Thêm trường branch_id
- `#/Gis.ZoneDto`: Thêm trường branch_id
- `#/Gis.ZoneListItemDto`: Thêm trường branch_id
- `#/Harvest.CreateFieldLogRequest`: Thêm trường client_request_id
- `#/Harvest.CreateFieldLogRequest`: Thêm trường inputs
- `#/Harvest.CreateFieldLogRequest`: Thêm trường work_type
- `#/Harvest.CreateHusbandryLogRequest`: Thêm trường feed_item_id
- `#/Harvest.CreateHusbandryLogRequest`: Thêm trường feed_item_name
- `#/Harvest.CreateHusbandryLogRequest`: Thêm trường inventory_issue_id
- `#/Gis.UpdateFacilityResult`: Thêm kiểu
- `#/Gis.UpdatePondResult`: Thêm kiểu
- `#/Harvest.CreateFieldLogInputRequest`: Thêm kiểu

### Sửa mô tả

- `GET /api/v1/gis/facilities`: Đổi mô tả
- `GET /api/v1/gis/parcels`: Đổi mô tả

## 0.1.2 (2026-10-28)

- Viết lại README, VERSIONING và CONTRIBUTING cho dễ đọc.
- Cập nhật mô tả `GET /api/v1/office/automations/ai-columns/catalog`.

## 0.1.1 (2026-10-28)

- Phát hành từ GitHub Actions kèm chứng nhận nguồn gốc. Mã không đổi so với 0.1.0.

## 0.1.0 (2026-10-28)

- Bản đầu tiên. Hỗ trợ năm nhóm API: bản đồ và mùa vụ, IoT, thu hoạch và truy xuất, văn phòng, báo cáo.
