# 🚀 My Personal Portfolio

Một trang web Portfolio cá nhân hiện đại, phản hồi tốt (responsive) được xây dựng bằng **React.js**. Dự án này giúp trình bày các kỹ năng, kinh nghiệm và các sản phẩm mà tôi đã thực hiện một cách trực quan và chuyên nghiệp.

---

## ✨ Tính năng nổi bật

* **Dark Mode:** Hỗ trợ giao diện sáng/tối linh hoạt dựa trên sở thích người dùng.
* **Responsive Design:** Tương thích hoàn toàn với các thiết bị di động, máy tính bảng và desktop nhờ **Bootstrap**.
* **Smooth Animations:** Hiệu ứng xuất hiện mượt mà sử dụng **React Reveal** và **Typewriter Effect**.
* **Interactive Timeline:** Hiển thị kinh nghiệm làm việc và học tập dưới dạng trục thời gian trực quan với **React Chrono**.
* **CI/CD Ready:** Tự động triển khai (deploy) lên **Vercel** và **GitHub Pages** thông qua GitHub Actions.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích |
| --- | --- |
| **React 17** | Thư viện chính xây dựng giao diện người dùng. |
| **Styled Components** | Quản lý CSS-in-JS cho các thành phần giao diện. |
| **React Router 5** | Quản lý điều hướng (Navigation) trong ứng dụng. |
| **Bootstrap 5** | Hệ thống Grid và các UI components cơ bản. |
| **ESLint (Airbnb)** | Đảm bảo chất lượng mã nguồn theo tiêu chuẩn ngành. |

---

## 🚀 Hướng dẫn cài đặt

Để chạy dự án này ở môi trường cục bộ (local), hãy làm theo các bước sau:

1. **Clone dự án:**
```bash
git clone https://github.com/PhucHoang200/portfolio.git
cd portfolio

```


2. **Cài đặt các gói phụ thuộc:**
```bash
npm install

```


3. **Khởi chạy ứng dụng:**
```bash
npm start

```


Ứng dụng sẽ chạy tại: `http://localhost:3000`

---

## 📦 Triển khai (Deployment)

### Trên Vercel (Khuyên dùng)

Dự án được tối ưu hóa để chạy trên **Vercel**.

* **Lưu ý quan trọng:** Để tránh lỗi build do quy tắc ESLint khắt khe, hãy thêm biến môi trường (Environment Variable) sau trong Settings của Vercel:
* `DISABLE_ESLINT_PLUGIN`: `true`
* `CI`: `false`



### Trên GitHub Pages

Dự án sử dụng GitHub Actions để tự động build. Nếu bạn muốn deploy thủ công, hãy sử dụng:

```bash
npm run build

```

---

## 📁 Cấu trúc thư mục chính

```text
src/
 ├── components/     # Các thành phần giao diện dùng chung
 ├── theme/          # Cấu hình GlobalStyles và Themes (Light/Dark)
 ├── App.jsx         # Thành phần gốc quản lý Router và ThemeProvider
 ├── MainApp.jsx     # Thành phần chính điều phối luồng ứng dụng
 └── AppContext.js   # Quản lý trạng thái ứng dụng (Context API)

```

---

## 🤝 Đóng góp

Mọi đóng góp nhằm cải thiện dự án đều được trân trọng.

1. Fork dự án.
2. Tạo nhánh tính năng (`git checkout -b feature/AmazingFeature`).
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`).
4. Push lên nhánh (`git push origin feature/AmazingFeature`).
5. Mở một Pull Request.

---

## 📄 Giấy phép

Phân phối dưới giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

**Developed with ❤️ by [PhucHoang200**](https://www.google.com/search?q=https://github.com/PhucHoang200)

---

**Bạn có muốn tôi bổ sung thêm phần hướng dẫn thay đổi thông tin cá nhân (như Bio, Skills, Social links) vào file README này không?**
