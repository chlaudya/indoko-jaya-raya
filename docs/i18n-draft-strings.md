# i18n draft strings: client review

Status: **DRAFT**. Machine-assisted zh / vi / hi translations for every string that used to fall back to Indonesian, plus new trust-section copy. None is approved yet. (`docs/cms/schema-freeze-v1.md` lists machine-translated copy as out of scope; these are placeholders for review, not final copy.)

How it works: `pickLocale` (src/lib/i18n.ts) uses an explicit locale value (fixture or Sanity) first, then `src/lib/i18n-drafts.ts` (keyed by the Indonesian text), then Indonesian. To approve or correct a string, enter it in Sanity / on the fixture, or edit the drafts file. If the Indonesian source changes, its draft stops matching and that locale falls back to Indonesian again.

Counts per locale (zh / vi / hi each): hero headline 1 · landing page 31 (why-choose label + heading + 3 cards × title/body, 4 icon-strip items × title/body, 5 WhatsApp templates, 10 UI strings) · site strings 196 · image alt text 26 · **total 254**. Not translated (names): WhatsApp, Indoco Jaya Raya, PT Indoco Jaya Raya.

## Client pending
- **Real trust stats (optional).** No stats ship: the mock numbers were removed. `home.stats` stays in the CMS; the row is hidden until the client supplies confirmed numbers (1–3 re-centre).
- **WhatsApp number (launch blocker).** Every button reads `settings.waTargets`, which still holds the placeholder 6281234567890.
- **Phone and email.** The footer shows "Menyusul" until confirmed; no email is configured.
- Review every zh / vi / hi string below, and the id / en why-choose, icon-strip and WhatsApp-template copy (drafted from the PM brief; no stats, certification or sustainability claims).

## Hero headline (designer drafts; emphasised phrase in bold/italic)

| id | zh | vi | hi |
|---|---|---|---|
| Agrobisnis lokal untuk pasar nasional dan internasional. | 立足本土的农业企业，面向**国内与国际**市场。 | Doanh nghiệp nông nghiệp địa phương cho thị trường *trong nước và quốc tế*. | **राष्ट्रीय और अंतरराष्ट्रीय** बाज़ारों के लिए स्थानीय कृषि व्यवसाय। |

## Landing page v1 (src/lib/fixtures.ts). All 5 locales are drafts

Why choose us (ui.whyChooseUs + whyChoose: title, body), icon strip (iconStrip: title, body), the 5 contextual WhatsApp templates (siteSettings.waTemplates) and new UI strings. No numbers, certification or sustainability claims. The zh / vi / hi of `ui.whyChooseLabel` and of the 5 WhatsApp messages live in `src/lib/i18n-drafts.ts` (keyed by the Indonesian text); the messages stay hardcoded until they move to the CMS (post-launch).

