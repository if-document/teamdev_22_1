"use client";

import * as React from "react";
import styles from "./dropdown-menu.module.css";

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dropdown({ trigger, children, open: controlledOpen, onOpenChange, className = "" }: DropdownProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.trigger}>
        {trigger}
      </div>

      {isOpen && <div className={`${styles.dropdownContent} ${className}`}>{children}</div>}
    </div>
  );
}

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenu({ children, className = "" }: DropdownMenuProps) {
  return <div className={`${styles.menu} ${className}`}>{children}</div>;
}

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function DropdownItem({ children, className = "", ...props }: DropdownItemProps) {
  return (
    <button className={`${styles.item} ${className}`} {...props}>
      {children}
    </button>
  );
}
