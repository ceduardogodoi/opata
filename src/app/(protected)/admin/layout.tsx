import { PropsWithChildren, Suspense } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen space-y-6 bg-slate-100 p-3">
      <Suspense>{children}</Suspense>
    </main>
  );
}
