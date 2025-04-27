# 📜 Changelog / Historia zmian

All notable changes to this project are documented in this file.
Wszystkie istotne zmiany w tym projekcie są dokumentowane w tym pliku.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
Format oparty jest na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

and adheres to [Semantic Versioning](https://semver.org/).  
i zgodny z [Semantic Versioning](https://semver.org/lang/pl/).

---

## [1.1.0] — 2025-04-27

### ✨ Added / Dodano

Transparent and modern header with background blur on scroll; the logo smoothly resizes but remains visible. Includes light animations for a seamless experience.
Przezroczysty i nowoczesny nagłówek z rozmyciem tła podczas przewijania; logo płynnie się zmniejsza, ale pozostaje widoczne. Dodano lekkie animacje dla płynnego efektu.

- Logo hover animation and scroll-to-top functionality on click.
  Animacja przy najechaniu na logo i przewijanie strony do góry po kliknięciu.

- Slight redesign of post cards.
  Drobne zmiany w stylu kart postów.

- Updated tailwind.config.js with a custom theme and unified color palette; improved class usage in App.jsx.
  Aktualizacja tailwind.config.js z własnym motywem i jednolitą paletą kolorów; poprawione użycie klas w App.jsx.

- Admin ability to edit and delete posts without page reload, with beautiful fade-in and fade-out notifications.
  Możliwość edytowania i usuwania postów przez administratora bez przeładowywania strony, z pięknymi powiadomieniami pojawiającymi się i znikającymi.

- Option to attach images to posts with hover animation (desktop view); optional fields for author and source with secure links opening in a new tab.
  Możliwość dodawania obrazów do postów z animacją przy najechaniu (widok na komputerze); opcjonalne pola autora i źródła z bezpiecznymi linkami otwierającymi się w nowej karcie.

- Images are stored in Firebase Storage and automatically converted to optimized .jpg format on upload.
  Obrazy są przechowywane w Firebase Storage i automatycznie konwertowane do zoptymalizowanego formatu .jpg podczas przesyłania.

- Posts longer than 600 characters can now expand/collapse smoothly with a "Read more"/"Hide text" button.
  Posty dłuższe niż 600 znaków można teraz płynnie rozwijać/zamykać za pomocą przycisku "Pokaż więcej"/"Ukryj tekst".

---

## [1.0.0] — 2025-04-19

### ✨ Added / Dodano

- Public page for browsing prose and poetry entries with preserved formatting.
  Publiczna strona do przeglądania wpisów prozy i poezji z zachowaniem formatowania tekstu.

- Full-text search across titles and content.
  Pełnotekstowe wyszukiwanie w tytułach i treści.

- Language filter: RU / BY / PL.
  Filtr językowy: RU / BY / PL.

- Tag cloud for filtering posts by tags.
  Chmura tagów do filtrowania postów.

- Admin-only post creation via Google authentication.
  Możliwość tworzenia postów tylko przez administratora po uwierzytelnieniu Google.

- Admin login page at /vp_poetry.
  Strona logowania administratora pod adresem /vp_poetry.

- Responsive online magazine-style layout using Tailwind CSS and Lora font.
  Responsywny układ w stylu magazynu online z wykorzystaniem Tailwind CSS i czcionki Lora.

- Hosting on Vercel.
  Hosting projektu na Vercel.

### 🎨 Styling / Stylizacja

- Flex-wrap and tag display fixes for post cards.
  Poprawki zawijania i wyświetlania tagów na kartach postów.

- Mobile-first responsive design improvements.
  Ulepszenia responsywności dla urządzeń mobilnych.

### ⚙️ Technologies / Technologie

- React + Vite
- Tailwind CSS
- Firebase Authentication + Firestore
- Git + GitHub
- Vercel Hosting

---

## 📅 Next Plans / Планы на будущее

- ✏️ Admin editing of published posts.
- ✏️ Возможность редактирования опубликованных материалов администратором.

- 📑 Advanced sorting by tags and dates.
- 📑 Расширенная сортировка по тегам и дате.

- 🧹 Code optimization and components refactoring.
- 🧹 Оптимизация кода и рефакторинг компонентов.

- 🛡️ Enhanced security and validation.
- 🛡️ Улучшение безопасности и проверка действий на стороне сервера.

- 🌐 Adding multi-language UI (RU / BY / PL interface texts).
- 🌐 Добавление мультиязычного интерфейса (RU / BY / PL).

---

## ➡️ Notes

Future updates will continue in English and Polish.
Przyszłe aktualizacje będą kontynuowane w języku angielskim i polskim.
