# 📚 Project Notes — [My Literature Archive]

---

## 🌐 Deployment

- Live URL: [https://react-lit-archive.vercel.app](https://react-lit-archive.vercel.app)
- Hosting Provider: Vercel
- GitHub Repository: [https://github.com/vipozdniakov/react-lit-archive](https://github.com/vipozdniakov/react-lit-archive)

---

## 🛠️ Tech Stack

- Frontend: React.js + Vite
- Styling: Tailwind CSS
- Backend: Firebase Firestore, Authentication, Storage
- CI/CD: GitHub + Vercel

---

## 📈 Analytics

- Google Analytics 4 Dashboard: [Link to Analytics](https://analytics.google.com/analytics/web/)
- Property Name: [My Literature Archive]
- Measurement ID: G-P0HKLYBJQ2
- Data Stream URL: [https://react-lit-archive.vercel.app](https://react-lit-archive.vercel.app)

---

## 🔒 Environment Variables

- All environment variables are stored securely in `.env` (not committed to repo).
- Example variables:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_MY_GOOGLE_UID`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`

---

## 📋 Roadmap / Future Ideas

- [ ] Implement separate styling for prose and poetry posts
- [ ] Implement inline editing of posts without switching to a separate form
- [ ] Add multilingual UI (RU / BY / PL interface)
- [ ] Enhance sorting options (tags, dates, popularity)
- [ ] Implement dark mode support
- [ ] Improve accessibility (ARIA attributes, keyboard navigation)
- [ ] Add basic statistics panel for admin (number of posts, views)
- [ ] Advanced sorting of posts by tags and publication dates.
- [ ] Code optimization and components refactoring for better performance.
- [ ] Further strengthening of security measures and server-side validation.
- [ ] Make the admin form for creating a new post appear only after clicking the "New Post" button, instead of showing it by default.
- [ ] Implement separate styling for prose and poetry posts
- [ ] Implement inline editing of posts without switching to a separate form
- [ ] Detect '#series' tag and sort such posts from oldest to newest instead of newest-first
- [ ] Add mini-book view for series:
- [ ] [ ] Clicking a chapter opens a full-screen reading mode
- [ ] [ ] Add left/right swipe to navigate between chapters
- [ ] [ ] Add downward swipe or button to exit book view and return to feed
- [ ] [ ] Reserve upward swipe for future use (e.g., bookmarks or settings)
- [ ] In mini-book mode, show:
- [ ] [ ] Block of chapter thumbnails with titles (highlight current)
- [ ] [ ] Carousel of recommended posts under the chapter list

---

## 🛡️ Security Checklist

- [x] Firebase API keys secured and restricted by domain
- [x] Firebase security rules enforced for Firestore and Storage
- [x] Sensitive environment variables moved to `.env`
- [x] Repository history cleaned from exposed secrets

---

## ✅ Update: Google Authentication Issue Resolved (2025-04-28)

- Firebase Authentication through Google Sign-In is now fully functional in both local development (`localhost:5173`) and production (`https://react-lit-archive.vercel.app`).
- OAuth 2.0 Client settings updated:
  - Authorized JavaScript Origins and Redirect URIs configured for all active domains.
- API Key restrictions updated:
  - Allowed `localhost`, `localhost:5173`, `my-lit-archive.firebaseapp.com`, and `react-lit-archive.vercel.app`.
- Slight warning about `Cross-Origin-Opener-Policy` and occasional `403 Forbidden` in console from `getProjectConfig` API is **non-critical**:
  - Login flow is not affected.
  - No user-visible errors occur.

Project successfully restored and secured after key compromise cleanup.

---

## 🧠 Miscellaneous

- Image optimization on upload: PNG → JPG conversion with compression
- Posts longer than 600 characters have smooth expand/collapse animation
- Responsive layout (mobile/tablet/desktop)
