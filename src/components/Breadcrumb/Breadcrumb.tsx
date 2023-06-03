import { RefAttributes } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { Breadcrumbs, Stack, styled, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonNaked } from '@pagopa/mui-italia';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: `${theme.palette.text.primary} !important`,
  texDecoration: 'none !important',
  '&:hover, &:focus': {
    textDecoration: 'underline !important',
  },
}));

const BreadcrumbLink = (props: LinkProps & RefAttributes<HTMLAnchorElement>) => (
  <StyledLink {...props} />
);

type PnBreadcrumbProps = {
  goBackAction?: () => void;
  goBackLabel?: string;
  links: Array<BreadcrumbsLinkProps>;
  currentLocationLabel: string;
};

type BreadcrumbsLinkProps = {
  linkLabel: string;
  linkRoute: string;
  linkProps?: LinkProps & RefAttributes<HTMLAnchorElement>;
};

const Breadcrumb = ({
  goBackAction,
  goBackLabel = 'Indietro',
  links,
  currentLocationLabel,
}: PnBreadcrumbProps) => {
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'start', sm: 'center' }}
      justifyContent="start"
      spacing={3}
    >
      <ButtonNaked
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={goBackAction ? goBackAction : () => navigate(-1)}
      >
        {goBackLabel}
      </ButtonNaked>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map(({ linkLabel, linkProps, linkRoute }) => (
          <BreadcrumbLink to={linkRoute} {...linkProps} key={linkRoute}>
            {linkLabel}
          </BreadcrumbLink>
        ))}
        <Typography
          color="text.primary"
          fontWeight={600}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {currentLocationLabel}
        </Typography>
      </Breadcrumbs>
    </Stack>
  );
};

export default Breadcrumb;
