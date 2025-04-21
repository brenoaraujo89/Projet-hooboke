
import { Mail, Phone } from "lucide-react";

export default function Contato() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4 text-[#6E59A5]">Fale com a Hoobôke</h1>
      <p className="mb-6 text-[#8E9196]">
        Quer conversar sobre funcionalidades, parcerias ou tem uma dúvida? Entre em contato conosco e responderemos o mais breve possível!
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="text-[#9b87f5]" />
          <span>contato@hoobooke.com.br</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="text-[#9b87f5]" />
          <span>+55 (11) 90000-0000</span>
        </div>
      </div>
      <div className="mt-10 text-sm text-[#8E9196]">
        Horário de atendimento: 9h às 18h ‧ Segunda à Sexta-feira
      </div>
    </div>
  );
}
