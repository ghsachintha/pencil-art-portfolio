"use client";

import { useState } from "react";
import Link from "next/link";
import RoomPreviewModal from "@/components/RoomPreviewModal";

import { SanityImageSource } from "@sanity/image-url";

interface ProjectSidebarProps {
  title: string;
  description: string;
  creationDate?: string;
  coverImage: SanityImageSource;
}

export default function ProjectSidebar({
  title,
  description,
  creationDate,
  coverImage,
}: ProjectSidebarProps) {
  const [isRoomPreviewOpen, setIsRoomPreviewOpen] = useState(false);

  return (
    <div className="sticky top-10 h-fit space-y-6">
      <div>
        <h1 className="text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          {title}
        </h1>
        {creationDate && (
          <p className="text-lg text-neutral-500 dark:text-neutral-400 font-sans">
            {new Date(creationDate).getFullYear()}
          </p>
        )}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-600 dark:text-neutral-300">
        <p>{description}</p>
      </div>

      <div className="pt-4 space-y-3">
        <Link
          href="/order"
          className="block w-full text-center bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-3 rounded-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          Place Order
        </Link>

        <button
          onClick={() => setIsRoomPreviewOpen(true)}
          className="block w-full text-center border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 px-8 py-3 rounded-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          View on Wall
        </button>
      </div>

      <RoomPreviewModal
        image={coverImage}
        isOpen={isRoomPreviewOpen}
        onClose={() => setIsRoomPreviewOpen(false)}
      />
    </div>
  );
}
