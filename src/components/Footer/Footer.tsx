import { Footer as PagoPaFooter } from '@pagopa/mui-italia';

import {
  LANGUAGES,
  pagoPALink,
  companyLegalInfo,
  postLoginLinks,
  preLoginLinks,
} from '../../utils/const';

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
