"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type NotificationProps = {
  message: string;
  variant?: "error" | "success";
};

const styles = {
  error:
    "border-red-600 bg-red-50 text-red-700 dark:border-red-400 dark:bg-red-950 dark:text-red-200",
  success:
    "border-green-600 bg-green-50 text-green-700 dark:border-green-400 dark:bg-green-950 dark:text-green-200",
};

export default function Notification({
  message,
  variant = "error",
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  if (!isVisible) {
    router.replace(pathname);
    return null;
  }

  return (
    <div
      className={`flex items-start justify-between gap-3 rounded-md border px-3 py-2 text-sm ${
        styles[variant]
      }`}
      role="status"
    >
      <span>{message}</span>
      <button
        type="button"
        className="rounded-sm border border-current/30 px-2 py-1 text-xs uppercase tracking-[0.2em] transition hover:opacity-80"
        onClick={() => setIsVisible(false)}
        aria-label="Fechar"
      >
        Fechar
      </button>
    </div>
  );
}
