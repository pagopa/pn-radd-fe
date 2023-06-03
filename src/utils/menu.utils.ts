import MailIcon from '@mui/icons-material/Mail';
import { SideMenuItem } from '../components/SideMenu/SideMenuItem';
import { DOCUMENT_INQUIRY_ACT, DOCUMENT_INQUIRY_AOR } from '../navigation/routes.const';

export const getDefaultMenuItems = (): Array<SideMenuItem> => [
  {
    label: 'Richieste',
    route: '/',
    children: [
      {
        label: 'Documenti allegati e attestazioni opponibili a terzi',
        route: DOCUMENT_INQUIRY_ACT,
        icon: MailIcon,
      },
      {
        label: 'Avvisi di avvenuta ricezione',
        route: DOCUMENT_INQUIRY_AOR,
        icon: MailIcon,
      },
    ],
  },
];
