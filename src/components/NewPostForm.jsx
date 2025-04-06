import React from "react";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";

export function NewPostForm({ onAddPost }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("RU");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const newPost = {
      title,
      language,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      content,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "posts"), newPost);
      onAddPost({ ...newPost, id: Date.now() }); // добавим локально (временно)
    } catch (error) {
      console.error("Ошибка при сохранении в Firestore:", error);
    }

    setTitle("");
    setLanguage("RU");
    setTags("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-2">➕ Добавить новую запись</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border p-2 mb-2"
      />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border p-2 mb-2"
      >
        <option value="RU">Русский</option>
        <option value="BY">Беларуская</option>
        <option value="PL">Polski</option>
      </select>
      <input
        type="text"
        placeholder="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full border p-2 mb-2"
      />
      <textarea
        placeholder="Текст записи"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
        className="w-full border p-2 mb-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Сохранить
      </button>
    </form>
  );
}
