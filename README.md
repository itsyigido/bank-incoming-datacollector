# TR

🏦 bank-incoming-datacollector

bank-incoming-datacollector, bankalardan API (webhook veya polling) aracılığıyla gelen para transferi bildirimlerini karşılayan, doğrulayan, normalize eden ve güvenli şekilde saklayan bir backend servisidir.
Toplanan veriler, başka uygulamalar ve web arayüzleri tarafından kullanılmak üzere hazır halde tutulur.

🚀 Projenin Amacı

Bu proje;

Bankalardan gelen incoming (gelen) para transferlerini

Tekilleştirerek (duplicate önleme)

Standart bir veri formatına dönüştürüp

Veritabanına kaydeden

ve diğer sistemlerin erişimine açan

merkezi bir veri toplama ve yönetim servisi oluşturmayı hedefler.

🧩 Temel Özellikler

✅ Banka API’lerinden veri alma (Webhook / Polling)

✅ Unique transaction ID ile çift kayıt önleme

✅ Transfer verilerini normalize etme

✅ Güvenli ve ölçeklenebilir veri saklama

✅ Dahili REST API ile veri paylaşımı

✅ Web arayüzleri için filtrelenebilir veri altyapısı

✅ Loglama ve hata yönetimi

📥 Toplanan Veri Alanları

Her bir para transferi için aşağıdaki bilgiler saklanır:

Unique ID (UUID)

Banka işlem ID’si

Gönderen ad-soyad

Transfer tutarı

Para birimi

İşlem tarihi

İşlem saati

İşlem durumu

Kayıt zamanı
