"use client";

import { useState, useMemo, useEffect } from "react";
import styles from "./page.module.css";
import { Header } from "./(components)/Header";
import { PostCard } from "./(components)/PostCard";
import { SearchBar } from "./(components)/SearchBar";
import { Pagination } from "./(components)/Pagination";
import type { Post, DbPost } from "./(types)/Post";
import Link from "next/link";

const PAGE_SIZE = 9;

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/article");
        if (!res.ok) throw new Error("記事データの取得に失敗しました");
        const data = await res.json();

        const formatted = data.map((p: DbPost) => {
          return {
            id: p.id,
            title: p.title,
            category: String(p.category_id),
            author: p.users?.name || "Unknown",
            createdAt: p.created_at,
            imageUrl: p.image_path,
            excerpt: p.content,
          };
        });
        setPosts(formatted);
      } catch (error) {
        console.error("記事データの取得に失敗しました：", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const lower = searchValue.toLowerCase();

    return posts.filter((post) => {
      const matchSearch = lower ? post.title.toLowerCase().includes(lower) : true;
      const matchAuthor = selectedAuthor ? post.author === selectedAuthor : true;

      return matchSearch && matchAuthor;
    });
  }, [posts, searchValue, selectedAuthor]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));

  const pagedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, currentPage]);

  const handleChangePage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleAuthorClick = (author: string) => {
    setSelectedAuthor(author);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <SearchBar
            value={searchValue}
            onChange={(v) => {
              setSearchValue(v);
              setCurrentPage(1);
            }}
          />

          <section aria-label="posts list">
            <div className={styles.grid}>
              {pagedPosts.map((post) => (
                <Link key={post.id} href={`/article/${post.id}`}>
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    category={post.category}
                    author={post.author}
                    createdAt={post.createdAt}
                    imageUrl={post.imageUrl}
                    excerpt={post.excerpt}
                    onAuthorClick={handleAuthorClick}
                  />
                </Link>
              ))}
            </div>
          </section>

          <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage} />
        </div>
      </main>
    </>
  );
}
