"use client";

import type { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full max-w-md rounded-2xl border-2 border-black bg-white p-6 text-black shadow-xl dark:border-white dark:bg-black dark:text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="modal-title" className="text-lg font-semibold">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            className="border border-black px-2 py-1 text-xs uppercase tracking-[0.25em] dark:border-white"
            onClick={onClose}
            aria-label="Fechar"
          >
            Fechar
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
