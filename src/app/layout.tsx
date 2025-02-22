import "reflect-metadata";

// Dependency Injection Container
import "@/app/infra/container";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opata | Joaquim Távora",
  description: "Opata - Resgate e Adoção de Animais.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
