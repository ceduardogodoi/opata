import Link from "next/link";
import { Facebook, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear().toString();

  return (
    <footer className="bg-opata-green text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Media Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold">Siga-nos</h3>
            <div className="flex space-x-4">
              <Link
                title="Ir para Facebook"
                href="https://www.facebook.com/opata.tavorense.79"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-opata-gold transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                title="Ir para Instagram"
                href="https://www.instagram.com/opataongdeprotecaoanimal/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-opata-gold transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold">Contato</h3>
            <div className="space-y-2">
              <Link
                title="Conversar pelo WhatsApp"
                href="https://wa.me/5543999244384"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-opata-gold transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>(43) 99924-4384</span>
              </Link>
              <Link
                title="Entrar em contato via email"
                href="mailto:opatatavorense@gmail.com"
                className="flex items-center gap-2 hover:text-opata-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>opatatavorense@gmail.com</span>
              </Link>
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold">Sobre</h3>
            <p className="text-sm">
              O Opata é uma ONG dedicada ao resgate, tratamento e adoção
              responsável de animais em situação de vulnerabilidade.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm">
          <p>
            &copy; <time dateTime={year}>{year}</time> Opata - Todos os direitos
            reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
