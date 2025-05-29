import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Opata - Protegendo e Cuidando de Animais",
  description:
    "ONG dedicada ao resgate, cuidado e adoção de animais em situação de vulnerabilidade. Ajude-nos a fazer a diferença!",
  keywords: [
    "abrigo de animais",
    "adoção de pets",
    "ONG animal",
    "resgate de animais",
    "cuidado com animais",
  ],
  authors: [{ name: "Opata" }],
  openGraph: {
    title: "Opata - Organização de Proteção Animal Tavorense",
    description:
      "ONG dedicada ao resgate, cuidado e adoção de animais em situação de vulnerabilidade.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Cachorro e gato juntos demonstrando amizade"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
            Dê um Lar para Quem Precisa
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Transforme vidas através da adoção responsável
          </p>
          <Link
            href="/adopt"
            className="bg-opata-gold text-opata-green px-8 py-3 rounded-full font-semibold hover:bg-opata-gold-hover transition-colors"
          >
            Conheça Nossos Animais
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-opata-beige">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-opata-green font-heading">Sobre Nós</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                A Opata é uma ONG sem fins lucrativos dedicada ao
                resgate, tratamento e adoção responsável de animais em situação
                de vulnerabilidade.
              </p>
              <p className="text-lg mb-6">
                Nossa missão é proporcionar uma vida digna para cada animal que
                passa por nossas mãos, até encontrar um lar amoroso e
                responsável.
              </p>
              <Link
                href="/about"
                className="inline-block bg-opata-green text-white px-6 py-3 rounded-full font-semibold hover:bg-opata-green-hover transition-colors"
              >
                Saiba Mais
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/about-pets.jpg"
                alt="Cachorros e gatos fofos esperando por um lar"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* How to Help Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-opata-green font-heading">Como Ajudar</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-opata-beige p-6 rounded-lg shadow-lg text-center border-2 border-opata-gold">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-4 text-opata-green">Adote</h3>
              <p className="text-gray-700">
                Dê um lar amoroso para um animal que precisa de carinho e
                cuidado.
              </p>
            </div>
            <div className="bg-opata-beige p-6 rounded-lg shadow-lg text-center border-2 border-opata-gold">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-4 text-opata-green">Apadrinhe</h3>
              <p className="text-gray-700">
                Contribua mensalmente para o cuidado de um animal específico.
              </p>
            </div>
            <div className="bg-opata-beige p-6 rounded-lg shadow-lg text-center border-2 border-opata-gold">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-4 text-opata-green">Seja Voluntário</h3>
              <p className="text-gray-700">
                Dedique seu tempo e talento para ajudar nossos animais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-opata-beige">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-opata-green font-heading">Entre em Contato</h2>
          <p className="text-xl mb-8 text-gray-700">
            Estamos sempre abertos para novas parcerias e voluntários.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-opata-green text-white px-8 py-3 rounded-full font-semibold hover:bg-opata-green-hover transition-colors"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </main>
  );
}