| key | id | en | zh | vi | hi |
|---|---|---|---|---|---|
| ui.whyChooseLabel | Keunggulan kami | Why work with us | 我们的优势 | Thế mạnh của chúng tôi | हमारी ख़ूबियाँ |
| ui.whyChooseUs | Mengapa memilih kami | Why choose us | 为何选择我们 | Vì sao chọn chúng tôi | हमें क्यों चुनें |
| whyChoose.sort.title | Sortir sebelum kirim | Sorted before shipping | 发货前品质分拣 | Phân loại trước khi giao | भेजने से पहले छँटाई |
| whyChoose.sort.body | Komoditi disortir sebelum dikirim agar sesuai kebutuhan pembeli. Dengan begitu, kualitas yang Anda terima tetap konsisten dari satu pengiriman ke pengiriman berikutnya. | Commodities are sorted before they ship, to match what buyers need. That way, the quality you receive stays consistent from one shipment to the next. | 农产品在发货前经过分拣，以符合买家需求。这样，您收到的品质在每一次发货中都保持一致。 | Nông sản được phân loại trước khi giao để phù hợp với nhu cầu người mua. Nhờ đó, chất lượng bạn nhận được luôn đồng đều từ chuyến hàng này sang chuyến hàng khác. | भेजने से पहले जिंसों की छँटाई की जाती है, ताकि वे ख़रीदार की ज़रूरत के अनुरूप हों। इस तरह, आपको मिलने वाली गुणवत्ता हर शिपमेंट में एक जैसी बनी रहती है। |
| whyChoose.price.title | Harga Tangan Pertama | First-hand prices | 源头直供价格 | Giá tận gốc | सीधे स्रोत से दाम |
| whyChoose.price.body | Kami bermitra langsung dengan petani lokal tanpa rantai perantara, sehingga harga tetap bersaing. Penawaran disesuaikan dengan volume dan spesifikasi pesanan Anda. | We partner directly with local farmers with no chain of middlemen, so prices stay competitive. Offers are tailored to the volume and specifications of your order. | 我们直接与本地农户合作，没有中间商环节，因此价格始终具有竞争力。报价将根据您订单的数量和规格量身制定。 | Chúng tôi hợp tác trực tiếp với nông dân địa phương, không qua chuỗi trung gian, nên giá luôn cạnh tranh. Báo giá được điều chỉnh theo khối lượng và quy cách đơn hàng của bạn. | हम बिना बिचौलियों की शृंखला के सीधे स्थानीय किसानों के साथ साझेदारी करते हैं, इसलिए दाम प्रतिस्पर्धी बने रहते हैं। प्रस्ताव आपके ऑर्डर की मात्रा और विनिर्देशों के अनुसार तय किया जाता है। |
| whyChoose.fleet.title | Armada Banyak, Siap Antar | A large fleet, ready to deliver | 车队充足，随时配送 | Đội xe đông đảo, sẵn sàng giao hàng | बड़ा बेड़ा, डिलीवरी के लिए तैयार |
| whyChoose.fleet.body | Didukung banyak armada milik sendiri, kami mengatur setiap pengiriman dari gudang hingga ke tujuan Anda. Pesanan tiba dengan aman dan sesuai jadwal yang disepakati. | Backed by a large fleet of our own, we arrange every shipment from our warehouse to your destination. Orders arrive safely and on the agreed schedule. | 依托自有的众多车辆，我们安排从仓库到目的地的每一次运输。货物安全并按约定时间送达。 | Với đội xe riêng đông đảo, chúng tôi sắp xếp mọi chuyến hàng từ kho đến nơi nhận của bạn. Đơn hàng đến nơi an toàn và đúng lịch đã thống nhất. | अपने स्वयं के बड़े बेड़े के सहयोग से, हम गोदाम से आपके गंतव्य तक हर शिपमेंट की व्यवस्था करते हैं। ऑर्डर सुरक्षित और तय समय पर पहुँचते हैं। |
| iconStrip.farmers.title | Petani & Pemasok | Farmers & suppliers | 农户与供应商 | Nông dân & nhà cung cấp | किसान और आपूर्तिकर्ता |
| iconStrip.farmers.body | Bekerja sama dengan petani dan pemasok lokal. | Working with local farmers and suppliers. | 与本地农户和供应商合作。 | Hợp tác với nông dân và nhà cung cấp địa phương. | स्थानीय किसानों और आपूर्तिकर्ताओं के साथ काम। |
| iconStrip.grain.title | Komoditi | Commodities | 农产品 | Nông sản | जिंसें |
| iconStrip.grain.body | Kacang-kacangan, umbi, jagung, kopi, dan cengkeh dari Indonesia. | Nuts and legumes, tubers, corn, coffee and cloves from Indonesia. | 来自印度尼西亚的坚果与豆类、块茎、玉米、咖啡和丁香。 | Các loại hạt và đậu, củ, ngô, cà phê và đinh hương từ Indonesia. | इंडोनेशिया से मेवे और दालें, कंद, मक्का, कॉफ़ी और लौंग। |
| iconStrip.globe.title | Pasar | Markets | 市场 | Thị trường | बाज़ार |
| iconStrip.globe.body | Melayani pembeli nasional dan internasional. | Serving national and international buyers. | 服务国内与国际买家。 | Phục vụ người mua trong nước và quốc tế. | राष्ट्रीय और अंतरराष्ट्रीय ख़रीदारों की सेवा। |
| iconStrip.leaf.title | Keberlanjutan | Sustainability | 可持续发展 | Bền vững | स्थिरता |
| iconStrip.leaf.body | Tumbuh bersama petani dan karyawan. | Growing together with farmers and employees. | 与农户和员工共同成长。 | Cùng phát triển với nông dân và người lao động. | किसानों और कर्मचारियों के साथ मिलकर आगे बढ़ना। |
| waTemplates.homeHero | Halo Indoco Jaya Raya, saya menghubungi Anda dari halaman utama website. Saya ingin mengetahui lebih lanjut tentang komoditi Anda. | Hello Indoco Jaya Raya, I'm contacting you from your website's home page. I'd like to learn more about your commodities. | 您好，Indoco Jaya Raya，我从贵公司网站首页联系您，想进一步了解贵公司的农产品。 | Xin chào Indoco Jaya Raya, tôi liên hệ từ trang chủ website của bạn. Tôi muốn tìm hiểu thêm về các mặt hàng nông sản của bạn. | नमस्ते Indoco Jaya Raya, यह संदेश आपकी वेबसाइट के होम पेज से है। मुझे आपकी जिंसों के बारे में और जानकारी चाहिए। |
| waTemplates.homeDrying | Halo Indoco Jaya Raya, saya menghubungi Anda dari bagian Jasa Penjemuran di halaman utama website. Saya ingin mendiskusikan kebutuhan penjemuran komoditi saya. | Hello Indoco Jaya Raya, I'm contacting you from the Drying Service section on your home page. I'd like to discuss my commodity drying needs. | 您好，Indoco Jaya Raya，我从网站首页的晾晒服务栏目联系您，想洽谈我的农产品晾晒需求。 | Xin chào Indoco Jaya Raya, tôi liên hệ từ mục Dịch vụ phơi sấy trên trang chủ website. Tôi muốn trao đổi về nhu cầu phơi sấy nông sản của mình. | नमस्ते Indoco Jaya Raya, यह संदेश आपकी वेबसाइट के होम पेज के 'सुखाने की सेवा' भाग से है। मुझे अपनी जिंस सुखाने की ज़रूरतों पर चर्चा करनी है। |
| waTemplates.homeBanner | Halo Indoco Jaya Raya, saya menghubungi Anda dari tombol WhatsApp di bagian bawah halaman utama website. Saya ingin membicarakan kebutuhan komoditi atau pasokan saya. | Hello Indoco Jaya Raya, I'm contacting you from the WhatsApp button at the bottom of your home page. I'd like to talk about my commodity or supply needs. | 您好，Indoco Jaya Raya，我通过网站首页底部的 WhatsApp 按钮联系您，想洽谈我的农产品或供应需求。 | Xin chào Indoco Jaya Raya, tôi liên hệ qua nút WhatsApp ở cuối trang chủ website. Tôi muốn trao đổi về nhu cầu nông sản hoặc nguồn cung của mình. | नमस्ते Indoco Jaya Raya, यह संदेश आपकी वेबसाइट के होम पेज के नीचे दिए WhatsApp बटन से है। मुझे अपनी जिंस या आपूर्ति ज़रूरतों पर बात करनी है। |
| waTemplates.productCard | Halo Indoco Jaya Raya, saya tertarik dengan {{productName}} yang saya lihat di daftar komoditi website Anda. Mohon informasi lebih lanjut. | Hello Indoco Jaya Raya, I'm interested in {{productName}}, which I saw in the commodity list on your website. Please share more details. | 您好，Indoco Jaya Raya，我在贵公司网站的农产品列表中看到{{productName}}，很感兴趣，请提供更多信息。 | Xin chào Indoco Jaya Raya, tôi quan tâm đến {{productName}} mà tôi thấy trong danh sách nông sản trên website của bạn. Vui lòng cho tôi biết thêm thông tin. | नमस्ते Indoco Jaya Raya, मैंने आपकी वेबसाइट की जिंस सूची में {{productName}} देखा और मुझे इसमें रुचि है। कृपया और जानकारी साझा करें। |
| waTemplates.productPage | Halo Indoco Jaya Raya, saya tertarik dengan {{productName}} yang saya lihat di halaman produk website Anda. Mohon informasi lebih lanjut. | Hello Indoco Jaya Raya, I'm interested in {{productName}}, which I saw on the product page of your website. Please share more details. | 您好，Indoco Jaya Raya，我在贵公司网站的产品页面上看到{{productName}}，很感兴趣，请提供更多信息。 | Xin chào Indoco Jaya Raya, tôi quan tâm đến {{productName}} mà tôi thấy trên trang sản phẩm của website bạn. Vui lòng cho tôi biết thêm thông tin. | नमस्ते Indoco Jaya Raya, मैंने आपकी वेबसाइट के उत्पाद पेज पर {{productName}} देखा और मुझे इसमें रुचि है। कृपया और जानकारी साझा करें। |
| ui.ourServices | Layanan kami | Our services | 我们的服务 | Dịch vụ của chúng tôi | हमारी सेवाएँ |
| ui.askViaWhatsApp | Tanya via WhatsApp | Ask on WhatsApp | 通过 WhatsApp 咨询 | Hỏi qua WhatsApp | WhatsApp पर पूछें |
| ui.navigation | Navigasi | Navigation | 导航 | Điều hướng | नेविगेशन |
| ui.footerCommodities | Komoditi | Commodities | 农产品 | Nông sản | जिंसें |
| ui.email | Email | Email | 电子邮件 | Email | ईमेल |
| ui.phone | Telepon | Phone | 电话 | Điện thoại | फ़ोन |
| ui.chatOnWhatsApp | Chat via WhatsApp | Chat on WhatsApp | 通过 WhatsApp 聊天 | Trò chuyện qua WhatsApp | WhatsApp पर चैट करें |
| ui.bannerLabel | Mari bekerja sama | Let's work together | 携手合作 | Hãy cùng hợp tác | आइए साथ काम करें |
| ui.bannerCta | Hubungi kami via WhatsApp | Contact us on WhatsApp | 通过 WhatsApp 联系我们 | Liên hệ qua WhatsApp | WhatsApp पर संपर्क करें |
| ui.bannerReassure | Pesan Anda langsung masuk ke WhatsApp tim kami. | Your message goes straight to our team's WhatsApp. | 您的消息将直接发送到我们团队的 WhatsApp。 | Tin nhắn của bạn được gửi thẳng đến WhatsApp của đội ngũ chúng tôi. | आपका संदेश सीधे हमारी टीम के WhatsApp पर पहुँचता है। |

