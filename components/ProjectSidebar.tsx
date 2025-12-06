"use client";

import { useState } from "react";
import Link from "next/link";
import RoomPreviewModal from "@/components/RoomPreviewModal";
import { GlassButton } from "./GlassButton";
import { GlassContainer } from "./GlassContainer";

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
    <GlassContainer
      intensity="thin"
      className="sticky top-24 h-fit p-8 space-y-8"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-main mb-3">
          {title}
        </h1>
        {creationDate && (
          <p className="text-lg text-text-muted font-sans font-medium tracking-wide">
            {new Date(creationDate).getFullYear()} • Pencil on Paper
          </p>
        )}
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-text-muted leading-relaxed">
        <p>{description}</p>
      </div>

      <div className="pt-4 space-y-4">
        <Link href="/order" className="block w-full">
          <GlassButton size="lg" fullWidth className="rounded-xl">
            Place Order
          </GlassButton>
        </Link>

        <GlassButton
          variant="secondary"
          size="lg"
          fullWidth
          onClick={() => setIsRoomPreviewOpen(true)}
          className="rounded-xl flex items-center justify-center gap-2"
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
        </GlassButton>
      </div>

      <RoomPreviewModal
        image={coverImage}
        isOpen={isRoomPreviewOpen}
        onClose={() => setIsRoomPreviewOpen(false)}
      />
    </GlassContainer>
  );
}
