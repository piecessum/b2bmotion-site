"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, Share2 } from "lucide-react";

interface Story {
  id: number;
  title: string;
  preview: string;
  image: string;
  link: string;
}

const stories: Story[] = [
  {
    id: 1,
    title: "B2B vs интернет-магазин",
    preview: "/stories/Story 1.png",
    image: "/stories/Story 1.png",
    link: "/blog/b2b-platforma",
  },
  {
    id: 2,
    title: "Бот-ассистент",
    preview: "/stories/Story 2.png",
    image: "/stories/Story 2.png",
    link: "/chatbots",
  },
  {
    id: 3,
    title: "Зачем собирать списки?",
    preview: "/stories/Story 3.png",
    image: "/stories/Story 3.png",
    link: "/blog/spiski-tovarov",
  },
];

const STORY_DURATION = 12000; // 12 seconds per story

export function Stories() {
  const searchParams = useSearchParams();
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const didAutoOpen = useRef(false);
  const [progress, setProgress] = useState(0);
  const [viewedStories, setViewedStories] = useState<Set<number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("viewed-stories");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });
  const [paused, setPaused] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [dragY, setDragY] = useState(0);
  const touchStartRef = useRef<number | null>(null);
  const isHoldingRef = useRef(false);
  const wasHoldingRef = useRef(false);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<number>(0);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);

  const markViewed = useCallback((id: number) => {
    setViewedStories((prev) => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem("viewed-stories", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const handleHoldStart = useCallback(() => {
    if (activeStory === null) return;
    // Start hold timer — only activate pause after 200ms
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    holdTimerRef.current = setTimeout(() => {
      isHoldingRef.current = true;
      setIsHolding(true);
      const elapsed = performance.now() - startTimeRef.current;
      pausedAtRef.current = elapsed;
      setPaused(true);
    }, 200);
  }, [activeStory]);

  const handleHoldEnd = useCallback(() => {
    // Cancel hold timer if it hasn't fired yet (quick tap)
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (!isHoldingRef.current) return;
    isHoldingRef.current = false;
    setIsHolding(false);
    wasHoldingRef.current = true;
    setPaused(false);
    setTimeout(() => {
      wasHoldingRef.current = false;
    }, 100);
  }, []);

  const openStory = useCallback(
    (index: number) => {
      setActiveStory(index);
      setProgress(0);
      progressRef.current = 0;
      pausedAtRef.current = 0;
      setPaused(false);
      markViewed(stories[index].id);
    },
    [markViewed],
  );

  const closeStory = useCallback(() => {
    setActiveStory(null);
    setProgress(0);
    setDragY(0);
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  const goNext = useCallback(() => {
    if (wasHoldingRef.current) return;
    if (activeStory === null) return;
    if (activeStory < stories.length - 1) {
      openStory(activeStory + 1);
    } else {
      closeStory();
    }
  }, [activeStory, openStory, closeStory]);

  const goPrev = useCallback(() => {
    if (wasHoldingRef.current) return;
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
    if (activeStory === null || paused) return;

    // Resume from where we paused, or start fresh
    const elapsedBefore = pausedAtRef.current;
    startTimeRef.current = performance.now() - elapsedBefore;

    const animate = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const p = Math.min(elapsed / STORY_DURATION, 1);
      progressRef.current = p;
      setProgress(p);

      if (p >= 1) {
        pausedAtRef.current = 0;
        goNext();
        return;
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [activeStory, paused, goNext]);

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

  // Auto-open story from URL param ?story=1
  useEffect(() => {
    if (didAutoOpen.current) return;
    const storyParam = searchParams.get("story");
    if (storyParam) {
      const idx = stories.findIndex((s) => s.id === Number(storyParam));
      if (idx !== -1) {
        didAutoOpen.current = true;
        openStory(idx);
      }
    }
  }, [searchParams, openStory]);

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
              className={`relative w-[100px] h-[140px] rounded-2xl overflow-hidden ring-[3px] ring-offset-2 ring-offset-[var(--color-page)] transition-all duration-200 group-hover:brightness-110 ${
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
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none"
          style={{
            opacity: dragY > 0 ? Math.max(1 - dragY / 300, 0.3) : 1,
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
          onContextMenu={(e) => e.preventDefault()}
          onClick={closeStory}
          onTouchStart={(e) => {
            touchStartRef.current = e.touches[0].clientY;
            handleHoldStart();
          }}
          onTouchMove={(e) => {
            if (touchStartRef.current === null) return;
            const dy = e.touches[0].clientY - touchStartRef.current;
            if (dy > 0) {
              setDragY(dy);
              handleHoldEnd();
            }
          }}
          onTouchEnd={() => {
            if (dragY > 120) {
              closeStory();
            } else {
              handleHoldEnd();
            }
            setDragY(0);
            touchStartRef.current = null;
          }}
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
            className="absolute top-8 right-2 z-10 p-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Story content */}
          <div
            className="relative w-full h-full max-w-[420px] max-h-[90vh] mx-auto flex flex-col select-none"
            style={{
              transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
              transition: dragY === 0 ? "transform 0.2s ease-out" : "none",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
            onTouchStart={(e) => {
              if (e.touches.length === 1) {
                handleHoldStart();
              }
            }}
            onTouchEnd={() => {
              handleHoldEnd();
            }}
            onTouchCancel={() => {
              handleHoldEnd();
            }}
            onMouseDown={() => {
              handleHoldStart();
            }}
            onMouseUp={() => {
              handleHoldEnd();
            }}
            onMouseLeave={() => {
              handleHoldEnd();
            }}
          >
            {/* Image area */}
            <div
              className="relative flex-1 min-h-0 select-none"
              style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none" }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <Image
                src={stories[activeStory].image}
                alt={stories[activeStory].title}
                fill
                className="object-contain select-none"
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

            {/* Bottom buttons */}
            <div className="flex items-center gap-3 px-4 py-4 z-20">
              <button
                onClick={async () => {
                  // Pause timer while sharing
                  const elapsed = performance.now() - startTimeRef.current;
                  pausedAtRef.current = elapsed;
                  setPaused(true);

                  const url = `${window.location.origin}/blog?story=${stories[activeStory!].id}`;
                  try {
                    if (navigator.share) {
                      await navigator.share({
                        title: stories[activeStory!].title,
                        url,
                      });
                    } else {
                      await navigator.clipboard.writeText(url);
                    }
                  } catch {
                    // User cancelled share dialog
                  }
                  setPaused(false);
                }}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Поделиться"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <Link
                href={stories[activeStory].link}
                className="flex-1 h-12 rounded-full bg-white/10 text-white font-medium text-sm flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                Смотреть подробнее
              </Link>
            </div>
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
