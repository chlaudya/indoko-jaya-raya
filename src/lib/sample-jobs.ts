import type { Job, RichBlock } from "./jobs"

/**
 * QA ONLY: two obviously fake jobs for testing /careers without touching Sanity.
 * Loaded by jobs.ts only in `next dev` with CAREERS_SAMPLE_JOBS=1; a production build ignores them.
 * The second job has no location on purpose (tests the WhatsApp message without "()").
 */
const p = (text: string, key: string): RichBlock => ({
  _type: "block",
  _key: key,
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: `${key}s`, text, marks: [] }],
})
const li = (text: string, key: string): RichBlock => ({ ...p(text, key), listItem: "bullet", level: 1 })

export const SAMPLE_JOBS: Job[] = [
  {
    slug: "contoh-staf-quality-control",
    status: "active",
    title: {
      id: "[CONTOH] Staf Quality Control",
      en: "[SAMPLE] Quality Control Staff",
      zh: "[示例] 质量控制专员",
      vi: "[MẪU] Nhân viên kiểm soát chất lượng",
      hi: "[नमूना] गुणवत्ता नियंत्रण कर्मचारी",
    },
    location: {
      id: "Surabaya, Jawa Timur",
      en: "Surabaya, East Java",
      zh: "东爪哇泗水",
      vi: "Surabaya, Đông Java",
      hi: "सुरबाया, पूर्वी जावा",
    },
    shortBlurb: {
      id: "Lowongan contoh untuk pengujian. Bukan posisi sungguhan.",
      en: "Sample listing for testing. Not a real position.",
      zh: "测试用示例职位，并非真实职位。",
      vi: "Tin tuyển dụng mẫu để kiểm thử. Không phải vị trí thật.",
      hi: "परीक्षण के लिए नमूना पद। यह वास्तविक पद नहीं है।",
    },
    description: {
      id: [
        p("Memeriksa kadar air, ukuran dan kebersihan komoditi yang masuk dan yang akan dikirim, serta mencatat hasilnya untuk setiap batch.", "d1"),
        p("Bekerja sama dengan tim gudang dan tim pengiriman agar setiap pesanan sesuai spesifikasi pembeli.", "d2"),
      ],
      en: [
        p("Check moisture, size and cleanliness of incoming and outgoing commodities and record the results for every batch.", "d1"),
        p("Work with the warehouse and delivery teams so every order matches the buyer's specification.", "d2"),
      ],
      zh: "检查进出库农产品的含水量、规格和清洁度，并记录每一批次的结果。",
      vi: "Kiểm tra độ ẩm, kích cỡ và độ sạch của nông sản nhập và xuất, ghi lại kết quả cho từng lô.",
      hi: "आने और जाने वाली जिंसों की नमी, आकार और सफ़ाई जाँचें और हर बैच का परिणाम दर्ज करें।",
    },
    qualifications: {
      id: [
        li("Minimal SMK/D3, diutamakan jurusan pertanian atau teknologi pangan", "q1"),
        li("Teliti dan terbiasa mencatat data", "q2"),
        li("Bersedia bekerja di gudang", "q3"),
      ],
      en: [
        li("Vocational school or diploma; agriculture or food technology preferred", "q1"),
        li("Careful and used to recording data", "q2"),
        li("Willing to work in a warehouse", "q3"),
      ],
      zh: "中专或大专学历，农业或食品技术专业优先；细心，习惯记录数据。",
      vi: "Tốt nghiệp trung cấp/cao đẳng, ưu tiên ngành nông nghiệp hoặc công nghệ thực phẩm; cẩn thận, quen ghi chép dữ liệu.",
      hi: "डिप्लोमा या व्यावसायिक शिक्षा, कृषि या खाद्य प्रौद्योगिकी को प्राथमिकता; सावधान और डेटा दर्ज करने का अभ्यास।",
    },
  },
  {
    slug: "contoh-sopir-truk",
    status: "active",
    title: {
      id: "[CONTOH] Sopir Truk Pengiriman",
      en: "[SAMPLE] Delivery Truck Driver",
      zh: "[示例] 配送卡车司机",
      vi: "[MẪU] Tài xế xe tải giao hàng",
      hi: "[नमूना] डिलीवरी ट्रक ड्राइवर",
    },
    location: {},
    shortBlurb: {},
    description: {
      id: "Lowongan contoh tanpa lokasi. Mengantar pesanan dari gudang ke pelanggan sesuai jadwal.",
      en: "Sample listing with no location. Deliver orders from the warehouse to customers on schedule.",
      zh: "无地点的示例职位。按时将订单从仓库送到客户手中。",
      vi: "Tin mẫu không có địa điểm. Giao đơn hàng từ kho đến khách hàng đúng lịch.",
      hi: "बिना स्थान वाला नमूना पद। गोदाम से ग्राहकों तक ऑर्डर समय पर पहुँचाएँ।",
    },
    qualifications: {
      id: "SIM B1 aktif dan pengalaman minimal 2 tahun.",
      en: "Valid B1 licence and at least 2 years of experience.",
      zh: "持有有效 B1 驾照，至少 2 年经验。",
      vi: "Có bằng lái B1 còn hiệu lực và ít nhất 2 năm kinh nghiệm.",
      hi: "वैध B1 लाइसेंस और कम से कम 2 साल का अनुभव।",
    },
  },
]
