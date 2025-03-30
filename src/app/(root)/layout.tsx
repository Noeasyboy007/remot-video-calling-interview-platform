import React, { ReactNode } from "react";
import StreamClientProvider from "@/components/ui/providers/StreamClientProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return <StreamClientProvider>{children}</StreamClientProvider>;
}