## Site strings (194, src/lib/i18n-drafts.ts)

| id | zh | vi | hi |
|---|---|---|---|
| Halo Indoco Jaya Raya, saya ingin mengetahui lebih lanjut tentang perusahaan Anda. | 您好，Indoco Jaya Raya，我想进一步了解贵公司。 | Xin chào Indoco Jaya Raya, tôi muốn tìm hiểu thêm về công ty của bạn. | नमस्ते Indoco Jaya Raya, मुझे आपकी कंपनी के बारे में और जानकारी चाहिए। |
| Halo, saya ingin konsultasi Jasa Penjemuran Komoditi. | 您好，我想咨询农产品晾晒服务。 | Xin chào, tôi muốn được tư vấn về dịch vụ phơi sấy nông sản. | नमस्ते, मुझे जिंस सुखाने की सेवा के बारे में परामर्श चाहिए। |
| Halo Indoco Jaya Raya, saya ingin menghubungi tim Anda. | 您好，Indoco Jaya Raya，我想联系贵团队。 | Xin chào Indoco Jaya Raya, tôi muốn liên hệ với đội ngũ của bạn. | नमस्ते Indoco Jaya Raya, मुझे आपकी टीम से संपर्क करना है। |
| Agribisnis hasil bumi lokal untuk pasar nasional dan internasional. | 本土农产品农业企业，服务国内与国际市场。 | Doanh nghiệp nông sản địa phương cho thị trường trong nước và quốc tế. | राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों के लिए स्थानीय कृषि उपज व्यवसाय। |
| Indonesia — alamat lengkap menyusul dari klien. | 印度尼西亚——完整地址待客户确认。 | Indonesia — địa chỉ đầy đủ đang chờ khách hàng xác nhận. | इंडोनेशिया — पूरा पता ग्राहक की पुष्टि के बाद। |
| Perusahaan | 公司 | Công ty | कंपनी |
| Komoditi | 农产品 | Nông sản | जिंसें |
| Layanan | 服务 | Dịch vụ | सेवाएँ |
| Keberlanjutan | 可持续发展 | Bền vững | स्थिरता |
| Karier | 招聘 | Tuyển dụng | करियर |
| Kontak | 联系我们 | Liên hệ | संपर्क |
| Ajukan pertanyaan | 提交询价 | Gửi yêu cầu | पूछताछ भेजें |
| Jelajahi komoditi | 浏览农产品 | Khám phá nông sản | जिंसें देखें |
| Bermitra dengan kami | 与我们合作 | Hợp tác với chúng tôi | हमारे साथ साझेदारी करें |
| Lihat komoditi | 查看农产品 | Xem nông sản | जिंसें देखें |
| Lihat layanan | 查看服务 | Xem dịch vụ | सेवा देखें |
| Tanya tentang | 咨询 | Hỏi về | पूछताछ: |
| Diskusikan kebutuhan Anda | 洽谈您的需求 | Trao đổi nhu cầu của bạn | अपनी ज़रूरतों पर चर्चा करें |
| Semua | 全部 | Tất cả | सभी |
| Cari komoditi | 搜索农产品 | Tìm nông sản | जिंस खोजें |
| Cari | 搜索 | Tìm | खोजें |
| Tidak ada komoditi yang sesuai. | 没有匹配的农产品。 | Không có nông sản phù hợp. | कोई मेल खाती जिंस नहीं मिली। |
| Spesifikasi | 规格 | Thông số | विनिर्देश |
| Ikhtisar produk | 产品概览 | Tổng quan sản phẩm | उत्पाद अवलोकन |
| Komoditi lain | 其他农产品 | Nông sản khác | अन्य जिंसें |
| Lamar via WhatsApp | 通过 WhatsApp 应聘 | Ứng tuyển qua WhatsApp | WhatsApp से आवेदन करें |
| Halo Indoco Jaya Raya, saya ingin melamar posisi {{position}} ({{location}}). Mohon informasi lebih lanjut. | 您好，Indoco Jaya Raya，我想应聘 {{position}} 职位（{{location}}）。请提供更多信息。 | Xin chào Indoco Jaya Raya, tôi muốn ứng tuyển vị trí {{position}} ({{location}}). Vui lòng cho tôi thêm thông tin. | नमस्ते Indoco Jaya Raya, मैं {{position}} ({{location}}) पद के लिए आवेदन करना चाहता/चाहती हूँ। कृपया अधिक जानकारी दें। |
| Hubungi kami via WhatsApp untuk informasi karier. | 如需了解招聘信息，请通过 WhatsApp 联系我们。 | Liên hệ với chúng tôi qua WhatsApp để biết thông tin tuyển dụng. | करियर की जानकारी के लिए WhatsApp पर हमसे संपर्क करें। |
| Foto | 图片 | Ảnh | फ़ोटो |
| dipotong | 已裁剪 | đã cắt | क्रॉप किया गया |
| Fotografi menyusul | 照片待补 | Hình ảnh sẽ cập nhật | फ़ोटो जल्द |
| Menu | 菜单 | Menu | मेनू |
| Tutup | 关闭 | Đóng | बंद करें |
| Beranda | 首页 | Trang chủ | होम |
| Profil perusahaan | 公司简介 | Hồ sơ công ty | कंपनी प्रोफ़ाइल |
| Cerita kami | 我们的故事 | Câu chuyện của chúng tôi | हमारी कहानी |
| Visi | 愿景 | Tầm nhìn | दृष्टि |
| Misi | 使命 | Sứ mệnh | मिशन |
| Alamat | 地址 | Địa chỉ | पता |
| Kapasitas | 产能 | Công suất | क्षमता |
| Peta menyusul | 地图待补 | Bản đồ sẽ cập nhật | मानचित्र जल्द |
| Posisi terbuka | 在招职位 | Vị trí đang tuyển | खुले पद |
| Lokasi | 地点 | Địa điểm | स्थान |
| Menunggu konfirmasi data. | 数据待确认。 | Đang chờ xác nhận dữ liệu. | डेटा की पुष्टि बाकी है। |
| Lewati ke konten | 跳至内容 | Chuyển đến nội dung | सामग्री पर जाएँ |
| Bahasa | 语言 | Ngôn ngữ | भाषा |
| Komoditi kami | 我们的农产品 | Nông sản của chúng tôi | हमारी जिंसें |
| Mengapa bermitra | 为何与我们合作 | Vì sao hợp tác | साझेदारी क्यों |
| Dari Indonesia | 来自印度尼西亚 | Từ Indonesia | इंडोनेशिया से |
| Layanan komoditi | 农产品服务 | Dịch vụ nông sản | जिंस सेवाएँ |
| Lihat posisi | 查看职位 | Xem vị trí | पद देखें |
| Pertanyaan | 询价 | Yêu cầu | पूछताछ |
| Form unggah CV menyusul | 简历上传表单即将上线 | Biểu mẫu tải CV sẽ cập nhật | सीवी अपलोड फ़ॉर्म जल्द |
| Hubungi tim kami | 联系我们的团队 | Liên hệ đội ngũ của chúng tôi | हमारी टीम से बात करें |
| Hubungi kami | 联系我们 | Liên hệ chúng tôi | हमसे संपर्क करें |
| Nomor menyusul | 号码待补 | Số điện thoại sẽ cập nhật | नंबर जल्द |
| Lihat profil | 查看简介 | Xem hồ sơ | प्रोफ़ाइल देखें |
| Produk | 产品 | Sản phẩm | उत्पाद |
| Telusuri kategori | 按类别浏览 | Duyệt theo danh mục | श्रेणी के अनुसार देखें |
| Komoditi unggulan | 精选农产品 | Nông sản nổi bật | प्रमुख जिंसें |
| Lihat semua komoditi | 查看全部农产品 | Xem tất cả nông sản | सभी जिंसें देखें |
| Semua komoditi | 全部农产品 | Tất cả nông sản | सभी जिंसें |
| Menu perusahaan | 公司菜单 | Menu công ty | कंपनी मेनू |
| Foto unggulan | 精选照片 | Ảnh nổi bật | प्रमुख तस्वीरें |
| {n} dari {total} | 第 {n} 张，共 {total} 张 | {n} trên {total} | {total} में से {n} |
| Jeda tayangan foto | 暂停幻灯片 | Tạm dừng trình chiếu ảnh | स्लाइडशो रोकें |
| Putar tayangan foto | 播放幻灯片 | Phát trình chiếu ảnh | स्लाइडशो चलाएँ |
| Buka menu | 打开菜单 | Mở menu | मेनू खोलें |
| Tutup menu | 关闭菜单 | Đóng menu | मेनू बंद करें |
| Misi kami | 我们的使命 | Sứ mệnh của chúng tôi | हमारा मिशन |
| Sekilas | 概览 | Tổng quan | एक नज़र में |
| Tentang kami | 关于我们 | Về chúng tôi | हमारे बारे में |
| Sebelumnya | 上一个 | Trước | पिछला |
| Berikutnya | 下一个 | Tiếp | अगला |
| Identitas | 公司信息 | Thông tin nhận diện | पहचान |
| Legalitas | 法律资质 | Pháp lý | कानूनी |
| Manajemen | 管理层 | Ban lãnh đạo | प्रबंधन |
| Fasilitas | 设施 | Cơ sở vật chất | सुविधाएँ |
| Sertifikasi | 认证 | Chứng nhận | प्रमाणन |
| Galeri | 图库 | Thư viện ảnh | गैलरी |
| Proses | 流程 | Quy trình | प्रक्रिया |
| Tumbuh bersama kami | 与我们共同成长 | Cùng phát triển với chúng tôi | हमारे साथ आगे बढ़ें |
| Budaya kerja | 工作文化 | Văn hóa làm việc | कार्य संस्कृति |
| Detail kontak | 联系方式 | Thông tin liên hệ | संपर्क विवरण |
| Menyusul | 待补 | Sẽ cập nhật | जल्द |
| Keunggulan | 优势 | Thế mạnh | खूबियाँ |
| Visi & misi | 愿景与使命 | Tầm nhìn & sứ mệnh | दृष्टि और मिशन |
| Selengkapnya | 了解更多 | Tìm hiểu thêm | और जानें |
| Gudang penyimpanan | 仓储仓库 | Kho lưu trữ | भंडारण गोदाम |
| Pengolahan komoditi | 农产品加工 | Chế biến nông sản | जिंस प्रसंस्करण |
| Kacang-kacangan | 坚果与豆类 | Các loại hạt & đậu | मेवे और दालें |
| Umbi | 块茎类 | Củ | कंद |
| Jagung | 玉米 | Ngô | मक्का |
| Kopi | 咖啡 | Cà phê | कॉफ़ी |
| Kacang Mete | 腰果 | Hạt điều | काजू |
| Kacang mete kualitas ekspor. | 出口级腰果。 | Hạt điều chất lượng xuất khẩu. | निर्यात-गुणवत्ता वाले काजू। |
| Komoditi kacang mete untuk mitra B2B. | 面向 B2B 合作伙伴的腰果。 | Hạt điều cho đối tác B2B. | B2B साझेदारों के लिए काजू। |
| Grade | 等级 | Cấp hạng | ग्रेड |
| Premium | 优质 | Cao cấp | प्रीमियम |
| Kemasan | 包装 | Đóng gói | पैकेजिंग |
| Karung / bulk | 麻袋 / 散装 | Bao / hàng rời | बोरी / थोक |
| Asam (Kupas) | 罗望子（去壳） | Me (bóc vỏ) | इमली (छिली हुई) |
| Asam kupas siap olah. | 去壳罗望子，可直接加工。 | Me bóc vỏ sẵn sàng chế biến. | प्रसंस्करण के लिए तैयार छिली इमली। |
| Asam kupas untuk pasar domestik dan ekspor. | 供应国内与出口市场的去壳罗望子。 | Me bóc vỏ cho thị trường nội địa và xuất khẩu. | घरेलू और निर्यात बाज़ारों के लिए छिली इमली। |
| Bentuk | 形态 | Dạng | रूप |
| Kupas | 去壳 | Bóc vỏ | छिली हुई |
| Kacang Tanah | 花生 | Đậu phộng | मूंगफली |
| Kacang tanah lokal. | 本地花生。 | Đậu phộng địa phương. | स्थानीय मूंगफली। |
| Pasokan kacang tanah berkelanjutan. | 可持续的花生供应。 | Nguồn cung đậu phộng bền vững. | मूंगफली की टिकाऊ आपूर्ति। |
| Asal | 产地 | Xuất xứ | मूल |
| Lokal | 本地 | Địa phương | स्थानीय |
| Kacang Hijau | 绿豆 | Đậu xanh | मूंग |
| Kacang hijau berkualitas. | 优质绿豆。 | Đậu xanh chất lượng. | अच्छी गुणवत्ता की मूंग। |
| Kacang hijau untuk industri pangan. | 用于食品工业的绿豆。 | Đậu xanh cho ngành thực phẩm. | खाद्य उद्योग के लिए मूंग। |
| Kualitas | 品质 | Chất lượng | गुणवत्ता |
| Standar | 标准 | Tiêu chuẩn | मानक |
| Ubi Porang | 魔芋 | Củ porang (khoai nưa) | पोरांग कंद |
| Ubi porang untuk industri. | 供工业使用的魔芋。 | Củ porang cho công nghiệp. | उद्योग के लिए पोरांग। |
| Komoditi porang dengan kapasitas suplai fleksibel. | 供应量灵活的魔芋。 | Porang với công suất cung ứng linh hoạt. | लचीली आपूर्ति क्षमता वाला पोरांग। |
| Chips / tepung (opsional) | 片 / 粉（可选） | Lát / bột (tùy chọn) | चिप्स / आटा (वैकल्पिक) |
| Jagung (Kupas) | 玉米（脱粒） | Ngô (tách hạt) | मक्का (दाने) |
| Jagung kupas siap distribusi. | 脱粒玉米，可直接分销。 | Ngô tách hạt sẵn sàng phân phối. | वितरण के लिए तैयार मक्के के दाने। |
| Jagung kupas untuk pakan dan pangan. | 用于饲料和食品的脱粒玉米。 | Ngô tách hạt cho thức ăn chăn nuôi và thực phẩm. | चारे और भोजन के लिए मक्के के दाने। |
| Kopi lokal untuk pasar global. | 面向全球市场的本地咖啡。 | Cà phê địa phương cho thị trường toàn cầu. | वैश्विक बाज़ारों के लिए स्थानीय कॉफ़ी। |
| Kopi hasil bumi lokal. | 本地出产的咖啡。 | Cà phê nông sản địa phương. | स्थानीय उपज की कॉफ़ी। |
| Jenis | 品种 | Loại | प्रकार |
| Sesuai ketersediaan | 视供应情况而定 | Tùy theo nguồn hàng | उपलब्धता के अनुसार |
| Jasa Penjemuran Komoditi | 农产品晾晒服务 | Dịch vụ phơi sấy nông sản | जिंस सुखाने की सेवा |
| Layanan penjemuran komoditi — lihat halaman jasa. | 农产品晾晒服务——请查看服务页面。 | Dịch vụ phơi sấy nông sản — xem trang dịch vụ. | जिंस सुखाने की सेवा — सेवा पेज देखें। |
| Layanan penjemuran untuk menjaga kualitas hasil panen sebelum distribusi. | 晾晒服务，在分销前保持收成品质。 | Dịch vụ phơi sấy giúp giữ chất lượng nông sản trước khi phân phối. | वितरण से पहले फ़सल की गुणवत्ता बनाए रखने के लिए सुखाने की सेवा। |
| Menyesuaikan musim | 随季节调整 | Theo mùa vụ | मौसम के अनुसार |
| Kapasitas dan lokasi fasilitas penjemuran dikelola di CMS — detail menyusul dari klien. | 晾晒产能与设施地点在 CMS 中管理——详情待客户提供。 | Công suất và địa điểm phơi sấy được quản lý trong CMS — chi tiết sẽ do khách hàng cung cấp. | सुखाने की क्षमता और सुविधा का स्थान CMS में प्रबंधित — विवरण ग्राहक से आना बाकी। |
| Terima komoditi | 接收农产品 | Tiếp nhận nông sản | जिंस प्राप्ति |
| Penerimaan dan pemeriksaan awal. | 接收与初检。 | Tiếp nhận và kiểm tra ban đầu. | प्राप्ति और प्रारंभिक जाँच। |
| Proses penjemuran | 晾晒过程 | Quá trình phơi sấy | सुखाने की प्रक्रिया |
| Pengeringan sesuai standar kualitas. | 按质量标准干燥。 | Sấy khô theo tiêu chuẩn chất lượng. | गुणवत्ता मानकों के अनुसार सुखाना। |
| Serah terima | 交付 | Bàn giao | सुपुर्दगी |
| Komoditi siap distribusi. | 农产品可供分销。 | Nông sản sẵn sàng phân phối. | जिंस वितरण के लिए तैयार। |
| Berakar di Indonesia. | 扎根印度尼西亚。 | Bắt rễ tại Indonesia. | इंडोनेशिया में जड़ें। |
| Terhubung ke dunia. | 连接世界。 | Kết nối với thế giới. | दुनिया से जुड़ाव। |
| Komoditi pertanian Indonesia untuk pembeli dan mitra di pasar nasional dan internasional. | 为国内与国际市场的买家和合作伙伴提供印度尼西亚农产品。 | Nông sản Indonesia cho người mua và đối tác tại thị trường trong nước và quốc tế. | राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों के ख़रीदारों और साझेदारों के लिए इंडोनेशियाई कृषि जिंसें। |
| Hasil pertanian lokal, disiapkan untuk pasar global. | 本地农产品，为全球市场而准备。 | Nông sản địa phương, sẵn sàng cho thị trường toàn cầu. | स्थानीय कृषि उपज, वैश्विक बाज़ारों के लिए तैयार। |
| PT Indoco Jaya Raya menyerap dan memperdagangkan hasil pertanian lokal. | PT Indoco Jaya Raya 收购并贸易本地农产品。 | PT Indoco Jaya Raya thu mua và kinh doanh nông sản địa phương. | PT Indoco Jaya Raya स्थानीय कृषि उपज की ख़रीद और व्यापार करती है। |
| Penyerapan lokal | 本地收购 | Thu mua tại địa phương | स्थानीय ख़रीद |
| Penyerapan hasil lokal secara kompetitif. | 以有竞争力的价格收购本地收成。 | Thu mua nông sản địa phương với giá cạnh tranh. | स्थानीय फ़सल की प्रतिस्पर्धी ख़रीद। |
| Fokus kualitas | 注重品质 | Chú trọng chất lượng | गुणवत्ता पर ध्यान |
| Standar pasokan yang konsisten. | 稳定一致的供应标准。 | Tiêu chuẩn cung ứng nhất quán. | एकसमान आपूर्ति मानक। |
| Pasokan andal | 可靠供应 | Nguồn cung đáng tin cậy | भरोसेमंद आपूर्ति |
| Pasokan mengikuti ketersediaan yang terkonfirmasi. | 供应以确认的货源为准。 | Nguồn cung theo lượng hàng đã xác nhận. | आपूर्ति पुष्ट उपलब्धता के अनुसार। |
| Jangkauan global | 全球覆盖 | Phạm vi toàn cầu | वैश्विक पहुँच |
| Mendukung pertumbuhan pasar internasional. | 助力国际市场增长。 | Hỗ trợ tăng trưởng thị trường quốc tế. | अंतरराष्ट्रीय बाज़ार के विकास में सहयोग। |
| Jalur pasok | 供应链路 | Chuỗi cung ứng | आपूर्ति मार्ग |
| Dari pertanian Indonesia ke pembeli internasional. | 从印度尼西亚农业到国际买家。 | Từ nông nghiệp Indonesia đến người mua quốc tế. | इंडोनेशियाई खेती से अंतरराष्ट्रीय ख़रीदारों तक। |
| Indonesia | 印度尼西亚 | Indonesia | इंडोनेशिया |
| Penyerapan | 收购 | Thu mua | ख़रीद |
| Pengolahan | 加工 | Chế biến | प्रसंस्करण |
| Distribusi | 分销 | Phân phối | वितरण |
| Pasar global | 全球市场 | Thị trường toàn cầu | वैश्विक बाज़ार |
| Pertumbuhan yang menjaga petani dan karyawan. | 兼顾农民与员工的增长。 | Tăng trưởng song hành cùng nông dân và người lao động. | ऐसा विकास जो किसानों और कर्मचारियों का ध्यान रखे। |
| Menyerap hasil lokal secara kompetitif, mensejahterakan karyawan dan petani, serta memperkenalkan produk lokal ke pasar yang lebih luas. | 以有竞争力的价格收购本地收成，提升员工与农民的福祉，并将本地产品推向更广阔的市场。 | Thu mua nông sản địa phương với giá cạnh tranh, nâng cao đời sống người lao động và nông dân, đồng thời đưa sản phẩm địa phương đến thị trường rộng lớn hơn. | स्थानीय फ़सल की प्रतिस्पर्धी ख़रीद, कर्मचारियों और किसानों की भलाई, और स्थानीय उत्पादों को बड़े बाज़ारों तक पहुँचाना। |
| Profil dan fasilitas perusahaan. | 公司简介与设施。 | Hồ sơ và cơ sở vật chất của công ty. | कंपनी प्रोफ़ाइल और सुविधाएँ। |
| Identitas hukum, lokasi, dan galeri fasilitas menunggu data yang disetujui untuk publik. | 法律信息、地点和设施图库待获准公开的数据。 | Thông tin pháp lý, địa điểm và thư viện ảnh cơ sở đang chờ dữ liệu được phép công bố. | कानूनी पहचान, स्थान और सुविधा गैलरी सार्वजनिक रूप से स्वीकृत डेटा की प्रतीक्षा में हैं। |
| Bangun masa depan pertanian Indonesia. | 共建印度尼西亚农业的未来。 | Cùng xây dựng tương lai nông nghiệp Indonesia. | इंडोनेशियाई कृषि का भविष्य बनाइए। |
| Bicarakan komoditi atau kebutuhan pasokan Anda. | 洽谈农产品或您的供应需求。 | Trao đổi về nông sản hoặc nhu cầu cung ứng của bạn. | किसी जिंस या अपनी आपूर्ति ज़रूरत पर बात करें। |
| Narasi perusahaan, visi, dan misi. | 公司故事、愿景与使命。 | Câu chuyện, tầm nhìn và sứ mệnh của công ty. | कंपनी की कहानी, दृष्टि और मिशन। |
| PT Indoco Jaya Raya bergerak dalam penyerapan dan perdagangan hasil pertanian lokal. | PT Indoco Jaya Raya 从事本地农产品的收购与贸易。 | PT Indoco Jaya Raya hoạt động trong lĩnh vực thu mua và kinh doanh nông sản địa phương. | PT Indoco Jaya Raya स्थानीय कृषि उपज की ख़रीद और व्यापार के क्षेत्र में काम करती है। |
| Menjadi agrobisnis lokal yang menguasai pasar nasional dan internasional dengan menjaga kualitas dan keberlanjutan. | 成为以品质和可持续发展立足国内与国际市场的本土农业企业。 | Trở thành doanh nghiệp nông nghiệp địa phương dẫn đầu thị trường trong nước và quốc tế, giữ vững chất lượng và tính bền vững. | गुणवत्ता और स्थिरता के साथ राष्ट्रीय और अंतरराष्ट्रीय बाज़ारों में अग्रणी स्थानीय कृषि व्यवसाय बनना। |
| Menyerap hasil lokal secara kompetitif, mensejahterakan karyawan dan petani, serta memperkenalkan produk lokal ke dunia. | 以有竞争力的价格收购本地收成，提升员工与农民的福祉，并将本地产品推向世界。 | Thu mua nông sản địa phương với giá cạnh tranh, nâng cao đời sống người lao động và nông dân, đồng thời đưa sản phẩm địa phương ra thế giới. | स्थानीय फ़सल की प्रतिस्पर्धी ख़रीद, कर्मचारियों और किसानों की भलाई, और स्थानीय उत्पादों को दुनिया तक पहुँचाना। |
| Agribisnis hasil bumi lokal | 本土农产品农业企业 | Doanh nghiệp nông sản địa phương | स्थानीय कृषि उपज व्यवसाय |
| Identitas hukum, struktur, lokasi, dan sertifikasi hanya ditampilkan setelah data disetujui untuk publik. | 法律信息、组织结构、地点与认证仅在数据获准公开后展示。 | Thông tin pháp lý, cơ cấu, địa điểm và chứng nhận chỉ hiển thị sau khi dữ liệu được phép công bố. | कानूनी पहचान, संरचना, स्थान और प्रमाणन डेटा के सार्वजनिक अनुमोदन के बाद ही दिखाए जाते हैं। |
| Identitas hukum | 法律信息 | Thông tin pháp lý | कानूनी पहचान |
| Dokumen hukum | 法律文件 | Hồ sơ pháp lý | कानूनी दस्तावेज़ |
| Organisasi | 组织架构 | Tổ chức | संगठन |
| Komoditi pertanian pilihan dari Indonesia untuk pembeli dan mitra di seluruh dunia. | 精选印度尼西亚农产品，面向全球买家与合作伙伴。 | Nông sản chọn lọc từ Indonesia cho người mua và đối tác trên toàn thế giới. | दुनिया भर के ख़रीदारों और साझेदारों के लिए इंडोनेशिया की चुनिंदा कृषि जिंसें। |
| Posisi yang sedang dibuka. | 当前在招职位。 | Các vị trí đang tuyển. | वर्तमान में खुले पद। |
| Hubungi tim kami melalui WhatsApp untuk inquiry B2B. | B2B 询价请通过 WhatsApp 联系我们的团队。 | Liên hệ đội ngũ của chúng tôi qua WhatsApp cho các yêu cầu B2B. | B2B पूछताछ के लिए WhatsApp पर हमारी टीम से संपर्क करें। |
| Berakar di Indonesia. Terhubung ke dunia. | 扎根印度尼西亚，连接世界。 | Bắt rễ tại Indonesia. Kết nối với thế giới. | इंडोनेशिया में जड़ें। दुनिया से जुड़ाव। |
| Menyerap hasil pertanian lokal secara kompetitif. | 以有竞争力的价格收购本地农产品。 | Thu mua nông sản địa phương với giá cạnh tranh. | स्थानीय कृषि उपज की प्रतिस्पर्धी ख़रीद। |
| Mensejahterakan karyawan dan petani. | 提升员工与农民的福祉。 | Nâng cao đời sống người lao động và nông dân. | कर्मचारियों और किसानों की भलाई। |
| Memperkenalkan produk lokal ke pasar dunia. | 将本地产品推向世界市场。 | Đưa sản phẩm địa phương ra thị trường thế giới. | स्थानीय उत्पादों को विश्व बाज़ार तक पहुँचाना। |
| Petani & Karyawan | 农民与员工 | Nông dân & người lao động | किसान और कर्मचारी |
| Kesejahteraan petani dan karyawan menjadi dasar pertumbuhan kami. | 农民与员工的福祉是我们发展的基础。 | Đời sống của nông dân và người lao động là nền tảng cho sự phát triển của chúng tôi. | किसानों और कर्मचारियों की भलाई हमारे विकास की नींव है। |
| Komoditi pertanian pilihan dari Indonesia untuk pembeli B2B. | 面向 B2B 买家的精选印度尼西亚农产品。 | Nông sản chọn lọc từ Indonesia cho người mua B2B. | B2B ख़रीदारों के लिए इंडोनेशिया की चुनिंदा कृषि जिंसें। |
| Menjaga kualitas dan keberlanjutan di setiap tahap pasokan. | 在供应的每个环节保持品质与可持续性。 | Giữ vững chất lượng và tính bền vững ở mọi khâu cung ứng. | आपूर्ति के हर चरण में गुणवत्ता और स्थिरता बनाए रखना। |
| Tentang Indoco | 关于 Indoco | Về Indoco | Indoco के बारे में |
| PT Indoco Jaya Raya menyerap dan memperdagangkan hasil pertanian lokal untuk mitra di dalam dan luar negeri. | PT Indoco Jaya Raya 为国内外合作伙伴收购并贸易本地农产品。 | PT Indoco Jaya Raya thu mua và kinh doanh nông sản địa phương cho đối tác trong và ngoài nước. | PT Indoco Jaya Raya देश-विदेश के साझेदारों के लिए स्थानीय कृषि उपज की ख़रीद और व्यापार करती है। |
| Jasa Penjemuran | 晾晒服务 | Dịch vụ phơi sấy | सुखाने की सेवा |
| Penjemuran komoditi untuk menjaga kualitas panen. | 农产品晾晒，保持收成品质。 | Phơi sấy nông sản để giữ chất lượng mùa vụ. | फ़सल की गुणवत्ता बनाए रखने के लिए जिंस सुखाना। |
| Hasil bumi Indonesia layak mendapat tempat di pasar dunia. | 印度尼西亚农产品理应在世界市场占有一席之地。 | Nông sản Indonesia xứng đáng có chỗ đứng trên thị trường thế giới. | इंडोनेशियाई उपज विश्व बाज़ार में अपनी जगह की हक़दार है। |
| Kesejahteraan | 福祉 | Phúc lợi | कल्याण |
| Pertumbuhan perusahaan berjalan bersama kesejahteraan karyawan. | 公司发展与员工福祉同步前行。 | Sự phát triển của công ty đi đôi với phúc lợi của người lao động. | कंपनी का विकास कर्मचारियों के कल्याण के साथ चलता है। |
| Setiap peran menjaga standar kualitas komoditi. | 每个岗位都守护农产品的质量标准。 | Mỗi vị trí đều góp phần giữ tiêu chuẩn chất lượng nông sản. | हर भूमिका जिंस के गुणवत्ता मानकों की रक्षा करती है। |
| Pertumbuhan | 成长 | Phát triển | विकास |
| Ikut membawa produk lokal ke pasar yang lebih luas. | 一同将本地产品带向更广阔的市场。 | Cùng đưa sản phẩm địa phương đến thị trường rộng lớn hơn. | स्थानीय उत्पादों को बड़े बाज़ारों तक पहुँचाने में साथ दें। |

