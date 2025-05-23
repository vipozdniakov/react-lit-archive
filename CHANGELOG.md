# 📜 Changelog / Historia zmian

All notable changes to this project are documented in this file. /
Wszystkie istotne zmiany w tym projekcie są dokumentowane w tym pliku.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) /
Format oparty jest na [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

i adheres to [Semantic Versioning](https://semver.org/). /
i zgodny z [Semantic Versioning](https://semver.org/lang/pl/).

---

## [1.6.0] — 2025-05-11

### ✨ Added / Dodano

- New language badge next to post titles, styled by language color /
  Nowy znacznik języka obok tytułów postów, stylizowany według koloru języka
- Redesigned language filter with inline colored buttons /
  Przeprojektowany filtr językowy z kolorowymi przyciskami w jednej linii
- "Scroll to top" button now aligned with post layout, visible on all scrollable pages /
  Przycisk „W górę” teraz dopasowany do układu postów i widoczny na wszystkich stronach
- Poetry layout improved for readability: narrower width, centered lines /
  Ulepszony układ poezji: węższy blok, wyśrodkowane linie

### 🎨 Refactored / Przebudowano

- Unified export style across components using named exports /
  Ujednolicono styl eksportu komponentów – teraz wszystkie są eksportowane nazwane
- Post layout cleaned up: removed redundant spacing, unified container sizes /
  Uporządkowano układ postów: usunięto zbędne odstępy, ujednolicono kontenery
- Post images now preserve border radius during hover zoom /
  Obrazy w postach zachowują zaokrąglenia podczas powiększenia przy najechaniu
- Language tag removed from post page (now indicated visually instead) /
  Usunięto oznaczenie języka ze strony postu (zastąpiono wizualnym symbolem)

### 🧼 Cleaned / Wyczyśćono

- Removed duplicated `<Footer />` and header spacing issues /
  Usunięto zduplikowany `<Footer />` i poprawiono odstępy w nagłówku
- ScrollToTopButton relocated to avoid overlapping with footer /
  Przycisk przewijania przeniesiony, by nie nachodził na stopkę

---

## [1.5.0] — 2025-05-02

### ✨ Added / Dodano

- Tag cloud now adapts tag size and opacity based on popularity /
  Chmura tagów dostosowuje rozmiar i przezroczystość tagów do ich popularności

- Smooth animation when switching language filters or toggling tags /
  Płynna animacja przy zmianie języka lub przełączaniu tagów

- New × button beside active tags for easy deselection /
  Nowy przycisk × obok aktywnych tagów umożliwiający ich szybkie odznaczenie

### 🎨 Refactored / Przebudowano

- Tags are now rendered using framer-motion for layout transitions /
  Tagi są teraz renderowane z użyciem framer-motion dla płynnych przejść

- Restructured the TagFilter component for future flexibility (e.g. sidebar layout) /
  Przebudowano komponent TagFilter z myślą o przyszłej elastyczności (np. przeniesienie do bocznego panelu)

- Font size and spacing of tags now adapt to context more naturally /
  Rozmiar czcionki i odstępy tagów dostosowują się teraz bardziej naturalnie do kontekstu

## [1.4.0] — 2025-05-01

### ✨ Added / Dodano

- Multiple tag selection and strict filtering using `every()` logic /
  Możliwość wyboru wielu tagów i ich ścisłe filtrowanie z użyciem logiki `every()`
- Active tags are now highlighted in both the filter cloud and post cards /
  Aktywne tagi są teraz wyróżniane zarówno w chmurze filtrów, jak i w kartach postów

### 🧼 Cleaned / Wyczyśćono

- Removed unused `tagColors` imports from components /
  Usunięto nieużywane importy `tagColors` z komponentów

---

## [1.3.0] — 2025-05-01

### ✨ Added / Dodano

- Tags in post cards are now clickable and fully synchronized with the filter. /
  Tagi w kartach postów są teraz klikalne i w pełni zsynchronizowane z filtrem.

- Clicking a tag activates or deactivates it, just like in the tag cloud. /
  Kliknięcie tagu aktywuje lub dezaktywuje go — tak jak w chmurze tagów.

- Visual style of tags is now unified across all components, with clear highlighting of active tags. /
  Styl wizualny tagów został ujednolicony we wszystkich komponentach, z wyraźnym podświetleniem aktywnych tagów.

- Posts are now filtered immediately when clicking a tag inside the post. /
  Posty są teraz filtrowane natychmiast po kliknięciu tagu wewnątrz posta.

### 🎨 Refactored / Przebudowano

- Clean separation of logic: `TagDisplay`, `TagFilter`, and `PostList` now communicate through consistent props. /
  Wyraźne rozdzielenie logiki: `TagDisplay`, `TagFilter` i `PostList` komunikują się teraz za pomocą spójnych właściwości.

- Removed unused props and ensured memoization dependencies are complete. /
  Usunięto nieużywane właściwości i uzupełniono zależności w `useMemo`.

---

🔜 **Coming soon in 1.4.0:** multi-tag selection and advanced filtering UX. /
🔜 **W wersji 1.4.0:** wybór wielu tagów i zaawansowany interfejs filtrowania.

---

## [1.2.0] — 2025-04-30

### ✨ Added / Dodano

Tag frequency-based opacity system per language. / System przezroczystości tagów oparty na ich częstotliwości w obrębie danego języka.

New color scheme for tags using Tailwind’s neutral and accent tones. / Nowa kolorystyka tagów z użyciem neutralnych i akcentujących barw Tailwind.

Highlighted active tag using colored border matching the tag’s language. / Wyróżnianie aktywnego tagu kolorową ramką zgodną z językiem tagu.

Language-aware tag sorting and grouping logic. / Sortowanie i grupowanie tagów zgodnie z językiem.

🎨 Refactored / Przebudowano
Extracted multiple components: Header, Footer, ToastNotifications, TagFilter, LanguageFilter, TagDisplay. / Wydzielono wiele komponentów: Header, Footer, ToastNotifications, TagFilter, LanguageFilter, TagDisplay.

Moved post fetching logic into custom hook usePosts. / Przeniesiono logikę pobierania postów do własnego hooka usePosts.

Created utility functions: filterPosts, getAllTags. / Utworzono funkcje pomocnicze: filterPosts, getAllTags.

Improved tag filter layout and interaction for usability. / Udoskonalono układ i interakcję chmury tagów dla lepszej użyteczności.

---

## [1.1.2] — 2025-04-28

### 🛡️ Security Improvements / Ulepszenia bezpieczeństwa

- Fully cleaned repository history to remove previously exposed API key. / Całkowicie oczyszczono historię repozytorium w celu usunięcia wcześniej ujawnionego klucza API.

- Replaced hardcoded Firebase configuration with secure environment variables (.env). / Zastąpiono zapisane na stałe dane konfiguracyjne Firebase bezpiecznymi zmiennymi środowiskowymi (.env).

- Restricted API key usage by domain and minimum necessary API scopes. / Ograniczono użycie klucza API tylko do wybranych domen i minimalnie wymaganych interfejsów API.

✅ The codebase is now fully secured and ready for public production use. / Kod projektu jest teraz w pełni zabezpieczony i gotowy do publicznego wykorzystania w produkcji.

---

## [1.1.1] — 2025-04-28

### 📝 Updated / Zaktualizowano

- Fixed repository URL in README.md to point to the correct GitHub account. / Naprawiono adres URL repozytorium w README.md, aby wskazywał poprawne konto GitHub.

---

## [1.1.0] — 2025-04-27

### ✨ Added / Dodano

Transparent and modern header with background blur on scroll; the logo smoothly resizes but remains visible. Includes light animations for a seamless experience. /
Przezroczysty i nowoczesny nagłówek z rozmyciem tła podczas przewijania; logo płynnie się zmniejsza, ale pozostaje widoczne. Dodano lekkie animacje dla płynnego efektu.

- Logo hover animation and scroll-to-top functionality on click. /
  Animacja przy najechaniu na logo i przewijanie strony do góry po kliknięciu.

- Slight redesign of post cards. /
  Drobne zmiany w stylu kart postów.

- Updated tailwind.config.js with a custom theme and unified color palette; improved class usage in App.jsx. /
  Aktualizacja tailwind.config.js z własnym motywem i jednolitą paletą kolorów; poprawione użycie klas w App.jsx.

- Admin ability to edit and delete posts without page reload, with beautiful fade-in and fade-out notifications. /
  Możliwość edytowania i usuwania postów przez administratora bez przeładowywania strony, z pięknymi powiadomieniami pojawiającymi się i znikającymi.

- Option to attach images to posts with hover animation (desktop view); optional fields for author and source with secure links opening in a new tab. /
  Możliwość dodawania obrazów do postów z animacją przy najechaniu (widok na komputerze); opcjonalne pola autora i źródła z bezpiecznymi linkami otwierającymi się w nowej karcie.

- Images are stored in Firebase Storage and automatically converted to optimized .jpg format on upload. /
  Obrazy są przechowywane w Firebase Storage i automatycznie konwertowane do zoptymalizowanego formatu .jpg podczas przesyłania.

- Posts longer than 600 characters can now expand/collapse smoothly with a "Read more"/"Hide text" button. /
  Posty dłuższe niż 600 znaków można teraz płynnie rozwijać/zamykać za pomocą przycisku "Pokaż więcej"/"Ukryj tekst".

---

## [1.0.0] — 2025-04-19

### ✨ Added / Dodano

- Public page for browsing prose and poetry entries with preserved formatting. /
  Publiczna strona do przeglądania wpisów prozy i poezji z zachowaniem formatowania tekstu.

- Full-text search across titles and content. /
  Pełnotekstowe wyszukiwanie w tytułach i treści.

- Language filter: RU / BY / PL. /
  Filtr językowy: RU / BY / PL.

- Tag cloud for filtering posts by tags. /
  Chmura tagów do filtrowania postów.

- Admin-only post creation via Google authentication. /
  Możliwość tworzenia postów tylko przez administratora po uwierzytelnieniu Google.

- Admin login page at /vp_poetry. /
  Strona logowania administratora pod adresem /vp_poetry.

- Responsive online magazine-style layout using Tailwind CSS and Lora font. /
  Responsywny układ w stylu magazynu online z wykorzystaniem Tailwind CSS i czcionki Lora.

- Hosting on Vercel. /
  Hosting projektu na Vercel.

### 🎨 Styling / Stylizacja

- Flex-wrap and tag display fixes for post cards. /
  Poprawki zawijania i wyświetlania tagów na kartach postów.

- Mobile-first responsive design improvements. /
  Ulepszenia responsywności dla urządzeń mobilnych.

### ⚙️ Technologies / Technologie

- React + Vite
- Tailwind CSS
- Firebase Authentication + Firestore
- Git + GitHub
- Vercel Hosting

---

## ➡️ Notes / Notatki

Future updates will continue in English and Polish. /
Przyszłe aktualizacje będą kontynuowane w języku angielskim i polskim.
