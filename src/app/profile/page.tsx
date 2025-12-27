"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "./(components)/button";
import { Card } from "./(components)/card";
import { Dropdown, DropdownMenu, DropdownItem } from "./(components)/dropdown-menu";
import { Pagination } from "./(components)/pagination";
import styles from "./page.module.css";

type DbPost = {
  id: number;
  user_id: string;
  category_id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  users?: {
    name: string;
  };
};

type Post = {
  id: number;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  imageUrl?: string;
};

const FIXED_USER_ID = "fc6b7e74-3257-459a-8862-8d5800c6ad22";
const PAGE_SIZE = 6;

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

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/article");
        if (!res.ok) throw new Error("記事データの取得に失敗しました");
        const data = await res.json();

        // Filter posts by fixed user ID
        const userPosts = data
          .filter((p: DbPost) => p.user_id === FIXED_USER_ID)
          .map((p: DbPost) => ({
            id: p.id,
            title: p.title || "Untitled",
            category: String(p.category_id),
            author: p.users?.name || "Unknown",
            createdAt: p.created_at,
            imageUrl: p.image_path,
          }));

        setPosts(userPosts);
      } catch (error) {
        console.error("記事データの取得に失敗しました：", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  const pagedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(start, start + PAGE_SIZE);
  }, [posts, currentPage]);

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        {/* Create Button */}
        <Button onClick={() => console.log("Create new post")}>Create</Button>

        {/* User Dropdown */}
        <Dropdown
          trigger={
            <div className={styles.userAvatar}>
              <svg className={styles.userIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          }
        >
          <DropdownMenu className="min-w-[250px]">
            <div className={styles.userName}>User name</div>
            <DropdownItem onClick={() => console.log("Logging out...")}>
              <div className={styles.logoutButton}>Logout</div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Page Title */}
        <h1 className={styles.pageTitle}>Your Post</h1>

        {/* Blog Cards Grid */}
        <div className={styles.grid}>
          {pagedPosts.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              title={post.title}
              category={post.category}
              author={post.author}
              timeAgo={formatRelativeTime(post.createdAt)}
              image={post.imageUrl}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </main>
    </div>
  );
}
