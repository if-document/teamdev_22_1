"use client";

import styles from "./CreateButton.module.css";

interface CreateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function CreateButton({ onClick, disabled = false }: CreateButtonProps) {
  return (
    <div className={styles.container}>
      <button onClick={onClick} disabled={disabled} className={styles.button}>
        Create
      </button>
    </div>
  );
}
