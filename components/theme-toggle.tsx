'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center w-9 h-9 rounded-xl bg-overlay-4 border border-glass-border hover:bg-overlay-6 transition-colors duration-300"
      aria-label="Переключить тему"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-subtle" />
      ) : (
        <Moon className="w-4 h-4 text-subtle" />
      )}
    </button>
  )
}
