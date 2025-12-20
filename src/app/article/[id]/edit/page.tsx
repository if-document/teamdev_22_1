"use client";

import { useState, useEffect } from "react"; // ← useEffectを追加
import { useParams, useRouter } from "next/navigation"; // ← 新規追加
import styles from "./page.module.css";
import Header from "./(components)/Header";
import ImageUpload from "./(components)/ImageUpload";
import CategorySelect from "./(components)/CategorySelect";
import ContentEditor from "./(components)/ContentEditor";
import CreateButton from "./(components)/CreateButton";

export default function EditPage() {
  // 新規追加 ---
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;
  // ここから既存 ---
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 新規追加：ローディング状態 ---
  const [loading, setLoading] = useState(true);

  // 新規追加：記事データを取得
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${articleId}`);
        if (!res.ok) throw new Error("記事の取得に失敗しました");

        const data = await res.json();

        // 取得したデータをフォームにセット
        setTitle(data.title);
        setContent(data.content);
        setCategory(String(data.category_id));
        setPreviewUrl(data.image_path); // 既存の画像を表示
      } catch (error) {
        console.error("記事の取得エラー:", error);
        alert("記事の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const handleImageSelect = (file: File, preview: string) => {
    setImageFile(file);
    setPreviewUrl(preview);
  };

  // 新規追加：ローディング中の表示
  const handleUpdate = async () => {
    // ← handleUpdateに名前を変更
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category_id", category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`/api/article/${articleId}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("記事の更新に失敗しました");
      }

      alert("記事を更新しました！");
      router.push(`/article/${articleId}`);
    } catch (error) {
      console.error("更新エラー:", error);
      alert("記事の更新に失敗しました");
    }
  };

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div className={styles.content}>
          {/* ローディング中の表示 */}
          {loading ? (
            <p>読み込み中...</p>
          ) : (
            <>
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
              <CreateButton onClick={handleUpdate} /> {/* ← handleCreateから変更 */}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
