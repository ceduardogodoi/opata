import "reflect-metadata";

// Dependency Injection Container
import "@/app/infra/container";

// Global CSS styles
import "./globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Baloo_2, Quicksand } from "next/font/google";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-baloo2",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Opata | Joaquim Távora",
  description: "Opata - Resgate e Adoção de Animais.",
  metadataBase: new URL("https://opata.org"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={`${baloo2.variable} ${quicksand.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