## Image alt text (26, src/lib/i18n-drafts.ts)

| id | zh | vi | hi |
|---|---|---|---|
| Kacang tanah dijemur di atas terpal di area penjemuran | 晾晒场上铺在篷布上晾晒的花生 | Đậu phộng phơi trên bạt tại sân phơi | सुखाने के मैदान में तिरपाल पर सूखती मूंगफली |
| Interior gudang dengan tumpukan karung komoditi | 堆满农产品麻袋的仓库内部 | Bên trong kho với những chồng bao nông sản | जिंस की बोरियों के ढेर वाला गोदाम का भीतरी भाग |
| Pekerja bercaping menyortir komoditi di area penjemuran | 戴斗笠的工人在晾晒场分拣农产品 | Công nhân đội nón lá phân loại nông sản tại sân phơi | सुखाने के मैदान में बुनी टोपी पहने कर्मचारी जिंस छाँटते हुए |
| Hamparan kacang tanah yang sedang dijemur | 正在晾晒的一片花生 | Một lớp đậu phộng đang được phơi nắng | धूप में सूखती मूंगफली का फैलाव |
| Tekstur kacang tanah kering dari dekat | 干花生的近景纹理 | Cận cảnh kết cấu đậu phộng khô | सूखी मूंगफली की नज़दीकी बनावट |
| Tim memuat karung komoditi ke truk | 团队将农产品麻袋装上卡车 | Đội ngũ chất bao nông sản lên xe tải | टीम जिंस की बोरियाँ ट्रक में लादती हुई |
| Kacang tanah dijemur di atas terpal | 铺在篷布上晾晒的花生 | Đậu phộng phơi trên bạt | तिरपाल पर सूखती मूंगफली |
| Karung komoditi dimuat ke truk untuk distribusi | 农产品麻袋装车待分销 | Bao nông sản được chất lên xe tải để phân phối | वितरण के लिए ट्रक में लादी जा रही जिंस की बोरियाँ |
| Stok karung komoditi di dalam gudang | 仓库内的农产品麻袋库存 | Hàng bao nông sản tồn trong kho | गोदाम में रखी जिंस की बोरियों का भंडार |
| Lorong gudang beratap tinggi dengan tumpukan karung | 高顶仓库通道两侧堆放着麻袋 | Lối đi trong kho mái cao với những chồng bao | ऊँची छत वाले गोदाम का गलियारा, बोरियों के ढेर के साथ |
| Mesin pengolahan komoditi di fasilitas | 设施内的农产品加工机械 | Máy chế biến nông sản tại cơ sở | सुविधा में जिंस प्रसंस्करण मशीन |
| Pekerja merapikan terpal penjemuran di bawah langit cerah | 工人在晴空下整理晾晒篷布 | Công nhân sắp xếp bạt phơi dưới bầu trời quang đãng | साफ़ आसमान के नीचे सुखाने का तिरपाल ठीक करता कर्मचारी |
| Tangan bersarung menyortir kacang mete | 戴手套的手在分拣腰果 | Đôi tay đeo găng phân loại hạt điều | दस्ताने पहने हाथ काजू छाँटते हुए |
| Petani dan pekerja menyortir hasil panen | 农民和工人在分拣收成 | Nông dân và công nhân phân loại nông sản thu hoạch | किसान और कर्मचारी फ़सल छाँटते हुए |
| Segenggam pipilan jagung | 一把玉米粒 | Một nắm hạt ngô | मुट्ठी भर मक्के के दाने |
| Pekerja di area penjemuran dengan latar bukit hijau | 晾晒场上的工人，背景是青山 | Công nhân tại sân phơi với nền đồi xanh | हरी पहाड़ियों की पृष्ठभूमि में सुखाने के मैदान पर कर्मचारी |
| Segenggam kacang mete gelondong | 一把带壳生腰果 | Một nắm hạt điều thô còn vỏ | मुट्ठी भर कच्चे छिलकेदार काजू |
| Segenggam kacang tanah kering | 一把干花生 | Một nắm đậu phộng khô | मुट्ठी भर सूखी मूंगफली |
| Pipilan jagung di telapak tangan | 掌心里的玉米粒 | Hạt ngô trong lòng bàn tay | हथेली पर मक्के के दाने |
| Pekerja menata terpal di area penjemuran | 工人在晾晒场铺整篷布 | Công nhân trải bạt tại sân phơi | सुखाने के मैदान में तिरपाल बिछाता कर्मचारी |
| Tumpukan karung komoditi | 成堆的农产品麻袋 | Chồng bao nông sản | जिंस की बोरियों का ढेर |
| Karung berisi biji-bijian | 装满谷物的麻袋 | Bao đựng hạt ngũ cốc | अनाज से भरी बोरियाँ |
| Pekerja memanggul karung di gudang | 工人在仓库扛麻袋 | Công nhân vác bao trong kho | गोदाम में बोरी उठाता कर्मचारी |
| Bongkar muat karung dari truk | 从卡车上装卸麻袋 | Bốc dỡ bao từ xe tải | ट्रक से बोरियों की लदाई-उतराई |
| Pekerja menyortir kacang mete di area penjemuran | 工人在晾晒场分拣腰果 | Công nhân phân loại hạt điều tại sân phơi | सुखाने के मैदान में काजू छाँटते कर्मचारी |
| Gudang penyimpanan komoditi | 农产品仓储仓库 | Kho lưu trữ nông sản | जिंस भंडारण गोदाम |

