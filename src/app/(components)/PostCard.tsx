"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./PostCard.module.css";

type PostCardProps = {
  id: number;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
  excerpt: string;
  onAuthorClick?: (author: string) => void;
};

function formatRelativeTime(isoString: string) {
  const created = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return "just now";

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return diffMin === 1 ? "a min ago" : `${diffMin} mins ago`;
  }

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) {
    return diffHour === 1 ? "an hour ago" : `${diffHour} hours ago`;
  }

  const diffDay = Math.floor(diffHour / 24);
  return diffDay === 1 ? "a day ago" : `${diffDay} days ago`;
}

export function PostCard({ id, title, category, author, createdAt, imageUrl, excerpt, onAuthorClick }: PostCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/article/${id}`} className={styles.cardLink}>
        <div className={styles.thumbnail}>
          {imageUrl && (
            <Image src={imageUrl} alt={title} fill className={styles.image} sizes="(max-width: 768px) 100vw, 30vw" />
          )}
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <button className={styles.categoryButton}>{category}</button>
          </div>

          <div className={styles.meta}>
            <button
              type="button"
              className={styles.author}
              onClick={(e) => {
                e.preventDefault();
                onAuthorClick?.(author);
              }}
            >
              {author}
            </button>
            <span className={styles.date}>{formatRelativeTime(createdAt)}</span>
          </div>

          <p className={styles.excerpt}>{excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
