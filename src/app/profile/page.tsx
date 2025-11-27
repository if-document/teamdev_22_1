"use client";

import { useState } from "react";
import { Button } from "./(components)/button";
import { Card } from "./(components)/card";
import { Dropdown, DropdownMenu, DropdownItem } from "./(components)/dropdown-menu";
import { Pagination } from "./(components)/pagination";
import styles from "./page.module.css";

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for blog posts
  const posts = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: "Post Title",
    category: "Category",
    author: "Author",
    timeAgo: "a min ago",
  }));

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
          {posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              category={post.category}
              author={post.author}
              timeAgo={post.timeAgo}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />
      </main>
    </div>
  );
}
