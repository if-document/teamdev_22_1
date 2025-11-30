"use client";

import { useRef, useState, ChangeEvent, DragEvent } from "react";
import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void;
  previewUrl: string | null;
}

export default function ImageUpload({ onImageSelect, previewUrl }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`${styles.uploadArea} ${isDragging ? styles.dragging : ""} ${previewUrl ? styles.hasImage : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={previewUrl ? undefined : handleClick}
    >
      {previewUrl ? (
        <div className={styles.preview}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="Preview" className={styles.previewImage} />
          <div className={styles.overlay} onClick={handleClick}>
            <button className={styles.changeBtn}>画像を変更</button>
          </div>
        </div>
      ) : (
        <div className={styles.uploadPrompt}>
          <div className={styles.uploadIcon}>
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 19V5M12 5L5 12M12 5L19 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <button className={styles.uploadBtn}>Upload Image</button>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className={styles.fileInput} />
    </div>
  );
}
