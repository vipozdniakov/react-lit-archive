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

- [ ] Add strict vs. loose tag filtering toggle (`every()` vs. `some()`)
- [ ] Display a helpful message when no posts match active tag filters
- [ ] Place filtering mode toggle above the tag cloud, ideally below the search bar
- [ ] Revisit tag structure (language, genre, series, mood) if multi-category filtering is needed
- [ ] Implement inline editing of posts without switching to a separate form
- [ ] Add multilingual UI (RU / BY / PL interface)
- [ ] Enhance sorting options (tags, dates, popularity)
- [ ] Implement dark mode support
- [ ] Improve accessibility (ARIA attributes, keyboard navigation)
- [ ] Add basic statistics panel for admin (number of posts, views)
- [ ] Advanced sorting of posts by tags and publication dates
- [ ] Code optimization and components refactoring for better performance
- [ ] Further strengthening of security measures and server-side validation
- [ ] Detect `#series` tag and sort such posts from oldest to newest
- [ ] Add mini-book view for series:
  - [ ] Full-screen reading mode with chapter swiping
  - [ ] Downward swipe or button to exit
  - [ ] Reserve upward swipe for future use (e.g., bookmarks or settings)
  - [ ] Chapter thumbnails and carousel of recommended posts

---

## ✅ Completed Milestones

### 🔄 2025-05-11 — Interface Enhancements

- Switched all components to named exports for consistency
- Unification of language filter buttons and inline badges across views
- Poetry and prose are now styled distinctly and responsively
- Scroll-to-top button refactored and repositioned within page container
- Refined tag interaction and animation logic
- Removed "Language: XX" label from post cards and added subtle badge beside title

---

## 🛡️ Security Checklist

- [x] Firebase API keys secured and restricted by domain
- [x] Firebase security rules enforced for Firestore and Storage
- [x] Sensitive environment variables moved to `.env`
- [x] Repository history cleaned from exposed secrets

---

## ✅ Update: Google Authentication Issue Resolved (2025-04-28)

- Firebase Authentication through Google Sign-In is now fully functional in both local development and production.
- OAuth and API key restrictions updated and verified.
- Console warnings (`403`, COOP/COEP) are non-critical and do not affect functionality.

---

## 🧠 Miscellaneous

- PNG → JPG conversion with compression for uploaded images
- Posts longer than 600 characters have smooth expand/collapse animation
- Fully responsive layout across all devices
