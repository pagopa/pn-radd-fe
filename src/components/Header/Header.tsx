import { HeaderAccount, JwtUser, RootLinkType } from '@pagopa/mui-italia';

const pagoPALink: { href: string; ariaLabel: string } = {
  href: 'https://www.pagopa.it/it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
};

const pagoPAHeaderLink: RootLinkType = {
  ...pagoPALink,
  label: 'PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.',
};

type Props = {
  loggedUser: JwtUser;
};

const Header = ({ loggedUser }: Props) => (
  <HeaderAccount
    rootLink={pagoPAHeaderLink}
    loggedUser={loggedUser}
    onAssistanceClick={() => {
      console.log('Clicked/Tapped on Assistance');
    }}
    onLogin={() => {
      console.log('User login');
    }}
    onLogout={() => {
      console.log('User logout');
    }}
  />
);

export default Header;
