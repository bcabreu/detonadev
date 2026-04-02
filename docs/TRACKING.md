# Tracking & Analytics (Google Tag Manager, Meta Pixel)

O Boilerplate Kepoweb é arquitetado para suportar tráfego pago sem gerar penalizações de Web Vitals.

## Consentimento Nativo (LGPD)
Removemos o wrapper global (Context) e utilizamos um componente visual independente `@/components/ui/consent-banner` o qual não trava Server Components render.
- Estado inicial: `false`
- Armazenamento de decisão: `localStorage`

Tão logo o usuário aceita ou recusa o banner, nós efetuamos um DataLayer Push forçando a atualização das flags de consentimento do Google:
`{ event: "consent_update", ad_storage: "granted", analytics_storage: "granted" }`

É necessário que as Tags no GTM estejam amarradas às regras de Consent Management avançadas do GTM (Ex: "Require ad_storage para eventos do Pixel").

## Persistência de UTMs para Atribuição Limpa do Lead
Toda e qualquer rota carregada com parâmetros de UTM enviam um evento silencioso via component client-side para o `sessionStorage`. 
A vantagem tática dessa base para as landing pages, é que o Lead pode navegar da home para a página de contato, preencher formulário e as UTMs originais anexarão automaticamente ao JSON submetido usando o hook: `getSavedUTMs()`.

## Biblioteca de Chamadas (src/lib/analytics/events.ts)
Não preencha código de GTM duplicado por todo lado. Invoque as wrappers:
- `trackLead('site_origin', { source: window.location.pathname })`
- `trackFormSubmit('contato-topo')`
- `trackSectionView('features-hero')`
