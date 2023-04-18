import React from 'react';
import { Footer as PagoPaFooter } from '@pagopa/mui-italia';
import { FooterLinksType, PreLoginFooterLinksType } from '@pagopa/mui-italia/dist/components';

const pagoPALink: { href: string; ariaLabel: string } = {
  href: 'https://www.pagopa.it/it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
};

const preLoginLinks: PreLoginFooterLinksType = {
  // First column
  aboutUs: {
    title: undefined,
    links: [
      {
        label: `Chi siamo`,
        ariaLabel: `Vai al link: Chi siamo`,
        href: `${pagoPALink.href}societa/chi-siamo`,
        linkType: 'external',
      },
      {
        label: 'PNRR',
        href: `${pagoPALink.href}opportunita/pnrr/progetti`,
        ariaLabel: `Vai al link: PNRR`,
        linkType: 'external',
      },
      {
        label: 'Media',
        href: `${pagoPALink.href}media`,
        ariaLabel: `Vai al link: Media`,
        linkType: 'external',
      },
      {
        label: 'Lavora con noi',
        ariaLabel: `Vai al link: Lavora con noi`,
        href: `${pagoPALink.href}lavora-con-noi`,
        linkType: 'external',
      },
    ],
  },
  // Second column
  resources: {
    title: 'Risorse',
    links: [
      {
        label: 'Privacy Policy',
        href: `/tbd`,
        ariaLabel: `Vai al link: Privacy Policy`,
        linkType: 'external',
      },
      {
        label: 'Certificazioni',
        href: 'https://www.pagopa.it/static/10ffe3b3d90ecad83d1bbebea0512188/Certificato-SGSI-PagoPA-2020.pdf',
        ariaLabel: 'Vai al link: Certificazioni',
        linkType: 'internal',
      },
      {
        label: 'Sicurezza delle informazioni',
        href: 'https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdf',
        ariaLabel: 'Vai al link: Sicurezza delle informazioni',
        linkType: 'internal',
      },
      {
        label: 'Diritto alla protezione dei dati personali',
        href: 'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
        ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
        linkType: 'internal',
      },
      {
        label: 'Preferenze Cookie',
        ariaLabel: 'Vai al link: Preferenze Cookie',
        href: 'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
        linkType: 'internal',
      },
      {
        label: 'Termini e Condizioni',
        ariaLabel: 'Vai al link: Termini e Condizioni',
        href: `/tbd`,
        linkType: 'external',
      },
      {
        label: 'Società trasparente',
        href: 'https://pagopa.portaleamministrazionetrasparente.it',
        ariaLabel: 'Vai al link: Società trasparente',
        linkType: 'internal',
      },
      {
        label: 'Responsible Disclosure Policy',
        href: 'https://www.pagopa.it/it/responsible-disclosure-policy/',
        ariaLabel: 'Vai al link: Responsible Disclosure Policy',
        linkType: 'internal',
      },
      {
        label: 'Modello 321',
        href: 'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.htmls',
        linkType: 'internal',
        ariaLabel: 'Vai al link: Modello 321',
      },
    ],
  },
  // Third column
  followUs: {
    title: 'Seguici su',
    socialLinks: [
      {
        icon: 'linkedin',
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/company/pagopa/',
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
      {
        title: 'Twitter',
        icon: 'twitter',
        href: 'https://it.linkedin.com/company/pagopa',
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
      {
        icon: 'instagram',
        title: 'Instagram',
        href: 'https://www.instagram.com/pagopaspa/?hl=en',
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
      {
        icon: 'medium',
        title: 'Medium',
        href: 'https://medium.com/pagopa-spa',
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
    ],
    links: [
      {
        label: 'Accessibilità',
        ariaLabel: 'Link: Accessibilità',
        href: `/tbd`,
        linkType: 'external',
      },
    ],
  },
};

const companyLegalInfo = (
  <>
    <strong>PagoPA S.p.A.</strong> — società per azioni con socio unico - capitale sociale di euro
    1,000,000 interamente versato - sede legale in Roma, Piazza Colonna 370 ,
    <br />
    CAP 00187 - n. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
  </>
);

const postLoginLinks: Array<FooterLinksType> = [
  {
    label: 'Privacy policy',
    href: `/tbd`,
    ariaLabel: `Vai al link: Privacy Policy`,
    linkType: 'external',
  },
  {
    label: 'Termini e Condizioni',
    ariaLabel: `Vai al link: Termini e Condizioni`,
    href: `/tbd`,
    linkType: 'external',
  },
  {
    label: 'Accessibilità',
    ariaLabel: `Vai al link: Accessibilità`,
    href: `/tbd`,
    linkType: 'external',
  },
];

export const LANGUAGES = {
  it: { it: 'Italiano', en: 'Inglese' },
};

const Footer = () => (
    <PagoPaFooter
      loggedUser
      companyLink={pagoPALink}
      legalInfo={companyLegalInfo}
      postLoginLinks={postLoginLinks}
      preLoginLinks={preLoginLinks}
      currentLangCode={'it'}
      onLanguageChanged={
        (/* newLang */) => {
          console.log('Changed Language');
        }
      }
      languages={LANGUAGES}
      productsJsonUrl="https://dev.selfcare.pagopa.it/assets/products.json"
      hideProductsColumn={false}
    />
  );

export default Footer;
