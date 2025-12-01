"use client";

import styles from "./ContentEditor.module.css";

interface ContentEditorProps {
  title: string;
  content: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
}

export default function ContentEditor({ content, onContentChange }: ContentEditorProps) {
  const placeholderText = `テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト`;

  return (
    <div className={styles.editor}>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder={placeholderText}
        className={styles.textarea}
      />
    </div>
  );
}
