"use client";

import styles from "./CategorySelect.module.css";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className={styles.container}>
      <div className={styles.selectWrapper}>
        <label className={styles.label}>Category</label>
        <div className={styles.selectContainer}>
          <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
            <option value="">Value</option>
            <option value="-">-</option>
          </select>
          <svg className={styles.arrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
