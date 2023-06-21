export const dataRegex = {
  iun: /[A-Z]{4}-[A-Z]{4}-[A-Z]{4}-[\d]{6}-[A-Z]{1}-[\d]{1}/,
  phoneNumber: /^3\d{2}[. ]??\d{6,7}$/g,
  name: /^[A-Za-zÀ-ÿ-'" 0-9.]+$/,
  lettersAndNumbers: /^[A-Za-z0-9]+$/,
  simpleServer: /^[A-Za-z0-9.\-/]+$/, // the server part of an URL, no protocol, no query params
  token: /^[A-Za-z0-9\-._~+/]+$/, // cfr. https://stackoverflow.com/questions/50031993/what-characters-are-allowed-in-an-oauth2-access-token
  fiscalCode:
    /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})$/i,
  pIva: /^\d{11}$/,
  fiscalCodeOrPiva:
    /^([A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1})|(\d{11})$/i,
};

export const defaultRequiredMessage = (fieldName: string = '') =>
  `Il campo ${fieldName} è obbligatorio.`;

export const LEAVING_APP_TITLE = 'Non sei autorizzato ad accedere';
export const LEAVING_APP_MESSAGE = 'Stai uscendo da RADD ...';
export const DENIED_ACCESS_TITLE =
  'Non hai le autorizzazioni necessarie per accedere a questa pagina';
export const DENIED_ACCESS_MESSAGE =
  "Per usare l'applicazione RADD, accedi all'Area Riservata con SPID o CIE.";
