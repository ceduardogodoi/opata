import { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
