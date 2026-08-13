"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function BottomSheet({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const sheetRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            key="sheet"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92vh] max-w-5xl flex-col rounded-t-3xl bg-white shadow-2xl"
          >
            <div className="flex shrink-0 justify-end p-4 sm:p-6">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand-dark transition-colors hover:bg-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-16 sm:px-10">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
