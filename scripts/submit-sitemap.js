// Script de indexação oficial via Google Search Console API.
// Requer Google Service Account configurada.
// ⚠️ IMPORTANTE: O email da Service Account criada no GCP deve ser adicionado 
// OBBRIGATORIAMENTE como "Proprietário" (Owner) na propriedade do Google Search Console.
// Sem essa permissão webmasters.sitemaps.submit retornará 403 Forbidden.

const { google } = require('googleapis');
const path = require('path');

async function submitSitemap(siteUrl, sitemapUrl) {
  try {
    const auth = new google.auth.GoogleAuth({
      // Requer a sua chave Service Account provida no Action Root
      keyFile: path.join(__dirname, '../gcp-service-account.json'), 
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });

    const webmasters = google.webmasters({ version: 'v3', auth });

    console.log(`📡 Solicitando leitura de sitemap ${sitemapUrl} para ${siteUrl}...`);
    
    await webmasters.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapUrl,
    });

    console.log('✅ Sitemap submetido com sucesso pela API Autenticada do Search Console!');
  } catch (error) {
    console.error('❌ Erro HTTP ao dialogar com GSC:', error.message);
    process.exit(1);
  }
}

const SITE_URL = process.env.SITE_URL || 'https://kepoweb.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

submitSitemap(SITE_URL, SITEMAP_URL);
