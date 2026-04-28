"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Home, ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import {
  wikiSections,
  type SectionId,
  type WikiSection,
  type WikiGroup,
  type WikiCategory,
  type WikiArticle,
  sectionUrl,
  categoryUrl,
} from "@/lib/wiki-tree";

interface WikiSidebarProps {
  activeSection?: SectionId;
  activeCategoryId?: string;
  activeArticleSlug?: string;
  className?: string;
  onNavigate?: () => void;
}

type ExpandMap = Record<string, boolean>;

export function WikiSidebar({
  activeSection,
  activeCategoryId,
  activeArticleSlug,
  className,
  onNavigate,
}: WikiSidebarProps) {
  const defaultExpanded = useMemo(() => {
    const sections: ExpandMap = {};
    const groups: ExpandMap = {};
    const categories: ExpandMap = {};
    for (const s of wikiSections) {
      sections[s.id] = activeSection ? s.id === activeSection : true;
      for (const g of s.groups) {
        const groupKey = `${s.id}:${g.id}`;
        const groupContainsActive =
          (activeCategoryId &&
            g.categories.some((c) => c.id === activeCategoryId)) ||
          (activeArticleSlug &&
            g.categories.some((c) =>
              c.articles.some((a) => a.slug === activeArticleSlug),
            ));
        groups[groupKey] = !!groupContainsActive;
        for (const c of g.categories) {
          const catKey = `${s.id}:${g.id}:${c.id}`;
          const catContainsActive =
            (activeCategoryId && c.id === activeCategoryId) ||
            (activeArticleSlug &&
              c.articles.some((a) => a.slug === activeArticleSlug));
          categories[catKey] = !!catContainsActive;
        }
      }
    }
    return { sections, groups, categories };
  }, [activeSection, activeCategoryId, activeArticleSlug]);

  const [openSections, setOpenSections] = useState<ExpandMap>(
    defaultExpanded.sections,
  );
  const [openGroups, setOpenGroups] = useState<ExpandMap>(
    defaultExpanded.groups,
  );
  const [openCategories, setOpenCategories] = useState<ExpandMap>(
    defaultExpanded.categories,
  );

  useEffect(() => {
    setOpenSections(defaultExpanded.sections);
    setOpenGroups(defaultExpanded.groups);
    setOpenCategories(defaultExpanded.categories);
  }, [defaultExpanded]);

  const toggleSection = (id: string) =>
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleGroup = (id: string) =>
    setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleCategory = (id: string) =>
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));

  const expandAll = () => {
    const sections: ExpandMap = {};
    const groups: ExpandMap = {};
    const categories: ExpandMap = {};
    for (const s of wikiSections) {
      sections[s.id] = true;
      for (const g of s.groups) {
        groups[`${s.id}:${g.id}`] = true;
        for (const c of g.categories) {
          categories[`${s.id}:${g.id}:${c.id}`] = true;
        }
      }
    }
    setOpenSections(sections);
    setOpenGroups(groups);
    setOpenCategories(categories);
  };

  const collapseAll = () => {
    setOpenSections({});
    setOpenGroups({});
    setOpenCategories({});
  };

  return (
    <nav
      aria-label="Навигация по базе знаний"
      className={`text-sm ${className ?? ""}`}
    >
      <Link
        href="/wiki"
        onClick={onNavigate}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-2 transition-colors ${
          !activeSection
            ? "bg-overlay-4 text-heading"
            : "text-subtle hover:text-body hover:bg-overlay-3"
        }`}
      >
        <Home className="w-4 h-4 shrink-0" />
        <span className="font-medium">Главная базы знаний</span>
      </Link>

      <div className="flex items-center gap-1 px-1 mb-2">
        <button
          type="button"
          onClick={expandAll}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-dim hover:text-body hover:bg-overlay-3 transition-colors"
          title="Развернуть всё"
        >
          <ChevronsUpDown className="w-3 h-3" />
          Развернуть всё
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-dim hover:text-body hover:bg-overlay-3 transition-colors"
          title="Свернуть всё"
        >
          <ChevronsDownUp className="w-3 h-3" />
          Свернуть всё
        </button>
      </div>

      <ul className="space-y-1">
        {wikiSections.map((section) => (
          <SectionNode
            key={section.id}
            section={section}
            open={!!openSections[section.id]}
            openGroups={openGroups}
            openCategories={openCategories}
            onToggleSection={() => toggleSection(section.id)}
            onToggleGroup={toggleGroup}
            onToggleCategory={toggleCategory}
            activeSection={activeSection}
            activeCategoryId={activeCategoryId}
            activeArticleSlug={activeArticleSlug}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}

function SectionNode({
  section,
  open,
  openGroups,
  openCategories,
  onToggleSection,
  onToggleGroup,
  onToggleCategory,
  activeSection,
  activeCategoryId,
  activeArticleSlug,
  onNavigate,
}: {
  section: WikiSection;
  open: boolean;
  openGroups: ExpandMap;
  openCategories: ExpandMap;
  onToggleSection: () => void;
  onToggleGroup: (id: string) => void;
  onToggleCategory: (id: string) => void;
  activeSection?: SectionId;
  activeCategoryId?: string;
  activeArticleSlug?: string;
  onNavigate?: () => void;
}) {
  const isActive =
    activeSection === section.id && !activeCategoryId && !activeArticleSlug;
  return (
    <li>
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggleSection}
          aria-expanded={open}
          aria-label={open ? "Свернуть раздел" : "Развернуть раздел"}
          className="flex items-center justify-center w-9 shrink-0 rounded-l-lg text-dim hover:text-body hover:bg-overlay-3 transition-colors"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${
              open ? "rotate-0" : "-rotate-90"
            }`}
          />
        </button>
        <Link
          href={sectionUrl(section.id)}
          onClick={onNavigate}
          className={`flex-1 flex items-center justify-between px-2 py-2 min-h-[36px] rounded-r-lg transition-colors ${
            isActive
              ? "bg-overlay-4 text-heading"
              : "text-body hover:bg-overlay-3 hover:text-heading"
          }`}
        >
          <span className="font-medium">{section.shortTitle}</span>
          <span className="text-[11px] text-dim font-medium tabular-nums">
            {section.articleCount}
          </span>
        </Link>
      </div>

      {open && (
        <ul className="mt-1 ml-4 pl-2 border-l border-glass-border space-y-0.5">
          {section.groups.map((group) => {
            const groupKey = `${section.id}:${group.id}`;
            const groupOpen = !!openGroups[groupKey];
            return (
              <GroupNode
                key={groupKey}
                section={section}
                group={group}
                open={groupOpen}
                openCategories={openCategories}
                onToggle={() => onToggleGroup(groupKey)}
                onToggleCategory={onToggleCategory}
                activeCategoryId={activeCategoryId}
                activeArticleSlug={activeArticleSlug}
                onNavigate={onNavigate}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}

function GroupNode({
  section,
  group,
  open,
  openCategories,
  onToggle,
  onToggleCategory,
  activeCategoryId,
  activeArticleSlug,
  onNavigate,
}: {
  section: WikiSection;
  group: WikiGroup;
  open: boolean;
  openCategories: ExpandMap;
  onToggle: () => void;
  onToggleCategory: (id: string) => void;
  activeCategoryId?: string;
  activeArticleSlug?: string;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-2 px-2 py-1.5 min-h-[34px] rounded-md text-left text-subtle hover:text-body hover:bg-overlay-3 transition-colors"
      >
        <ChevronDown
          className={`w-3 h-3 text-dim transition-transform shrink-0 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
        <span className="text-[13px] font-medium flex-1 truncate">
          {group.title}
        </span>
        <span className="text-[10px] text-dim tabular-nums">
          {group.articleCount}
        </span>
      </button>

      {open && (
        <ul className="mt-0.5 ml-4 pl-2 border-l border-glass-border space-y-0.5">
          {(() => {
            // Collapse the intermediate "category" level when a group has a
            // single category whose title matches the group's title — render
            // articles directly under the group instead of an extra layer.
            const onlyCat =
              group.categories.length === 1 ? group.categories[0] : null;
            if (onlyCat && onlyCat.title === group.title) {
              return onlyCat.articles.map((article) => (
                <ArticleNode
                  key={article.id}
                  article={article}
                  isActive={activeArticleSlug === article.slug}
                  onNavigate={onNavigate}
                />
              ));
            }
            return group.categories.map((cat) => {
              const catKey = `${section.id}:${group.id}:${cat.id}`;
              const catOpen = !!openCategories[catKey];
              return (
                <CategoryNode
                  key={cat.id}
                  section={section}
                  category={cat}
                  open={catOpen}
                  onToggle={() => onToggleCategory(catKey)}
                  activeCategoryId={activeCategoryId}
                  activeArticleSlug={activeArticleSlug}
                  onNavigate={onNavigate}
                />
              );
            });
          })()}
        </ul>
      )}
    </li>
  );
}

function CategoryNode({
  section,
  category,
  open,
  onToggle,
  activeCategoryId,
  activeArticleSlug,
  onNavigate,
}: {
  section: WikiSection;
  category: WikiCategory;
  open: boolean;
  onToggle: () => void;
  activeCategoryId?: string;
  activeArticleSlug?: string;
  onNavigate?: () => void;
}) {
  const isActiveCategory =
    activeCategoryId === category.id && !activeArticleSlug;
  const containsActiveArticle =
    !!activeArticleSlug &&
    category.articles.some((a) => a.slug === activeArticleSlug);
  const hasArticles = category.articles.length > 0;

  return (
    <li>
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-label={open ? "Свернуть категорию" : "Развернуть категорию"}
          disabled={!hasArticles}
          className="flex items-center justify-center w-7 shrink-0 rounded-l-md text-dim hover:text-body hover:bg-overlay-3 transition-colors disabled:opacity-30 disabled:cursor-default"
        >
          <ChevronDown
            className={`w-3 h-3 transition-transform ${
              open ? "rotate-0" : "-rotate-90"
            }`}
          />
        </button>
        <Link
          href={categoryUrl(section.id, category.id)}
          onClick={onNavigate}
          className={`flex-1 flex items-center justify-between px-2 py-1.5 min-h-[32px] rounded-r-md text-[12.5px] transition-colors ${
            isActiveCategory || containsActiveArticle
              ? "bg-overlay-4 text-heading"
              : "text-subtle hover:text-body hover:bg-overlay-3"
          }`}
        >
          <span className="truncate">{category.title}</span>
          <span className="text-[10px] text-dim tabular-nums ml-2 shrink-0">
            {category.articles.length}
          </span>
        </Link>
      </div>

      {open && hasArticles && (
        <ul className="mt-0.5 ml-3 pl-2 border-l border-glass-border space-y-0.5">
          {category.articles.map((article) => (
            <ArticleNode
              key={article.id}
              article={article}
              isActive={activeArticleSlug === article.slug}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function ArticleNode({
  article,
  isActive,
  onNavigate,
}: {
  article: WikiArticle;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <li>
      <Link
        href={article.url}
        onClick={onNavigate}
        className={`flex items-center px-2 py-1.5 min-h-[30px] rounded-md text-[12px] leading-snug transition-colors ${
          isActive
            ? "bg-overlay-4 text-heading"
            : "text-dim hover:text-body hover:bg-overlay-3"
        }`}
      >
        <span className="line-clamp-2">{article.title}</span>
      </Link>
    </li>
  );
}
