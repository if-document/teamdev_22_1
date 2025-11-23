"use client";

import { useState, useMemo } from "react";
import styles from "./page.module.css";
import { Header } from "./(components)/Header";
import { PostCard } from "./(components)/PostCard";
import { SearchBar } from "./(components)/SearchBar";
import { Pagination } from "./(components)/Pagination";
import type { Post } from "./(types)/Post";

// とりあえずのモックデータ
const BASE_TIME = new Date("2025-11-23T00:00:00.000Z").getTime();
const allMockPosts: Post[] = Array.from({ length: 90 }, (_, i) => {
  const minutesAgo = i * 5;
  const createdAt = new Date(BASE_TIME - minutesAgo * 60 * 1000).toISOString(); //

  return {
    id: i + 1,
    title: `Post Title ${i + 1}`,
    category: "Category",
    author: i % 2 === 0 ? "Alice" : "Bob",
    createdAt,
    excerpt:
      "サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト",
  };
});

const PAGE_SIZE = 9;

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    const lower = searchValue.toLowerCase();

    return allMockPosts.filter((post) => {
      const matchSearch = lower ? post.title.toLowerCase().includes(lower) : true;
      const matchAuthor = selectedAuthor ? post.author === selectedAuthor : true;

      return matchSearch && matchAuthor;
    });
  }, [searchValue, selectedAuthor]);

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
                <PostCard
                  key={post.id}
                  title={post.title}
                  category={post.category}
                  author={post.author}
                  createdAt={post.createdAt}
                  imageUrl={post.imageUrl}
                  excerpt={post.excerpt}
                  onAuthorClick={handleAuthorClick}
                />
              ))}
            </div>
          </section>

          <Pagination currentPage={currentPage} totalPages={totalPages} onChangePage={handleChangePage} />
        </div>
      </main>
    </>
  );
}
