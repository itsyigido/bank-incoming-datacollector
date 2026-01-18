# EN | ⚠️ THIS PROJECT IS OUTDATED IT MAY NOT WORK

🏦 bank-incoming-datacollector

bank-incoming-datacollector is a backend service that receives, validates, normalizes, and securely stores incoming bank transfer notifications via bank APIs (webhook or polling).
The collected data is kept ready for use by other applications and web interfaces.

🚀 Project Purpose

This project aims to build a centralized data collection and management service that:

Collects incoming bank transfer transactions

Deduplicates transactions to prevent duplicate records

Converts data into a standardized format

Persists transfer data into a database

Exposes the data for access by other systems

🧩 Core Features

✅ Receive data from bank APIs (Webhook / Polling)

✅ Prevent duplicate records using unique transaction IDs

✅ Normalize incoming transfer data

✅ Secure and scalable data storage

✅ Share data through an internal REST API

✅ Filterable data infrastructure for web interfaces

✅ Logging and error handling

📥 Collected Data Fields

For each bank transfer, the following information is stored:

Unique ID (UUID)

Bank transaction ID

Sender full name

Transfer amount

Currency

Transaction date

Transaction time

Transaction status

Record creation time


# TR | ⚠️ BU PROJE GÜNCEL DEĞİLDİR VE ÇALIŞMAYABİLİR

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
