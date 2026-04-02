// <html lang="pt-BR">
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { trackFormSubmit, trackLead } from "@/lib/analytics/events";
import { getSavedUTMs } from "@/lib/utm/utm-helper";
import { useRouter } from "next/navigation";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const utms = getSavedUTMs();

    // Estrutura de payload pronta para Hubspot, RD Station ou Webhook Customizado
    const payload = {
      ...data,
      ...utms,
      origin: window.location.pathname,
    };

    try {
      // TODO: Substituir por fetch para rota de API ou Actions reais
      await new Promise((resolve) => setTimeout(resolve, 1200));
      
      // Tracking unificado
      trackFormSubmit("contact-form");
      trackLead("website_contact", payload);

      // Redirecionamento de Sucesso para Thank You Page (Melhor p/ Ads)
      router.push("/obrigado");
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium leading-none">Nome Completo</label>
        <Input id="name" name="name" required placeholder="Seu nome" disabled={loading} />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium leading-none">E-mail Profissional</label>
        <Input id="email" name="email" type="email" required placeholder="voce@empresa.com" disabled={loading} />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium leading-none">Telefone / WhatsApp</label>
        <Input id="phone" name="phone" type="tel" required placeholder="(00) 00000-0000" disabled={loading} />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium leading-none">Como podemos ajudar?</label>
        <Textarea id="message" name="message" required placeholder="Escreva sua mensagem aqui..." disabled={loading} />
      </div>
      <Button type="submit" className="w-full h-11" disabled={loading}>
        {loading ? "Enviando..." : "Solicitar Contato"}
      </Button>
    </form>
  );
}
