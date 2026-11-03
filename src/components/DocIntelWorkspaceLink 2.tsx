"use client";

import type { MouseEvent, ReactNode } from "react";

const WORKSPACE_URL = process.env.NEXT_PUBLIC_DOCINTEL_WORKSPACE_URL ||
  "https://docintel.purple8.ai/try";

type Props = {
  children: ReactNode;
  className?: string;
  view?: "playground" | "account" | "connections" | "api" | "billing";
  href?: string;
};

export default function DocIntelWorkspaceLink({ children, className, view, href = WORKSPACE_URL }: Props) {
  const url = new URL(href);
  if (view) url.searchParams.set("view", view);

  function carryTheme(event: MouseEvent<HTMLAnchorElement>) {
    const target = new URL(event.currentTarget.href);
    const theme = document.documentElement.dataset.p8Theme;
    if (theme === "day" || theme === "night") target.searchParams.set("theme", theme);
    event.currentTarget.href = target.href;
  }

  return (
    <a href={url.href} className={className} rel="noreferrer"
      onClick={carryTheme} onAuxClick={carryTheme} onContextMenu={carryTheme}>
      {children}
    </a>
  );
}
