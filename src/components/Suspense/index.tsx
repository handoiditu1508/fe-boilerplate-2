import React from "react";

type SuspenseProps = {
  children: React.ReactNode
}

export default function Suspense({ children }: SuspenseProps) {
  return <React.Suspense fallback="Loading...">{children}</React.Suspense>
}