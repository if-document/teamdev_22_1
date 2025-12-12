import styles from "./styles.module.css";
import Button from "./components/Button"; // ← コンポーネントを作成、インポートしています

export default async function ArticlePage() {
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
            <h1 className={styles.blogTitle}>Blog Title</h1>
            <div className={styles.userIcon}></div>
          </div>

          {/* 仮のテキスト */}
          <div className={styles.imagePlaceholder}>
            <div className={styles.imageX}></div>
          </div>

          <div className={styles.textContent}>
            {/* 1つ目の段落*/}
            <div className={styles.textGroup}>
              <div className={styles.textBar} style={{ width: "90%" }}></div>
              <div className={styles.textBar} style={{ width: "85%" }}></div>
            </div>
            {/* 2つ目の段落*/}
            <div className={styles.textGroup}>
              <div className={styles.textBar} style={{ width: "95%" }}></div>
              <div className={styles.textBar} style={{ width: "88%" }}></div>
              <div className={styles.textBar} style={{ width: "92%" }}></div>
              <div className={styles.textBar} style={{ width: "75%" }}></div>
              <div className={styles.textBar} style={{ width: "80%" }}></div>
            </div>
          </div>
        </div>

        {/* 記事アクションボタン */}
        <div className={styles.actionButtons}>
          <Button>Edit</Button>
          <Button variant="red">Delete</Button>
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
