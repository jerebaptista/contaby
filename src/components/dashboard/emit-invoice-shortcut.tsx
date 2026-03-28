"use client";

import * as React from "react";
import { useRouter } from "@/i18n/navigation";

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return el.closest("[contenteditable='true']") != null;
}

export function EmitInvoiceShortcut() {
  const router = useRouter();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!e.ctrlKey || !e.shiftKey) return;
      if (e.key.toLowerCase() !== "o") return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      router.push("/emit-invoice");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return null;
}
