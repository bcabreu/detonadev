export interface LabStage {
  id: number;
  tools: string[];
  status: 'documentado' | 'em-andamento' | 'planejado';
  articleSlug?: string;
}

export const labStages: LabStage[] = [
  {
    id: 1,
    tools: ['OpenSSH', 'Terminal', 'Ubuntu 24.04'],
    status: 'documentado',
    articleSlug: 'configurando-acesso-ssh-entre-macbook-e-ubuntu',
  },
  {
    id: 2,
    tools: ['UFW', 'iptables', 'Ubuntu 24.04'],
    status: 'documentado',
    articleSlug: 'entendendo-ip-portas-e-firewall-com-ubuntu-e-ufw',
  },
  {
    id: 3,
    tools: ['journalctl', 'auth.log', 'syslog'],
    status: 'documentado',
    articleSlug: 'analisando-logs-de-autenticacao-ssh-no-linux',
  },
  {
    id: 4,
    tools: ['Nmap', 'Ubuntu 24.04'],
    status: 'documentado',
    articleSlug: 'usando-nmap-para-identificar-portas-abertas',
  },
  {
    id: 5,
    tools: ['Wireshark', 'tcpdump'],
    status: 'documentado',
    articleSlug: 'primeiros-passos-com-wireshark',
  },
  {
    id: 6,
    tools: ['Wazuh', 'Elasticsearch', 'Kibana'],
    status: 'planejado',
  },
];
