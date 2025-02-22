import { PropsWithChildren, Suspense } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return <Suspense>{children}</Suspense>;
}
