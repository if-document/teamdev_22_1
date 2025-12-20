"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./CreatePage.module.css";

const CreatePage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      if (error) setError(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.content || !formData.category_id || !imageFile) {
      setError("本文、カテゴリー、画像は必須です");
      return;
    }

    try {
      const apiFormData = new FormData();
      if (formData.title) apiFormData.append("title", formData.title);
      apiFormData.append("content", formData.content);
      apiFormData.append("category_id", formData.category_id);
      apiFormData.append("image", imageFile);

      const response = await fetch("/api/article", {
        method: "POST",
        body: apiFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "記事の作成に失敗しました");
        return;
      }

      alert("記事を作成しました！");
      router.push("/");
    } catch (err) {
      console.error("Create article error:", err);
      setError("ネットワークエラーが発生しました");
    }
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        {/* ヘッダー */}
        <header className={styles.header}>
          <div className={styles.userNav}>
            <div className={styles.navItem}>
              <button type="button">Create</button>
              <div className={styles.profileAvatar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={styles.userIcon}
                >
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0Z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M3.751 20.105a8.25 8.25 0 0 1 16.498 0h-16.498Z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* メイン */}
        <main className={styles.pageMain}>
          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            {/* Title 入力欄 */}
            <div className={styles.title}>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* 画像アップロード欄 */}
            <div className={styles.uploadArea}>
              <div className={styles.iconWrapper}>
                {/* 矢印アイコン */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.uploadIcon}
                >
                  <path d="M12 19V6" />
                  <path d="m5 12 7-7 7 7" />
                </svg>
                <button type="button" onClick={handleUploadClick}>
                  {imageFile ? imageFile.name : "Upload Image"}
                </button>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  hidden
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* カテゴリー */}
            <div className={styles.category}>
              <label htmlFor="category_id">Category</label>
              <select id="category_id" name="category_id" value={formData.category_id} onChange={handleChange} required>
                <option value="">value</option>
                <option value="1">value1</option>
                <option value="2">value2</option>
                <option value="3">value3</option>
              </select>
            </div>

            {/* 本文 入力欄 */}
            <div className={styles.contentWrapper}>
              <textarea
                id="content"
                name="content"
                aria-label="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

            {/* ボタン */}
            <div className={styles.createButton}>
              <button type="submit">Create</button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default CreatePage;
