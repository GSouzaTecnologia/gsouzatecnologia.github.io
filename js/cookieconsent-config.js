/**
 * cookieconsent-config.js
 * CookieConsent v3 configuration - LGPD compliant
 * Uses orestbida/cookieconsent (MIT License)
 * https://github.com/orestbida/cookieconsent
 */

// Lazy-load CookieConsent CSS + JS, then initialize
(function () {
  function initCookieConsent() {
    if (typeof CookieConsent === 'undefined') return;

    CookieConsent.run({
      // Root element
      root: document.body,

      // Disable automatic cookie clearing on revoke (we handle it with GTM)
      autoClearCookies: true,

      // Cookie settings
      cookie: {
        name: 'cc_cookie',
        domain: window.location.hostname,
        path: '/',
        expiresAfterDays: 182, // ~6 months
        sameSite: 'Lax',
      },

      // GUI options
      guiOptions: {
        consentModal: {
          layout: 'box inline',
          position: 'bottom left',
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: 'box',
          position: 'right',
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      // Category-based consent
      categories: {
        necessary: {
          enabled: true,
          readOnly: true, // Cannot be disabled
        },
        analytics: {
          enabled: false, // Opt-in by default (LGPD)
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: '_gid' },
              { name: '_gat' },
              { name: /^_gc/ },
            ],
          },
        },
      },

      // Event callbacks
      onFirstConsent: function ({ cookie }) {
        updateGTMConsent(cookie);
      },

      onConsent: function ({ cookie }) {
        updateGTMConsent(cookie);
      },

      onChange: function ({ cookie, changedCategories }) {
        updateGTMConsent(cookie);
      },

      // Language configuration - Brazilian Portuguese
      language: {
        default: 'pt-BR',
        translations: {
          'pt-BR': {
            consentModal: {
              title: 'Nós utilizamos cookies',
              description:
                'Utilizamos cookies para melhorar sua experiência de navegação, analisar o tráfego do site e personalizar conteúdo. Ao clicar em "Aceitar todos", você concorda com o uso de todos os cookies. Você pode gerenciar suas preferências a qualquer momento. Saiba mais na nossa <a href="/politica-de-cookies">Política de Cookies</a>.',
              acceptAllBtn: 'Aceitar todos',
              acceptNecessaryBtn: 'Apenas necessários',
              showPreferencesBtn: 'Personalizar',
            },
            preferencesModal: {
              title: 'Preferências de Cookies',
              acceptAllBtn: 'Aceitar todos',
              acceptNecessaryBtn: 'Apenas necessários',
              savePreferencesBtn: 'Salvar preferências',
              closeIconLabel: 'Fechar',
              serviceCounterLabel: 'Serviço|Serviços',
              sections: [
                {
                  title: 'Sobre os Cookies',
                  description:
                    'Cookies são pequenos arquivos de texto armazenados no seu dispositivo ao visitar sites. Respeitamos sua privacidade em conformidade com a <strong>LGPD (Lei nº 13.709/2018)</strong>. Você pode escolher quais categorias deseja permitir e alterar suas preferências a qualquer momento.',
                },
                {
                  title: 'Cookies Estritamente Necessários',
                  description:
                    'Estes cookies são essenciais para o funcionamento do site. Sem eles, o site não funciona corretamente. Não coletam informações pessoais identificáveis e não podem ser desativados.',
                  linkedCategory: 'necessary',
                },
                {
                  title: 'Cookies de Análise e Desempenho',
                  description:
                    'Utilizamos cookies de análise (Google Analytics) para entender como os visitantes interagem com o site, permitindo-nos melhorar continuamente. Estes cookies coletam informações de forma agregada e anônima. <strong>Só são ativados com o seu consentimento.</strong>',
                  linkedCategory: 'analytics',
                  cookieTable: {
                    headers: {
                      name: 'Cookie',
                      domain: 'Domínio',
                      description: 'Descrição',
                      expiration: 'Validade',
                    },
                    body: [
                      {
                        name: '_ga',
                        domain: 'google.com',
                        description:
                          'Cookie principal do Google Analytics. Distingue visitantes únicos atribuindo um número gerado aleatoriamente.',
                        expiration: '2 anos',
                      },
                      {
                        name: '_ga_*',
                        domain: 'google.com',
                        description:
                          'Usado pelo Google Analytics para manter o estado da sessão.',
                        expiration: '2 anos',
                      },
                      {
                        name: '_gid',
                        domain: 'google.com',
                        description:
                          'Registra um ID exclusivo para gerar dados estatísticos sobre como o visitante usa o site.',
                        expiration: '24 horas',
                      },
                      {
                        name: '_gat',
                        domain: 'google.com',
                        description:
                          'Usado para limitar a taxa de requisições ao Google Analytics.',
                        expiration: '1 minuto',
                      },
                    ],
                  },
                },
                {
                  title: 'Mais informações',
                  description:
                    'Para mais informações sobre como tratamos seus dados pessoais, consulte nossa <a href="/politica-de-privacidade">Política de Privacidade</a>. Para dúvidas ou solicitações sobre cookies, entre em contato com nosso DPO pelo e-mail <a href="mailto:privacidade@gsouzatecnologia.com.br">privacidade@gsouzatecnologia.com.br</a>.',
                },
              ],
            },
          },
        },
      },
    });
  }

  /**
   * Update GTM/dataLayer consent based on cookie preferences
   * This integrates with Google Consent Mode v2
   */
  function updateGTMConsent(cookie) {
    window.dataLayer = window.dataLayer || [];

    var analyticsAccepted =
      cookie &&
      cookie.categories &&
      cookie.categories.indexOf('analytics') > -1;

    // Push consent update to dataLayer for GTM
    window.dataLayer.push({
      event: 'cookie_consent_update',
      cookie_consent_analytics: analyticsAccepted ? 'granted' : 'denied',
    });

    // Google Consent Mode v2 integration
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: analyticsAccepted ? 'granted' : 'denied',
      });
    } else {
      // Fallback: push to dataLayer for GTM to handle
      window.dataLayer.push(function () {
        this.set('analytics_storage', analyticsAccepted ? 'granted' : 'denied');
      });
    }
  }

  // Load CookieConsent CSS
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.css';
  document.head.appendChild(link);

  // Load CookieConsent JS, then initialize
  var script = document.createElement('script');
  script.src =
    'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.1.0/dist/cookieconsent.umd.js';
  script.onload = initCookieConsent;
  document.body.appendChild(script);
})();
