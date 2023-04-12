import { SideMenuItem } from "../types/SideMenuItem"
import { DOCUMENT_INQUIRY_ACT } from "../navigation/routes.const"
import MailIcon from '@mui/icons-material/Mail';

export const getDefaultMenuItems = () : Array<SideMenuItem> => {
    return [
        {
            label: "Richieste",
            route: "/",
            children: [
                {
                    label: "Richiesta di atti e attestazioni opponibili a terzi",
                    route: DOCUMENT_INQUIRY_ACT,
                    icon: MailIcon
                },
                {
                    label: "Richiesta di avvisi di avvenuta ricezione",
                    route: "tbd2",
                    icon: MailIcon
                }
            ]
        }
    ];
} 