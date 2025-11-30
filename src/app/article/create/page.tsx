import styles from "./CreatePage.module.css";

const CreatePage = () => {
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
          {/* Title 入力欄 */}
          <div className={styles.title}>
            <input type="text" id="title" name="title" placeholder="title"></input>
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
              <button type="button">Upload Image</button>
              <input type="file" accept="image/jpeg,image/png" hidden />
            </div>
          </div>

          {/* カテゴリー */}
          <div className={styles.category}>
            <label htmlFor="category_id">Category</label>
            <select id="category_id" name="category_id">
              <option value="">value</option>
              <option value="1">value1</option>
              <option value="2">value2</option>
              <option value="3">value3</option>
            </select>
          </div>

          {/* 本文 入力欄 */}
          <div className={styles.contentWrapper}>
            <textarea id="content" name="content" aria-label="content"></textarea>
          </div>

          {/* ボタン */}
          <div className={styles.createButton}>
            <button type="button">Create</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default CreatePage;
