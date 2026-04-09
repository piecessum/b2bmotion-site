"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Story {
  id: number;
  title: string;
  preview: string;
  image: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "B2B vs интернет-магазин",
    preview: "/stories/Story 1.png",
    image: "/stories/Story 1.png",
  },
  {
    id: 2,
    title: "Бот-ассистент",
    preview: "/stories/Story 2.png",
    image: "/stories/Story 2.png",
  },
  {
    id: 3,
    title: "Зачем собирать списки?",
    preview: "/stories/Story 3.png",
    image: "/stories/Story 3.png",
  },
];

const STORY_DURATION = 12000; // 12 seconds per story

export function Stories() {
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [viewedStories, setViewedStories] = useState<Set<number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("viewed-stories");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const progressRef = useRef<number>(0);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const markViewed = useCallback(
    (id: number) => {
      setViewedStories((prev) => {
        const next = new Set(prev);
        next.add(id);
        localStorage.setItem("viewed-stories", JSON.stringify([...next]));
        return next;
      });
    },
    []
  );

  const openStory = useCallback(
    (index: number) => {
      setActiveStory(index);
      setProgress(0);
      progressRef.current = 0;
      markViewed(stories[index].id);
    },
    [markViewed]
  );

  const closeStory = useCallback(() => {
    setActiveStory(null);
    setProgress(0);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const goNext = useCallback(() => {
    if (activeStory === null) return;
    if (activeStory < stories.length - 1) {
      openStory(activeStory + 1);
    } else {
      closeStory();
    }
  }, [activeStory, openStory, closeStory]);

  const goPrev = useCallback(() => {
    if (activeStory === null) return;
    if (activeStory > 0) {
      openStory(activeStory - 1);
    } else {
      setProgress(0);
      progressRef.current = 0;
      startTimeRef.current = performance.now();
    }
  }, [activeStory, openStory]);

  // Progress animation
  useEffect(() => {
    if (activeStory === null) return;

    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / STORY_DURATION, 1);
      progressRef.current = p;
      setProgress(p);

      if (p >= 1) {
        goNext();
        return;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeStory, goNext]);

  // Keyboard navigation
  useEffect(() => {
    if (activeStory === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeStory, closeStory, goNext, goPrev]);

  // Lock body scroll when story is open
  useEffect(() => {
    if (activeStory !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeStory]);

  return (
    <>
      {/* Story Previews */}
      <div className="flex items-start gap-4 overflow-x-auto p-2 -m-2 scrollbar-hide mb-10">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => openStory(index)}
            className="flex-shrink-0 group cursor-pointer flex flex-col items-center"
          >
            <div
              className={`relative w-[100px] h-[140px] rounded-2xl overflow-hidden ring-[3px] ring-offset-2 ring-offset-[var(--color-page)] transition-all duration-200 group-hover:scale-105 ${
                viewedStories.has(story.id)
                  ? "ring-[var(--color-border)]"
                  : "ring-[#8B5CF6]"
              }`}
            >
              <Image
                src={story.preview}
                alt={story.title}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <p className="mt-2 text-xs text-subtle text-center w-[100px] line-clamp-2 leading-tight h-[32px]">
              {story.title}
            </p>
          </button>
        ))}
      </div>

      {/* Fullscreen Story Viewer */}
      {activeStory !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeStory}
        >
          {/* Progress bars */}
          <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-10">
            {stories.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[3px] rounded-full bg-white/20 overflow-hidden"
              >
                <div
                  className="h-full bg-white rounded-full transition-none"
                  style={{
                    width:
                      i < activeStory
                        ? "100%"
                        : i === activeStory
                          ? `${progress * 100}%`
                          : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={closeStory}
            className="absolute top-10 right-4 z-10 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Story image */}
          <div
            className="relative w-full h-full max-w-[420px] max-h-[90vh] mx-auto flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={stories[activeStory].image}
              alt={stories[activeStory].title}
              fill
              className="object-contain"
              sizes="420px"
              priority
            />

            {/* Tap zones */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-0 w-1/3 h-full z-10"
              aria-label="Previous story"
            />
            <button
              onClick={goNext}
              className="absolute right-0 top-0 w-2/3 h-full z-10"
              aria-label="Next story"
            />
          </div>

          {/* Desktop navigation arrows */}
          {activeStory > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {activeStory < stories.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
