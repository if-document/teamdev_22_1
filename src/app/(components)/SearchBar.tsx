"use client";

import Image from "next/image";
import styles from './SearchBar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder="Search ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button className={styles.iconButton} aria-label="Search">
        <Image
          src="/icons/material-symbols_search.svg"
          alt="search icon"
          width={24}
          height={24}
          className={styles.icon}
        />
      </button>
    </div>
  );
}
