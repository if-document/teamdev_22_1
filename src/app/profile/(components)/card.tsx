"use client";

import * as React from "react";
import Image from "next/image";
import styles from "./card.module.css";

interface CardProps {
  title: string;
  category: string;
  author: string;
  timeAgo: string;
  image?: string;
  className?: string;
}

export function Card({ title, category, author, timeAgo, image, className = "" }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`}>
      {/* Image placeholder */}
      <div className={styles.imageContainer}>
        {image ? (
          <Image
            src={image}
            alt={title}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.placeholder}></div>
          // <svg className={styles.placeholder} viewBox="0 0 467 305">
          //   <line x1="0" y1="0" x2="467" y2="305" stroke="black" strokeWidth="1" />
          //   <line x1="467" y1="0" x2="0" y2="305" stroke="black" strokeWidth="1" />
          // </svg>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.author}>{author}</span>
          <span className={styles.timeAgo}>{timeAgo}</span>
        </div>

        {/* Description lines placeholder */}
        <div className={styles.description}>
          <div className={`${styles.descriptionLine} ${styles.descriptionLineFull}`}></div>
          <div className={`${styles.descriptionLine} ${styles.descriptionLinePartial}`}></div>
        </div>
      </div>
    </div>
  );
}
