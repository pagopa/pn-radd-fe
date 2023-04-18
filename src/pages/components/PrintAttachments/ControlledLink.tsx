import CheckIcon from '@mui/icons-material/Check';
import { Link } from '@mui/material';
type Props = {
  href: string;
  label: string;
  clicked: boolean;
  onClick: (e: any) => void;
};
const ControlledLink = ({ href, label, clicked, onClick }: Props) => {
  return (
    <Link href={href} onClick={onClick} target="_blank">
      {clicked && <CheckIcon />}
      {label}
    </Link>
  );
};

export default ControlledLink;
