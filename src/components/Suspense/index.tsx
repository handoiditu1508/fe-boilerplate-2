import React from "react";

interface SuspenseProps {
  children: React.ReactNode[] | React.ReactNode
}

export default function Suspense({ children }: SuspenseProps) {
  return <React.Suspense fallback="Loading...">{children}</React.Suspense>
}