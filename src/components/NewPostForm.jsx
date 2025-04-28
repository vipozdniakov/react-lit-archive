import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";

export function NewPostForm({
  onAddPost,
  onEditPost,
  editingPost,
  setEditingPost,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("RU");
  const [tags, setTags] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageCredit, setImageCredit] = useState("");
  const [imageSource, setImageSource] = useState("");
  const [toast, setToast] = useState(null);
  const [postType, setPostType] = useState("prose");

  // Pre-fill form when editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setContent(editingPost.content || "");
      setLanguage(editingPost.language || "RU");
      setTags(editingPost.tags?.join(", ") || "");
      setImageCredit(editingPost.imageCredit || "");
      setImageSource(editingPost.imageSource || "");
      setPostType(editingPost.type || "prose");
    }
  }, [editingPost]);

  // Clear form fields
  const clearForm = () => {
    setTitle("");
    setContent("");
    setTags("");
    setLanguage("RU");
    setImageFile(null);
    setImageCredit("");
    setImageSource("");
    setEditingPost(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setToast({
        type: "error",
        text: "Please fill in both the title and the content.",
      });
      return;
    }

    let imageUrl = editingPost?.imageUrl || "";

    try {
      if (imageFile) {
        const processedFile = await processImage(imageFile);
        const storageRef = ref(
          storage,
          `images/${Date.now()}_${processedFile.name}`
        );
        await uploadBytes(storageRef, processedFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const postData = {
        title,
        content,
        language,
        type: postType,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
        imageUrl,
        imageCredit: imageCredit.trim(),
        imageSource: imageSource.trim(),
      };

      if (editingPost) {
        const postRef = doc(db, "posts", editingPost.id);
        await updateDoc(postRef, postData);
        onEditPost({ ...editingPost, ...postData });
      } else {
        const newPost = {
          ...postData,
          createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, "posts"), newPost);
        onAddPost({
          ...newPost,
          id: docRef.id,
          createdAt: { seconds: Date.now() / 1000 },
        });
      }

      clearForm();
    } catch (err) {
      console.error("Error saving post:", err);
      setToast({
        type: "error",
        text: "❌ Failed to save the post. " + err.message,
      });
    }
  };

  const processImage = async (file) => {
    if (file.type !== "image/png") {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              const newFile = new File(
                [blob],
                file.name.replace(/\.png$/, ".jpg"),
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );
              resolve(newFile);
            },
            "image/jpeg",
            0.8
          );
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingPost ? "Edit Post" : "New Post"}
      </h2>

      {/* Title */}
      <input
        className="w-full border rounded p-2 mb-2"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content */}
      <textarea
        className="w-full border rounded p-2 mb-2"
        rows="6"
        placeholder="Content (poetry or prose)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Tags */}
      <input
        className="w-full border rounded p-2 mb-2"
        type="text"
        placeholder="Tags separated by commas (e.g., love, autumn, freedom)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Language */}
      <select
        className="w-full border rounded p-2 mb-2"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="RU">Русский</option>
        <option value="BY">Беларуская</option>
        <option value="PL">Polski</option>
      </select>

      {/* Post Type */}
      <select
        className="w-full border rounded p-2 mb-4"
        value={postType}
        onChange={(e) => setPostType(e.target.value)}
      >
        <option value="prose">Prose</option>
        <option value="poetry">Poetry</option>
      </select>

      {/* Image upload */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Attach an image (optional):
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full"
        />
        {editingPost?.imageUrl && (
          <div className="mt-2">
            <img
              src={editingPost.imageUrl}
              alt="Current"
              className="w-48 rounded-xl border-2 border-white shadow"
            />
          </div>
        )}
      </div>

      {/* Image Credit */}
      <input
        className="w-full border rounded p-2 mb-2"
        type="text"
        placeholder="Image Credit (e.g., Biegun Wschodni)"
        value={imageCredit}
        onChange={(e) => setImageCredit(e.target.value)}
      />

      {/* Image Source URL */}
      <input
        className="w-full border rounded p-2 mb-4"
        type="url"
        placeholder="Image Source URL (e.g., https://unsplash.com/...)"
        value={imageSource}
        onChange={(e) => setImageSource(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-buttonPrimary hover:bg-buttonPrimaryHover text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {editingPost ? "Update" : "Publish"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={clearForm}
            className="text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`mt-4 p-2 rounded text-sm ${
            toast.type === "success"
              ? "text-buttonPrimary bg-blue-50"
              : "text-alertError bg-red-50"
          }`}
        >
          {toast.text}
        </div>
      )}
    </form>
  );
}
