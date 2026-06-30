export interface LabStage {
  id: number;
  title: string;
  description: string;
  tools: string[];
  status: 'documentado' | 'em-andamento' | 'planejado';
  articleSlug?: string;
}

export const labStages: LabStage[] = [
  {
    id: 1,
    title: 'Acesso remoto via SSH',
    description:
      'Configuração de acesso remoto entre MacBook e Ubuntu via OpenSSH. Conceitos de IP, portas, serviço SSH e diagnóstico de conectividade.',
    tools: ['OpenSSH', 'Terminal', 'Ubuntu 24.04'],
    status: 'documentado',
    articleSlug: 'configurando-acesso-ssh-entre-macbook-e-ubuntu',
  },
  {
    id: 2,
    title: 'Firewall com UFW',
    description:
      'Configuração e entendimento do firewall UFW no Ubuntu. Regras de entrada e saída, liberação de portas e boas práticas de controle de acesso.',
    tools: ['UFW', 'iptables', 'Ubuntu 24.04'],
    status: 'documentado',
    articleSlug: 'entendendo-ip-portas-e-firewall-com-ubuntu-e-ufw',
  },
  {
    id: 3,
    title: 'Logs de autenticação',
    description:
      'Análise de logs de autenticação SSH no Linux. Entendendo eventos de login, falhas, IPs de origem e a importância dos logs para SOC.',
    tools: ['journalctl', 'auth.log', 'syslog'],
    status: 'documentado',
    articleSlug: 'analisando-logs-de-autenticacao-ssh-no-linux',
  },
  {
    id: 4,
    title: 'Scan de portas com Nmap',
    description:
      'Uso do Nmap para identificar portas abertas e serviços expostos em máquinas na rede local.',
    tools: ['Nmap', 'Ubuntu 24.04'],
    status: 'documentado',
    articleSlug: 'usando-nmap-para-identificar-portas-abertas',
  },
  {
    id: 5,
    title: 'Análise de tráfego com Wireshark',
    description:
      'Captura e análise de pacotes em rede local. Observação de protocolos como ICMP, DNS e TCP.',
    tools: ['Wireshark', 'tcpdump'],
    status: 'planejado',
    articleSlug: 'primeiros-passos-com-wireshark',
  },
  {
    id: 6,
    title: 'Monitoramento básico com Wazuh',
    description:
      'Instalação e configuração básica do Wazuh como SIEM para monitoramento de eventos de segurança.',
    tools: ['Wazuh', 'Elasticsearch', 'Kibana'],
    status: 'planejado',
  },
];
