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
  /** Actions linked to user dropdown */
  onAssistanceClick?: () => void;
  /** Logout/exit action to apply */
  onExitAction?: () => void;
};

const Header = ({
  loggedUser,
  onExitAction = () => window.location.assign(''),
  onAssistanceClick = () => {},
}: Props) => (
  <HeaderAccount
    rootLink={pagoPAHeaderLink}
    loggedUser={loggedUser}
    onAssistanceClick={onAssistanceClick}
    onLogout={onExitAction}
  />
);

export default Header;
