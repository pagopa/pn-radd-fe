import { HeaderAccount, RootLinkType } from '@pagopa/mui-italia';
import { useAppSelector } from '../redux/hooks';
import { userSelector } from '../redux/user/slice';

const pagoPALink : { href: string; ariaLabel: string } = {
    href: 'https://www.pagopa.it/it/',
    ariaLabel: 'Link: vai al sito di PagoPA S.p.A.'
}  

const pagoPAHeaderLink: RootLinkType = {
    ...pagoPALink,
    label: 'PagoPA S.p.A.',
    title: 'Sito di PagoPA S.p.A.'
};

const Header = () => {
    const user = useAppSelector(userSelector);
    return (
        <HeaderAccount
            rootLink={pagoPAHeaderLink}
            loggedUser={user}
            onAssistanceClick={() => {
            console.log("Clicked/Tapped on Assistance");
            }}
            onLogin={() => {
            console.log("User login");
            }}
            onLogout={() => {
            console.log("User logout");
            }}
        />
    )
}

export default Header