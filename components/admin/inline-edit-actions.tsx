"use client";

import { Check, Loader2, X } from "lucide-react";

type InlineEditActionsProps = {
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
  disabled?: boolean;
  saveLabel?: string;
};

export function InlineEditActions({
  onSave,
  onCancel,
  saving = false,
  disabled = false,
  saveLabel = "Kaydet",
}: InlineEditActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onSave}
        disabled={disabled || saving}
        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-wider text-paper hover:bg-bordeaux disabled:opacity-50"
      >
        {saving ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Check className="size-3.5" />
        )}
        {saveLabel}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={saving}
        className="inline-flex items-center gap-1.5 rounded-full border border-bordeaux/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-ink hover:bg-bordeaux/10 disabled:opacity-50"
      >
        <X className="size-3.5" />
        İptal
      </button>
    </div>
  );
}
