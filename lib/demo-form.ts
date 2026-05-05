"use client";

export const DEMO_FORM_EVENT = "open-demo-form";

export function openDemoForm() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(DEMO_FORM_EVENT));
  }
}
