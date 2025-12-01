"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Header from "./(components)/Header";
import ImageUpload from "./(components)/ImageUpload";
import CategorySelect from "./(components)/CategorySelect";
import ContentEditor from "./(components)/ContentEditor";
import CreateButton from "./(components)/CreateButton";

export default function EditPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelect = (file: File, preview: string) => {
    setImageFile(file);
    setPreviewUrl(preview);
  };

  const handleCreate = () => {
    console.log("Creating post:", { title, category, content, imageFile });
    // ここで実際の投稿処理を実装
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.content}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={styles.pageTitle}
          />

          <ImageUpload onImageSelect={handleImageSelect} previewUrl={previewUrl} />

          <CategorySelect value={category} onChange={setCategory} />

          <ContentEditor title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} />

          <CreateButton onClick={handleCreate} />
        </div>
      </main>
    </div>
  );
}