## Revision brief v1 — meta titles & descriptions (DRAFT zh / vi / hi)

Source: `src/lib/seo-copy.ts` (`pageTitles`, `pageDescriptions`, `productDescriptions`). Indonesian and English meta were written carefully from facts already on the site (140–160 character descriptions). **zh / vi / hi titles and descriptions are machine-assisted drafts pending native review** — do not treat as approved. Product metas use current catalogue names; rename follow-ups (Jagung Pipil, Asam Jawa) update copy in a later commit if needed.

Also draft: header CTA label "Minta Penawaran" localizations and any new commodity display names introduced in catalogue cleanup (logged with those commits).


### Catalog renames (revision/brief-v1)

| key | id | en | zh | vi | hi |
|---|---|---|---|---|---|
| jagung-kupas name | Jagung Pipil | Shelled Corn | 玉米粒 | Ngô tách hạt | छिला मक्का |
| asam-kupas name | Asam Jawa | Tamarind | 罗望子 | Me | इमली |
| rempah category | Rempah & Buah Kering | Spices & Dried Fruit | 香料与干果 | Gia vị & trái cây khô | मसाले और सूखे फल |

Slugs unchanged (`jagung-kupas`, `asam-kupas`). Jasa Penjemuran removed from commodity grids/filters; `/services/drying` kept under Layanan.
