import type { Locale } from "./i18n"

type LString = Partial<Record<Locale, string>>

/** Buyer-facing copy built from Brief §5 "Acuan umum". Ranges are market reference, not Indoko assay results. */
export type AcuanDisplay = {
  tradeName: LString
  /** One sentence for cards. Carries the parameters buyers compare first. */
  card: LString
  /** Product page paragraph. Same ranges as the spec table. */
  description: LString
  chips: LString[]
  /** Meta description, 140–160 characters. */
  meta: LString
}

const l = (id: string, en: string, zh: string, vi: string, hi: string): LString => ({ id, en, zh, vi, hi })

export const acuanDisplayBySlug: Record<string, AcuanDisplay> = {
  "kacang-mete": {
    tradeName: l(
      "Kacang Mete Gelondong (RCN) dan Kernel Mete",
      "Raw Cashew Nut in Shell (RCN) and Cashew Kernel",
      "带壳腰果（RCN）与腰果仁",
      "Hạt điều thô còn vỏ (RCN) và nhân điều",
      "छिलके सहित काजू (RCN) और काजू गिरी",
    ),
    card: l(
      "Gelondong (RCN): nut count 170 sampai 220 per kg, KOR umumnya 45 sampai 52 lbs, karung goni 80 kg.",
      "In shell (RCN): nut count 170 to 220 per kg, KOR typically 45 to 52 lbs, packed in 80 kg jute bags.",
      "带壳腰果（RCN）：每公斤 170 至 220 粒，KOR 通常 45 至 52 磅，80 公斤黄麻袋。",
      "Điều còn vỏ (RCN): 170 đến 220 hạt/kg, KOR thường 45 đến 52 lbs, bao đay 80 kg.",
      "छिलके सहित (RCN): 170 से 220 दाने प्रति किलो, KOR आमतौर पर 45 से 52 पाउंड, 80 किलो जूट बोरी।",
    ),
    description: l(
      "Kacang mete gelondong (RCN) dijemur alami dan disortir manual sebelum pemuatan. Acuan pasar: nut count 170 sampai 220 butir per kg, KOR umumnya 45 sampai 52 lbs per karung 80 kg, kadar air maks. 10% (TCVN 12380:2018), kacang rusak maks. 8 sampai 10%. Kemasan yang lazim adalah karung goni 80 kg. Kernel diperdagangkan pada grade WW180 sampai WW450, kadar air maks. 5%, dalam kaleng vakum atau kantong vakum. Angka ini acuan pasar, bukan hasil uji Indoko. Harga atas permintaan. Sampel dan COA tersedia atas permintaan.",
      "Raw cashew nuts in shell (RCN), sun dried and hand sorted before loading. Market reference: nut count 170 to 220 per kg, KOR typically 45 to 52 lbs per 80 kg bag, moisture max. 10% (TCVN 12380:2018), defective nuts max. 8 to 10%. Usual packing is 80 kg jute bags. Kernels trade as WW180 to WW450, moisture max. 5%, in vacuum tins or vacuum bags. These figures are a market reference, not Indoko assay results. Price on request. Samples and a COA are available on request.",
      "带壳腰果（RCN）经自然晾晒，并在装运前人工分选。市场参考：每公斤 170 至 220 粒，KOR 通常为每 80 公斤袋 45 至 52 磅，水分最高 10%（TCVN 12380:2018），坏果最高 8% 至 10%。常见包装为 80 公斤黄麻袋。腰果仁等级为 WW180 至 WW450，水分最高 5%，真空铁罐或真空袋。以上为市场参考，不是 Indoko 的检测结果。价格另询。样品和 COA 可应要求提供。",
      "Hạt điều thô còn vỏ (RCN), phơi nắng tự nhiên và phân loại thủ công trước khi đóng hàng. Tham chiếu thị trường: 170 đến 220 hạt/kg, KOR thường 45 đến 52 lbs mỗi bao 80 kg, độ ẩm tối đa 10% (TCVN 12380:2018), hạt hỏng tối đa 8 đến 10%. Bao bì thường gặp là bao đay 80 kg. Nhân điều giao dịch ở hạng WW180 đến WW450, độ ẩm tối đa 5%, hộp thiếc hút chân không hoặc túi hút chân không. Số liệu này là tham chiếu thị trường, không phải kết quả kiểm nghiệm của Indoko. Giá theo yêu cầu. Mẫu và COA cung cấp khi được yêu cầu.",
      "छिलके सहित कच्चा काजू (RCN), धूप में सुखाया और लदान से पहले हाथ से छाँटा हुआ। बाज़ार संदर्भ: 170 से 220 दाने प्रति किलो, KOR आमतौर पर 80 किलो बोरी पर 45 से 52 पाउंड, नमी अधिकतम 10% (TCVN 12380:2018), खराब दाने अधिकतम 8 से 10%। सामान्य पैकिंग 80 किलो जूट बोरी है। गिरी WW180 से WW450 ग्रेड में बिकती है, नमी अधिकतम 5%, वैक्यूम टिन या वैक्यूम बैग में। ये आँकड़े बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं। कीमत अनुरोध पर। नमूना और COA अनुरोध पर उपलब्ध हैं।",
    ),
    chips: [
      l("Nut count 170–220/kg", "Nut count 170–220/kg", "粒数 170–220/kg", "170–220 hạt/kg", "170–220 दाने/किग्रा"),
      l("KOR 45–52 lbs", "KOR 45–52 lbs", "KOR 45–52 磅", "KOR 45–52 lbs", "KOR 45–52 पाउंड"),
      l("Karung goni 80 kg", "Jute bag 80 kg", "黄麻袋 80 kg", "Bao đay 80 kg", "जूट बोरी 80 किग्रा"),
    ],
    meta: l(
      "Kacang mete gelondong (RCN) dari Indonesia. Acuan pasar: nut count 170 sampai 220 per kg, karung goni 80 kg. Minta penawaran ke PT Indoko Jaya Raya.",
      "Indonesian raw cashew in shell (RCN) from PT Indoko Jaya Raya. Market reference: nut count 170 to 220 per kg, 80 kg jute bags. Request a quote.",
      "印尼带壳腰果（RCN），PT Indoko Jaya Raya。市场参考：每公斤 170 至 220 粒，80 公斤黄麻袋。欢迎索取报价。样品与 COA 可应要求提供。",
      "Hạt điều thô còn vỏ (RCN) từ Indonesia, PT Indoko Jaya Raya. Tham chiếu: 170 đến 220 hạt/kg, bao đay 80 kg. Yêu cầu báo giá. KOR 45 đến 52 lbs.",
      "इंडोनेशिया का छिलके सहित काजू (RCN), PT Indoko Jaya Raya। संदर्भ: 170 से 220 दाने/किग्रा, 80 किलो जूट बोरी। कोट का अनुरोध करें।",
    ),
  },
  "asam-kupas": {
    tradeName: l(
      "Asam Jawa (Tamarind)",
      "Tamarind",
      "罗望子",
      "Me (tamarind)",
      "इमली (टैमरिंड)",
    ),
    card: l(
      "Pulp tanpa biji atau dengan biji. Acuan: kemurnian min. 98% untuk seedless merah, karton 25 kg.",
      "Seedless pulp or pulp with seed. Reference: purity min. 98% for red seedless, 25 kg cartons.",
      "无籽果肉或带籽果肉。参考：红无籽纯度最低 98%，25 公斤纸箱。",
      "Thịt me không hạt hoặc còn hạt. Tham chiếu: độ tinh khiết tối thiểu 98% cho me đỏ không hạt, thùng 25 kg.",
      "बिना बीज का गूदा या बीज सहित। संदर्भ: लाल बीजरहित में शुद्धता न्यूनतम 98%, 25 किलो कार्टन।",
    ),
    description: l(
      "Asam jawa kering, disortir manual, dalam bentuk polong utuh, pulp dengan biji, pulp tanpa biji, blok, atau pasta. Acuan pasar untuk pulp kering tanpa biji: kadar air maks. 12 sampai 20%, kemurnian min. 98% pada varian seedless merah, kotoran batu maks. 2%, serat maks. 1%. Kemasan yang lazim adalah karton 25 kg atau blok 5, 10, dan 20 kg. Cocok untuk pengolahan pangan, saus, dan minuman. Angka ini acuan pasar, bukan hasil uji Indoko. COA tersedia atas permintaan.",
      "Dried tamarind, hand sorted, sold as whole pods, pulp with seed, seedless pulp, blocks, or paste. Market reference for dry seedless pulp: moisture max. 12 to 20%, purity min. 98% for the red seedless variety, stones max. 2%, fibre max. 1%. Packed in 25 kg cartons or blocks of 5, 10, or 20 kg. Suitable for food processing, sauces, and beverages. These figures are a market reference, not Indoko assay results. A COA is available on request.",
      "干罗望子，人工分选，形态包括整荚、带籽果肉、无籽果肉、块状或酱。无籽干果肉的市场参考：水分最高 12% 至 20%，红无籽纯度最低 98%，石子最高 2%，纤维最高 1%。常见包装为 25 公斤纸箱，或 5、10、20 公斤块。适用于食品加工、酱料和饮料。以上为市场参考，不是 Indoko 的检测结果。COA 可应要求提供。",
      "Me khô, phân loại thủ công, dạng trái nguyên, thịt còn hạt, thịt không hạt, khối hoặc bột nhão. Tham chiếu cho thịt khô không hạt: độ ẩm tối đa 12 đến 20%, độ tinh khiết tối thiểu 98% với me đỏ không hạt, sạn tối đa 2%, xơ tối đa 1%. Đóng thùng carton 25 kg hoặc khối 5, 10 và 20 kg. Phù hợp chế biến thực phẩm, nước sốt và đồ uống. Số liệu này là tham chiếu thị trường, không phải kết quả kiểm nghiệm của Indoko. COA cung cấp khi được yêu cầu.",
      "सूखी इमली, हाथ से छाँटी हुई, पूरी फली, बीज सहित गूदा, बीजरहित गूदा, ब्लॉक या पेस्ट के रूप में। सूखे बीजरहित गूदे का बाज़ार संदर्भ: नमी अधिकतम 12 से 20%, लाल बीजरहित में शुद्धता न्यूनतम 98%, पत्थर अधिकतम 2%, रेशा अधिकतम 1%। 25 किलो कार्टन या 5, 10 और 20 किलो ब्लॉक। खाद्य प्रसंस्करण, सॉस और पेय के लिए। ये आँकड़े बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं। COA अनुरोध पर।",
    ),
    chips: [
      l("Seedless atau dengan biji", "Seedless or with seed", "无籽或带籽", "Không hạt hoặc còn hạt", "बीजरहित या बीज सहित"),
      l("Kemurnian min. 98%", "Purity min. 98%", "纯度最低 98%", "Tinh khiết tối thiểu 98%", "शुद्धता न्यूनतम 98%"),
      l("Karton 25 kg", "Carton 25 kg", "纸箱 25 kg", "Thùng 25 kg", "कार्टन 25 किग्रा"),
    ],
    meta: l(
      "Asam jawa kering dari Indonesia. Acuan pasar: kemurnian min. 98% untuk seedless merah, karton 25 kg. Minta penawaran ke PT Indoko Jaya Raya.",
      "Dried tamarind from Indonesia, PT Indoko Jaya Raya. Market reference: purity min. 98% for red seedless, 25 kg cartons. Request a quote today.",
      "印尼干罗望子，PT Indoko Jaya Raya。市场参考：红无籽纯度最低 98%，25 公斤纸箱。欢迎索取报价，并说明所需形态与数量。",
      "Me khô từ Indonesia, PT Indoko Jaya Raya. Tham chiếu thị trường: độ tinh khiết tối thiểu 98% cho me đỏ không hạt, thùng 25 kg. Yêu cầu báo giá.",
      "इंडोनेशिया की सूखी इमली, PT Indoko Jaya Raya। संदर्भ: लाल बीजरहित में शुद्धता न्यूनतम 98%, 25 किलो कार्टन। कोट का अनुरोध करें।",
    ),
  },
  "kacang-tanah": {
    tradeName: l(
      "Kacang Tanah Kupas dan Gelondong",
      "Groundnut Kernel and In Shell",
      "花生仁与带壳花生",
      "Nhân lạc và lạc còn vỏ",
      "मूंगफली गिरी और छिलके सहित",
    ),
    card: l(
      "Kernel dijual menurut count per ons. Acuan: kadar air maks. 6 sampai 8%. Aflatoksin diuji per lot, COA atas permintaan.",
      "Kernels sold by count per ounce. Reference: moisture max. 6 to 8%. Aflatoxin tested per lot, COA on request.",
      "花生仁按每盎司粒数销售。参考：水分最高 6% 至 8%。每批检测黄曲霉毒素，COA 可应要求提供。",
      "Nhân lạc bán theo số hạt mỗi ounce. Tham chiếu: độ ẩm tối đa 6 đến 8%. Aflatoxin kiểm từng lô, COA khi được yêu cầu.",
      "गिरी औंस प्रति गिनती पर बिकती है। संदर्भ: नमी अधिकतम 6 से 8%। एफ्लाटॉक्सिन हर लॉट पर जाँच, COA अनुरोध पर।",
    ),
    description: l(
      "Kacang tanah kupas, tipe Bold atau Java, dibersihkan mesin dan disortir, dijual menurut count per ons. Acuan pasar: Bold 35/40 sampai 80/90, Java 40/50 sampai 80/90, kadar air maks. 6 sampai 8%, admixture maks. 1%, kadar minyak sekitar 45 sampai 58%. Kemasan karung PP atau goni 25 atau 50 kg. Aflatoksin diuji per lot dan COA tersedia. Kacang gelondong memakai count terpisah. Angka ini acuan pasar, bukan hasil uji Indoko.",
      "Raw groundnut kernels, Bold or Java type, machine cleaned and sorted, sold by count per ounce. Market reference: Bold counts from 35/40 to 80/90, Java counts from 40/50 to 80/90, moisture max. 6 to 8%, admixture max. 1%, oil about 45 to 58%. Packed in 25 or 50 kg PP or jute bags. Aflatoxin is tested per lot and a COA is available. In shell lots use a separate count. These ranges are a market reference, not Indoko assay results.",
      "生花生仁，Bold 或 Java 型，机器清理并分选，按每盎司粒数销售。市场参考：Bold 为 35/40 至 80/90，Java 为 40/50 至 80/90，水分最高 6% 至 8%，异种最高 1%，含油约 45% 至 58%。包装为 25 或 50 公斤 PP 袋或麻袋。每批检测黄曲霉毒素并提供 COA。带壳货使用另一套粒数。以上为市场参考，不是 Indoko 的检测结果。",
      "Nhân lạc sống, loại Bold hoặc Java, làm sạch bằng máy và phân loại, bán theo số hạt mỗi ounce. Tham chiếu thị trường: Bold 35/40 đến 80/90, Java 40/50 đến 80/90, độ ẩm tối đa 6 đến 8%, tạp chất tối đa 1%, dầu khoảng 45 đến 58%. Đóng bao PP hoặc đay 25 hoặc 50 kg. Aflatoxin được kiểm từng lô và có COA. Lạc còn vỏ dùng thang đếm riêng. Các khoảng này là tham chiếu thị trường, không phải kết quả kiểm nghiệm của Indoko.",
      "कच्ची मूंगफली गिरी, Bold या Java, मशीन से साफ और छाँटी, औंस प्रति गिनती पर। बाज़ार संदर्भ: Bold 35/40 से 80/90, Java 40/50 से 80/90, नमी अधिकतम 6 से 8%, मिलावट अधिकतम 1%, तेल लगभग 45 से 58%। 25 या 50 किलो PP या जूट बोरी। एफ्लाटॉक्सिन हर लॉट पर जाँच और COA उपलब्ध। छिलके सहित लॉट की गिनती अलग है। ये सीमाएँ बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं।",
    ),
    chips: [
      l("Count per ons", "Count per ounce", "每盎司粒数", "Số hạt/ounce", "औंस प्रति गिनती"),
      l("Kadar air maks. 6–8%", "Moisture max. 6–8%", "水分最高 6–8%", "Độ ẩm tối đa 6–8%", "नमी अधिकतम 6–8%"),
      l("Karung PP atau goni 25/50 kg", "PP or jute 25/50 kg", "PP 或麻袋 25/50 kg", "Bao PP hoặc đay 25/50 kg", "PP या जूट 25/50 किग्रा"),
    ],
    meta: l(
      "Kacang tanah kupas dari Indonesia, dijual menurut count per ons. Acuan: kadar air maks. 6 sampai 8%. Minta penawaran ke PT Indoko Jaya Raya.",
      "Indonesian groundnut kernels, sold by count per ounce. Market reference: moisture max. 6 to 8%. Request a quote from PT Indoko Jaya Raya today.",
      "印尼花生仁，按每盎司粒数销售。市场参考：水分最高 6% 至 8%。欢迎向 PT Indoko Jaya Raya 索取报价。每批提供黄曲霉毒素检测。",
      "Nhân lạc Indonesia, bán theo số hạt mỗi ounce. Tham chiếu: độ ẩm tối đa 6 đến 8%. Yêu cầu báo giá từ PT Indoko Jaya Raya ngay hôm nay. COA theo lô.",
      "इंडोनेशियाई मूंगफली गिरी, औंस प्रति गिनती पर। संदर्भ: नमी अधिकतम 6 से 8%। PT Indoko Jaya Raya से कोट का अनुरोध करें।",
    ),
  },
  "kacang-hijau": {
    tradeName: l(
      "Kacang Hijau (Vigna radiata)",
      "Green Mung Bean (Vigna radiata)",
      "绿豆（Vigna radiata）",
      "Đậu xanh (Vigna radiata)",
      "हरी मूंग (Vigna radiata)",
    ),
    card: l(
      "Kacang hijau utuh, ukuran 2,8 mm sampai 4,5 mm, kemurnian min. 98 sampai 99%, karung PP 25 atau 50 kg.",
      "Whole green mung beans, 2.8 mm to 4.5 mm, purity min. 98 to 99%, PP bags of 25 or 50 kg.",
      "整粒绿豆，2.8 至 4.5 毫米，纯度最低 98% 至 99%，25 或 50 公斤 PP 袋。",
      "Đậu xanh nguyên hạt, 2,8 mm đến 4,5 mm, độ tinh khiết tối thiểu 98 đến 99%, bao PP 25 hoặc 50 kg.",
      "साबुत हरी मूंग, 2.8 मिमी से 4.5 मिमी, शुद्धता न्यूनतम 98 से 99%, 25 या 50 किलो PP बोरी।",
    ),
    description: l(
      "Kacang hijau utuh (Vigna radiata), dibersihkan mesin dan disortir. Acuan pasar: ukuran 2,8 mm sampai 4,5 mm, pembeli kecambah biasanya meminta 3,5 mm ke atas, kemurnian min. 98 sampai 99%, kadar air maks. 12 sampai 13%, admixture maks. 0,5 sampai 1%, daya kecambah min. 90% untuk tauge. Kemasan karung PP 25 atau 50 kg. Sertifikat fitosanitari, surat keterangan asal, dan analisis lab tersedia atas permintaan. Angka ini acuan pasar, bukan hasil uji Indoko.",
      "Whole green mung beans (Vigna radiata), machine cleaned and sorted. Market reference: size 2.8 mm to 4.5 mm, with sprouting buyers usually asking 3.5 mm and up, purity min. 98 to 99%, moisture max. 12 to 13%, admixture max. 0.5 to 1%, germination min. 90% for sprouting. Packed in 25 or 50 kg PP bags. Phytosanitary certificate, certificate of origin, and lab analysis are available on request. These figures are a market reference, not Indoko assay results.",
      "整粒绿豆（Vigna radiata），机器清理并分选。市场参考：粒径 2.8 至 4.5 毫米，芽用买家通常要求 3.5 毫米及以上，纯度最低 98% 至 99%，水分最高 12% 至 13%，异种最高 0.5% 至 1%，芽用发芽率最低 90%。包装为 25 或 50 公斤 PP 袋。植物检疫证、原产地证和实验室分析可应要求提供。以上为市场参考，不是 Indoko 的检测结果。",
      "Đậu xanh nguyên hạt (Vigna radiata), làm sạch bằng máy và phân loại. Tham chiếu thị trường: cỡ 2,8 mm đến 4,5 mm, người mua làm giá thường yêu cầu từ 3,5 mm, độ tinh khiết tối thiểu 98 đến 99%, độ ẩm tối đa 12 đến 13%, tạp chất tối đa 0,5 đến 1%, tỷ lệ nảy mầm tối thiểu 90% cho giá đỗ. Đóng bao PP 25 hoặc 50 kg. Giấy kiểm dịch thực vật, giấy chứng nhận xuất xứ và phân tích lab cung cấp khi được yêu cầu. Số liệu này là tham chiếu thị trường, không phải kết quả kiểm nghiệm của Indoko.",
      "साबुत हरी मूंग (Vigna radiata), मशीन से साफ और छाँटी। बाज़ार संदर्भ: आकार 2.8 मिमी से 4.5 मिमी, अंकुरित उपयोग के खरीदार अक्सर 3.5 मिमी और ऊपर माँगते हैं, शुद्धता न्यूनतम 98 से 99%, नमी अधिकतम 12 से 13%, मिलावट अधिकतम 0.5 से 1%, अंकुरण न्यूनतम 90%। 25 या 50 किलो PP बोरी। फाइटोसैनिटरी, मूल प्रमाणपत्र और लैब विश्लेषण अनुरोध पर। ये आँकड़े बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं।",
    ),
    chips: [
      l("3,5 mm ke atas", "3.5 mm and up", "3.5 毫米及以上", "Từ 3,5 mm", "3.5 मिमी और ऊपर"),
      l("Kemurnian 98–99%", "Purity 98–99%", "纯度 98–99%", "Tinh khiết 98–99%", "शुद्धता 98–99%"),
      l("Karung PP 25/50 kg", "PP bag 25/50 kg", "PP 袋 25/50 kg", "Bao PP 25/50 kg", "PP बोरी 25/50 किग्रा"),
    ],
    meta: l(
      "Kacang hijau utuh (Vigna radiata) dari Indonesia. Acuan pasar: kemurnian min. 98 sampai 99%, karung PP 25 atau 50 kg. Minta penawaran ke PT Indoko.",
      "Whole green mung beans from Indonesia, PT Indoko Jaya Raya. Market reference: purity min. 98 to 99%, 25 or 50 kg PP bags. Request a quote today.",
      "印尼整粒绿豆（Vigna radiata），PT Indoko Jaya Raya。市场参考：纯度最低 98% 至 99%，25 或 50 公斤 PP 袋。欢迎索取报价。",
      "Đậu xanh nguyên hạt từ Indonesia, PT Indoko Jaya Raya. Tham chiếu: độ tinh khiết tối thiểu 98 đến 99%, bao PP 25 hoặc 50 kg. Yêu cầu báo giá.",
      "इंडोनेशिया की साबुत हरी मूंग, PT Indoko Jaya Raya। संदर्भ: शुद्धता न्यूनतम 98 से 99%, 25 या 50 किलो PP बोरी। कोट का अनुरोध करें।",
    ),
  },
  "ubi-porang": {
    tradeName: l(
      "Porang / Konjac (chip kering)",
      "Porang / Konjac (dried chips)",
      "魔芋 / Konjac（干片）",
      "Porang / Konjac (lát khô)",
      "पोरांग / कोंजैक (सूखी चिप्स)",
    ),
    card: l(
      "Chip konjac kering. Acuan publik mutu I: kadar air sekitar 9 sampai 12%, glukomanan sekitar 38 sampai 47%.",
      "Dried konjac chips. Published grade I reference: moisture about 9 to 12%, glucomannan about 38 to 47%.",
      "干魔芋片。公开的一级片参考：水分约 9% 至 12%，葡甘聚糖约 38% 至 47%。",
      "Lát konjac khô. Tham chiếu công bố cho lát hạng I: độ ẩm khoảng 9 đến 12%, glucomannan khoảng 38 đến 47%.",
      "सूखी कोंजैक चिप्स। प्रकाशित ग्रेड I संदर्भ: नमी लगभग 9 से 12%, ग्लूकोमैनन लगभग 38 से 47%।",
    ),
    description: l(
      "Chip porang (konjac) kering dari Indonesia, irisan sekitar 5 sampai 10 mm. Acuan publik untuk chip mutu I: kadar air sekitar 9 sampai 12%, glukomanan sekitar 38 sampai 47%. Derajat putih, residu sulfur dioksida, dan logam berat dikonfirmasi per lot. Kemasan karung PP. COA tersedia atas permintaan. Angka ini acuan publik, bukan hasil uji Indoko.",
      "Dried konjac (porang) chips from Indonesia, sliced about 5 to 10 mm. Published reference for grade I chips: moisture about 9 to 12%, glucomannan about 38 to 47%. Whiteness, sulphur dioxide residue, and heavy metals are confirmed per lot. Packed in PP bags. A COA is available on request. These figures are a published market reference, not Indoko assay results.",
      "印尼干魔芋（konjac）片，切片约 5 至 10 毫米。一级片的公开参考：水分约 9% 至 12%，葡甘聚糖约 38% 至 47%。白度、二氧化硫残留和重金属按批次确认。包装为 PP 袋。COA 可应要求提供。以上为公开市场参考，不是 Indoko 的检测结果。",
      "Lát porang (konjac) khô từ Indonesia, thái khoảng 5 đến 10 mm. Tham chiếu công bố cho lát hạng I: độ ẩm khoảng 9 đến 12%, glucomannan khoảng 38 đến 47%. Độ trắng, dư lượng lưu huỳnh đioxit và kim loại nặng được xác nhận theo lô. Đóng bao PP. COA cung cấp khi được yêu cầu. Số liệu này là tham chiếu thị trường đã công bố, không phải kết quả kiểm nghiệm của Indoko.",
      "इंडोनेशिया की सूखी कोंजैक (पोरांग) चिप्स, लगभग 5 से 10 मिमी मोटी। ग्रेड I का प्रकाशित संदर्भ: नमी लगभग 9 से 12%, ग्लूकोमैनन लगभग 38 से 47%। सफेदी, सल्फर डाइऑक्साइड अवशेष और भारी धातुएँ हर लॉट पर पुष्टि होती हैं। PP बोरी। COA अनुरोध पर। ये आँकड़े प्रकाशित बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं।",
    ),
    chips: [
      l("Irisan 5–10 mm", "Slice 5–10 mm", "切片 5–10 毫米", "Lát 5–10 mm", "मोटाई 5–10 मिमी"),
      l("Kadar air sekitar 12%", "Moisture about 12%", "水分约 12%", "Độ ẩm khoảng 12%", "नमी लगभग 12%"),
      l("Glukomanan 38–47%", "Glucomannan 38–47%", "葡甘聚糖 38–47%", "Glucomannan 38–47%", "ग्लूकोमैनन 38–47%"),
    ],
    meta: l(
      "Chip porang (konjac) kering dari Indonesia. Acuan publik mutu I: kadar air sekitar 9 sampai 12%. Minta penawaran dan COA ke PT Indoko Jaya Raya.",
      "Dried konjac (porang) chips from Indonesia. Published grade I reference: moisture about 9 to 12%. Request a quote from PT Indoko Jaya Raya today.",
      "印尼干魔芋（konjac）片。一级片公开参考：水分约 9% 至 12%。欢迎向 PT Indoko Jaya Raya 索取报价与 COA。葡甘聚糖按批次确认。",
      "Lát porang (konjac) khô từ Indonesia. Tham chiếu hạng I: độ ẩm khoảng 9 đến 12%. Yêu cầu báo giá từ PT Indoko Jaya Raya ngay hôm nay. COA theo lô.",
      "इंडोनेशिया की सूखी कोंजैक (पोरांग) चिप्स। ग्रेड I संदर्भ: नमी लगभग 9 से 12%। PT Indoko Jaya Raya से कोट और COA माँगें।",
    ),
  },
  "jagung-kupas": {
    tradeName: l(
      "Jagung Pipil Kuning",
      "Yellow Shelled Corn",
      "黄玉米粒",
      "Ngô vàng tách hạt",
      "पीला छिला मक्का",
    ),
    card: l(
      "Jagung pipil kuning untuk pakan atau pangan. Acuan: kadar air maks. 14%, kemurnian min. 98 sampai 99%, karung PP atau curah.",
      "Dried yellow shelled corn for feed or food. Moisture max. 14%, purity min. 98 to 99%, PP bags or bulk.",
      "饲用或食用黄玉米粒。参考：水分最高 14%，纯度最低 98% 至 99%，PP 袋或散装。",
      "Ngô vàng tách hạt cho thức ăn hoặc thực phẩm. Tham chiếu: độ ẩm tối đa 14%, độ tinh khiết tối thiểu 98 đến 99%, bao PP hoặc xá.",
      "चारा या खाद्य पीला छिला मक्का। संदर्भ: नमी अधिकतम 14%, शुद्धता न्यूनतम 98 से 99%, PP बोरी या थोक।",
    ),
    description: l(
      "Jagung pipil kuning kering untuk pakan atau pangan. Acuan pasar: kadar air maks. 14% (12 sampai 14% untuk grade pangan), butir pecah maks. 1 sampai 5%, benda asing maks. 1 sampai 2%, kemurnian min. 98 sampai 99%. Batas grade pangan juga mengikuti SNI 8926:2020 pada tabel di bawah. Aflatoksin diuji per lot. Kemasan karung PP 25 atau 50 kg, atau curah. Angka ini acuan pasar, bukan hasil uji Indoko.",
      "Dried yellow shelled corn (maize) for feed or food. Market reference: moisture max. 14% (12 to 14% for food grade), broken kernels max. 1 to 5%, foreign matter max. 1 to 2%, purity min. 98 to 99%. Food grade limits also follow SNI 8926:2020 in the table below. Aflatoxin is tested per lot. Packed in 25 or 50 kg PP bags or in bulk. These figures are a market reference, not Indoko assay results.",
      "饲用或食用干黄玉米粒。市场参考：水分最高 14%（食用级 12% 至 14%），破碎粒最高 1% 至 5%，杂质最高 1% 至 2%，纯度最低 98% 至 99%。食用级限值另见下方 SNI 8926:2020 表。每批检测黄曲霉毒素。包装为 25 或 50 公斤 PP 袋，或散装。以上为市场参考，不是 Indoko 的检测结果。",
      "Ngô vàng tách hạt khô cho thức ăn hoặc thực phẩm. Tham chiếu thị trường: độ ẩm tối đa 14% (12 đến 14% cho hạng thực phẩm), hạt vỡ tối đa 1 đến 5%, tạp chất tối đa 1 đến 2%, độ tinh khiết tối thiểu 98 đến 99%. Hạn mức hạng thực phẩm cũng theo SNI 8926:2020 ở bảng bên dưới. Aflatoxin được kiểm từng lô. Đóng bao PP 25 hoặc 50 kg, hoặc hàng xá. Số liệu này là tham chiếu thị trường, không phải kết quả kiểm nghiệm của Indoko.",
      "चारा या खाद्य सूखा पीला छिला मक्का। बाज़ार संदर्भ: नमी अधिकतम 14% (खाद्य ग्रेड 12 से 14%), टूटे दाने अधिकतम 1 से 5%, बाहरी पदार्थ अधिकतम 1 से 2%, शुद्धता न्यूनतम 98 से 99%। खाद्य ग्रेड की सीमाएँ नीचे SNI 8926:2020 तालिका में हैं। एफ्लाटॉक्सिन हर लॉट पर जाँच। 25 या 50 किलो PP बोरी या थोक। ये आँकड़े बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं।",
    ),
    chips: [
      l("Kadar air maks. 14%", "Moisture max. 14%", "水分最高 14%", "Độ ẩm tối đa 14%", "नमी अधिकतम 14%"),
      l("Kemurnian 98–99%", "Purity 98–99%", "纯度 98–99%", "Tinh khiết 98–99%", "शुद्धता 98–99%"),
      l("Karung PP atau curah", "PP bag or bulk", "PP 袋或散装", "Bao PP hoặc xá", "PP बोरी या थोक"),
    ],
    meta: l(
      "Jagung pipil kuning dari Indonesia untuk pakan atau pangan. Acuan pasar: kadar air maks. 14%. Minta penawaran ke PT Indoko Jaya Raya hari ini.",
      "Indonesian yellow shelled corn for feed or food. Market reference: moisture max. 14%. Request a quote from PT Indoko Jaya Raya. Aflatoxin tested per lot.",
      "印尼黄玉米粒，饲用或食用。市场参考：水分最高 14%。欢迎向 PT Indoko Jaya Raya 索取报价。每批检测黄曲霉毒素，价格另询。",
      "Ngô vàng tách hạt từ Indonesia cho thức ăn hoặc thực phẩm. Tham chiếu: độ ẩm tối đa 14%. Yêu cầu báo giá từ PT Indoko Jaya Raya ngay hôm nay.",
      "इंडोनेशिया का पीला छिला मक्का, चारा या खाद्य। संदर्भ: नमी अधिकतम 14%। PT Indoko Jaya Raya से आज कोट का अनुरोध करें।",
    ),
  },
  kopi: {
    tradeName: l(
      "Kopi Hijau (belum sangrai)",
      "Green Coffee Beans",
      "生咖啡豆",
      "Cà phê nhân xanh",
      "हरी कॉफी बीन्स",
    ),
    card: l(
      "Kopi hijau, Robusta atau Arabica. Acuan SNI: kadar air maks. 12,5%, karung goni 60 kg.",
      "Green coffee, Robusta or Arabica. SNI reference: moisture max. 12.5%, packed in 60 kg jute bags.",
      "生咖啡豆，Robusta 或 Arabica。SNI 参考：水分最高 12.5%，60 公斤黄麻袋。",
      "Cà phê nhân xanh, Robusta hoặc Arabica. Tham chiếu SNI: độ ẩm tối đa 12,5%, bao đay 60 kg.",
      "हरी कॉफी, रोबस्टा या अरेबिका। SNI संदर्भ: नमी अधिकतम 12.5%, 60 किलो जूट बोरी।",
    ),
    description: l(
      "Biji kopi hijau Indonesia, Robusta atau Arabica, proses natural, washed, atau wet hulled. Acuan SNI 01-2907-2008: kadar air maks. 12,5%, kotoran maks. 0,5%, nilai cacat dinilai per sampel 300 g. Kemasan karung goni 60 kg, dengan liner GrainPro atau vakum untuk grade tinggi. Sampel dan COA tersedia atas permintaan. Angka ini acuan SNI, bukan skor cupping Indoko.",
      "Indonesian green coffee beans, Robusta or Arabica, natural, washed, or wet hulled. Market reference under SNI 01-2907-2008: moisture max. 12.5%, foreign matter max. 0.5%, defect value graded per 300 g sample. Packed in 60 kg jute bags, with a GrainPro liner or vacuum pack for higher grades. Samples and a COA are available on request. These figures are the SNI reference, not an Indoko cupping score.",
      "印尼生咖啡豆，Robusta 或 Arabica，日晒、水洗或湿刨。SNI 01-2907-2008 参考：水分最高 12.5%，杂质最高 0.5%，缺陷值按 300 克样品分级。包装为 60 公斤黄麻袋，高等级可用 GrainPro 内袋或真空包装。样品和 COA 可应要求提供。以上为 SNI 参考，不是 Indoko 的杯测分数。",
      "Cà phê nhân xanh Indonesia, Robusta hoặc Arabica, chế biến khô, ướt hoặc wet hulled. Tham chiếu SNI 01-2907-2008: độ ẩm tối đa 12,5%, tạp chất tối đa 0,5%, điểm lỗi chấm trên mẫu 300 g. Đóng bao đay 60 kg, có lót GrainPro hoặc hút chân không cho hạng cao. Mẫu và COA cung cấp khi được yêu cầu. Số liệu này là tham chiếu SNI, không phải điểm cupping của Indoko.",
      "इंडोनेशियाई हरी कॉफी, रोबस्टा या अरेबिका, नैचुरल, वाश्ड या वेट हल्ड। SNI 01-2907-2008 संदर्भ: नमी अधिकतम 12.5%, बाहरी पदार्थ अधिकतम 0.5%, दोष मान 300 ग्राम नमूने पर। 60 किलो जूट बोरी, ऊँचे ग्रेड पर GrainPro लाइनर या वैक्यूम। नमूना और COA अनुरोध पर। ये आँकड़े SNI संदर्भ हैं, Indoko का कपिंग स्कोर नहीं।",
    ),
    chips: [
      l("Kadar air maks. 12,5%", "Moisture max. 12.5%", "水分最高 12.5%", "Độ ẩm tối đa 12,5%", "नमी अधिकतम 12.5%"),
      l("Mutu cacat SNI", "SNI defect grades", "SNI 缺陷等级", "Hạng lỗi SNI", "SNI दोष ग्रेड"),
      l("Karung goni 60 kg", "Jute bag 60 kg", "黄麻袋 60 kg", "Bao đay 60 kg", "जूट बोरी 60 किग्रा"),
    ],
    meta: l(
      "Biji kopi hijau Indonesia, Robusta atau Arabica. Acuan SNI: kadar air maks. 12,5%, karung goni 60 kg. Minta penawaran ke PT Indoko Jaya Raya.",
      "Indonesian green coffee, Robusta or Arabica, from PT Indoko Jaya Raya. SNI reference: moisture max. 12.5%, 60 kg jute bags. Request a quote.",
      "印尼生咖啡豆，Robusta 或 Arabica，PT Indoko Jaya Raya。SNI 参考：水分最高 12.5%，60 公斤黄麻袋。欢迎索取报价与样品。",
      "Cà phê nhân xanh Indonesia, Robusta hoặc Arabica, PT Indoko Jaya Raya. Tham chiếu SNI: độ ẩm tối đa 12,5%, bao đay 60 kg. Yêu cầu báo giá ngay hôm nay.",
      "इंडोनेशियाई हरी कॉफी, रोबस्टा या अरेबिका, PT Indoko Jaya Raya। SNI संदर्भ: नमी अधिकतम 12.5%, 60 किलो जूट बोरी। कोट माँगें।",
    ),
  },
  cengkeh: {
    tradeName: l(
      "Cengkeh Kering dan Gagang Cengkeh",
      "Dried Whole Cloves and Clove Stems",
      "干丁香与丁香梗",
      "Đinh hương khô và cuống đinh hương",
      "सूखी लौंग और लौंग की डंठल",
    ),
    card: l(
      "Cengkeh kering utuh. Acuan: kadar air maks. 10 sampai 12%, gagang maks. 1 sampai 3%, karung anyam 10 sampai 50 kg.",
      "Dried whole cloves. Reference: moisture max. 10 to 12%, stems max. 1 to 3%, woven bags of 10 to 50 kg.",
      "干整朵丁香。参考：水分最高 10% 至 12%，花梗最高 1% 至 3%，编织袋 10 至 50 公斤。",
      "Đinh hương khô nguyên bông. Tham chiếu: độ ẩm tối đa 10 đến 12%, cuống tối đa 1 đến 3%, bao dệt 10 đến 50 kg.",
      "सूखी साबुत लौंग। संदर्भ: नमी अधिकतम 10 से 12%, डंठल अधिकतम 1 से 3%, बुनी बोरी 10 से 50 किलो।",
    ),
    description: l(
      "Cengkeh kering utuh dari Indonesia, varietas seperti Zanzibar, Lalpari, Siputih, atau Sikotok, termasuk grade AB6 hasil pilihan tangan. Acuan pasar: kadar air maks. 10 sampai 12%, benda asing maks. 0,5 sampai 1%, gagang maks. 1 sampai 3%, minyak atsiri sekitar 15 sampai 20%. Kemasan karung anyam 10, 20, 25, atau 50 kg. Gagang cengkeh kering, dibersihkan dan disortir, dicantumkan terpisah untuk penyulingan minyak. COA per lot tersedia atas permintaan. Angka ini acuan pasar, bukan hasil uji Indoko.",
      "Indonesian dried whole cloves, varieties such as Zanzibar, Lalpari, Siputih, or Sikotok, including hand selected grade AB6. Market reference: moisture max. 10 to 12%, foreign matter max. 0.5 to 1%, stems max. 1 to 3%, essential oil about 15 to 20%. Packed in woven bags of 10, 20, 25, or 50 kg. Dried clove stems, cleaned and sorted, are listed separately for oil distillation. A COA per lot is available on request. These figures are a market reference, not Indoko assay results.",
      "印尼干整朵丁香，品种如 Zanzibar、Lalpari、Siputih 或 Sikotok，包括手工挑选的 AB6 级。市场参考：水分最高 10% 至 12%，杂质最高 0.5% 至 1%，花梗最高 1% 至 3%，精油约 15% 至 20%。包装为 10、20、25 或 50 公斤编织袋。干丁香梗经清理和分选后单独列出，供精油蒸馏。每批 COA 可应要求提供。以上为市场参考，不是 Indoko 的检测结果。",
      "Đinh hương khô nguyên bông từ Indonesia, giống như Zanzibar, Lalpari, Siputih hoặc Sikotok, gồm hạng AB6 chọn tay. Tham chiếu thị trường: độ ẩm tối đa 10 đến 12%, tạp chất tối đa 0,5 đến 1%, cuống tối đa 1 đến 3%, tinh dầu khoảng 15 đến 20%. Đóng bao dệt 10, 20, 25 hoặc 50 kg. Cuống đinh hương khô, đã làm sạch và phân loại, được nêu riêng cho chưng cất tinh dầu. COA từng lô cung cấp khi được yêu cầu. Số liệu này là tham chiếu thị trường, không phải kết quả kiểm nghiệm của Indoko.",
      "इंडोनेशिया की सूखी साबुत लौंग, ज़ांज़ीबार, लालपरी, सिपुतिह या सिकोटोक जैसी किस्में, हाथ से चुना AB6 ग्रेड सहित। बाज़ार संदर्भ: नमी अधिकतम 10 से 12%, बाहरी पदार्थ अधिकतम 0.5 से 1%, डंठल अधिकतम 1 से 3%, सुगंधित तेल लगभग 15 से 20%। 10, 20, 25 या 50 किलो बुनी बोरी। सूखी लौंग की डंठल, साफ और छाँटी हुई, तेल आसवन के लिए अलग दर्ज है। हर लॉट का COA अनुरोध पर। ये आँकड़े बाज़ार संदर्भ हैं, Indoko की जाँच रिपोर्ट नहीं।",
    ),
    chips: [
      l("Kadar air maks. 10–12%", "Moisture max. 10–12%", "水分最高 10–12%", "Độ ẩm tối đa 10–12%", "नमी अधिकतम 10–12%"),
      l("Gagang maks. 1–3%", "Stems max. 1–3%", "花梗最高 1–3%", "Cuống tối đa 1–3%", "डंठल अधिकतम 1–3%"),
      l("Karung anyam 10–50 kg", "Woven bag 10–50 kg", "编织袋 10–50 kg", "Bao dệt 10–50 kg", "बुनी बोरी 10–50 किग्रा"),
    ],
    meta: l(
      "Cengkeh kering utuh dari Indonesia. Acuan pasar: kadar air maks. 10 sampai 12%, karung anyam 10 sampai 50 kg. Minta penawaran ke PT Indoko Jaya Raya.",
      "Indonesian dried whole cloves from PT Indoko Jaya Raya. Market reference: moisture max. 10 to 12%, woven bags 10 to 50 kg. Request a quote today.",
      "印尼干整朵丁香，PT Indoko Jaya Raya。市场参考：水分最高 10% 至 12%，编织袋 10 至 50 公斤。欢迎索取报价。丁香梗单独供应蒸馏用。",
      "Đinh hương khô nguyên bông từ Indonesia, PT Indoko Jaya Raya. Tham chiếu: độ ẩm tối đa 10 đến 12%, bao dệt 10 đến 50 kg. Yêu cầu báo giá ngay.",
      "इंडोनेशिया की सूखी साबुत लौंग, PT Indoko Jaya Raya। संदर्भ: नमी अधिकतम 10 से 12%, बुनी बोरी 10 से 50 किलो। कोट का अनुरोध करें।",
    ),
  },
}
