"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import Button from "./components/Button";

type Article = {
  id: number;
  title: string;
  content: string;
  image_path: string;
  category_id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // 記事データを取得
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/article/${articleId}`);
        if (!res.ok) throw new Error("記事の取得に失敗しました");

        const data = await res.json();
        setArticle(data);
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

  // 削除処理
  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      const res = await fetch(`/api/article/${articleId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("削除に失敗しました");

      alert("記事を削除しました");
      router.push("/");
    } catch (error) {
      console.error("削除エラー:", error);
      alert("記事の削除に失敗しました");
    }
  };

  if (loading) return <p>読み込み中...</p>;
  if (!article) return <p>記事が見つかりません</p>;

  return (
    <div className={styles.container}>
      {/* ヘッダーの Login と SignUp ボタン */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.buttonGroup}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.signUpButton}>Sign Up</button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ（ブログ記事部分） */}
      <main className={styles.main}>
        <div className={styles.contentCard}>
          {/* Blog Title と User Icon */}
          <div className={styles.titleSection}>
            <h1 className={styles.blogTitle}>{article.title}</h1>
            <div className={styles.userIcon}></div>
          </div>

          {/* 記事画像 */}
          <div className={styles.imagePlaceholder}>
            {article.image_path && article.image_path !== "{}" && (
              <Image src={article.image_path} alt={article.title} fill className={styles.image} />
            )}
          </div>

          <div className={styles.textContent}>
            <p>{article.content}</p>
          </div>
        </div>

        {/* 記事アクションボタン */}
        <div className={styles.actionButtons}>
          <Button>Edit</Button>
          <Button variant="red" onClick={handleDelete}>
            Delete
          </Button>
        </div>

        {/*コメントセクション(記事下部のコメント欄)  */}
        <div className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>Comments</h2>

          {/* テキスト入力欄 */}
          <div className={styles.commentInputArea}>
            <input type="text" placeholder="Your Comment..." className={styles.commentInput} />
            <button className={styles.commentButton}>Comment</button>
          </div>

          {/* コメントリスト */}
          <div className={styles.commentsList}>
            {/* コメント1 */}
            <div className={styles.commentItem}>
              <div className={styles.commentLeft}>
                <div className={styles.commentUserIcon}></div>
                <p className={styles.commentUsername}>user</p>
                <p className={styles.commentTimestamp}>a min ago</p>
              </div>
              <div className={styles.commentRight}>
                <div className={styles.commentTextPlaceholder}>
                  <div className={styles.commentTextBar} style={{ width: "100%" }}></div>
                  <div className={styles.commentTextBar} style={{ width: "95%" }}></div>
                  <div className={styles.commentTextBar} style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>

            {/* コメント2 */}
            <div className={styles.commentItem}>
              <div className={styles.commentLeft}>
                <div className={styles.commentUserIcon}></div>
                <p className={styles.commentUsername}>user</p>
                <p className={styles.commentTimestamp}>a min ago</p>
              </div>
              <div className={styles.commentRight}>
                <div className={styles.commentTextPlaceholder}>
                  <div className={styles.commentTextBar} style={{ width: "100%" }}></div>
                  <div className={styles.commentTextBar} style={{ width: "95%" }}></div>
                  <div className={styles.commentTextBar} style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
