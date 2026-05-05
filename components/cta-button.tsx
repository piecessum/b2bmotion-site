"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { openDemoForm } from "@/lib/demo-form";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function CtaButton({ children, onClick, type = "button", ...rest }: Props) {
  return (
    <button
      type={type}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) openDemoForm();
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
