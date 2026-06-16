"use client";

import { openPreferences } from "../lib/consent";

export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => openPreferences()}
      style={{
        background: "none",
        border: "none",
        color: "inherit",
        font: "inherit",
        textAlign: "left",
        cursor: "pointer",
        padding: 0,
      }}
    >
      Cookie settings
    </button>
  );
}
