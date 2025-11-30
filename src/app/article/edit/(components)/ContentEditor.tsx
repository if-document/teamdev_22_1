"use client";

import styles from "./ContentEditor.module.css";

interface ContentEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export default function ContentEditor({ content, onContentChange }: ContentEditorProps) {
  return (
    <div className={styles.editor}>
      {/* プレースホルダーライン（本文が空の時のみ表示） */}
      {!content && (
        <div className={styles.placeholderLines}>
          <div className={styles.line} style={{ width: "78%" }}></div>
          <div className={styles.line} style={{ width: "88%" }}></div>
          <div className={styles.lineBreak}></div>
          <div className={styles.line} style={{ width: "100%" }}></div>
          <div className={styles.line} style={{ width: "62%" }}></div>
          <div className={styles.line} style={{ width: "88%" }}></div>
          <div className={styles.line} style={{ width: "100%" }}></div>
          <div className={styles.line} style={{ width: "62%" }}></div>
        </div>
      )}

      {/* 実際の入力エリア */}
      <textarea value={content} onChange={(e) => onContentChange(e.target.value)} className={styles.textarea} />
    </div>
  );
}
