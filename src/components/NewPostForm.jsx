import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";

export function NewPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("RU");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Введите заголовок и текст публикации.");
      return;
    }

    try {
      const newPost = {
        title,
        content,
        language,
        tags: tags.split(",").map((tag) => tag.trim()),
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      onAddPost({
        ...newPost,
        id: docRef.id,
        createdAt: { seconds: Date.now() / 1000 },
      });

      setMessage("✅ Публикация успешно добавлена.");
      setTitle("");
      setContent("");
      setTags("");
    } catch (err) {
      console.error("Ошибка при добавлении публикации:", err);
      setError("❌ Не удалось добавить публикацию. " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Новая публикация</h2>

      <input
        className="w-full border rounded p-2 mb-2"
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border rounded p-2 mb-2"
        rows="6"
        placeholder="Текст (поэзия или проза)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="w-full border rounded p-2 mb-2"
        type="text"
        placeholder="Теги через запятую (например: любовь,осень,свобода)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <select
        className="w-full border rounded p-2 mb-4"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="RU">Русский</option>
        <option value="BY">Беларуская</option>
        <option value="PL">Polski</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Добавить
      </button>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </form>
  );
}
