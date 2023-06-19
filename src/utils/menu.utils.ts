import MailIcon from '@mui/icons-material/Mail';
import {
  DOCUMENT_INQUIRY_ACT,
  DOCUMENT_INQUIRY_AOR,
  SEARCH_INQUIRY,
} from '../navigation/routes.const';
import { SideMenuItem } from '../components/SideMenu/types';

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
  {
    label: 'Richieste precedenti',
    route: SEARCH_INQUIRY,
  },
];
