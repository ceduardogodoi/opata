import { PropsWithChildren, Suspense } from "react";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Main Content */}
      <div className="w-full sm:max-w-7xl sm:mx-auto sm:px-4">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
