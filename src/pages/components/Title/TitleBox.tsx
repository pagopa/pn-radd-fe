import { GridSize, Typography, Grid, SxProps, Theme } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

type Props = {
  /** TitleBox of the page to render */
  title: ReactNode;
  /** Subtitle (optional) of the page to render */
  subTitle?: string | JSX.Element;
  /** Gridsize for title on mobile devices */
  mbTitle?: GridSize;
  mtGrid?: number;
  /** Gridsize for subtitle on mobile devices */
  mbSubTitle?: number;
  /** Typography variant for title */
  variantTitle?: Variant;
  /** Typography variant for subtitle */
  variantSubTitle?: Variant;
  /** style to apply */
  sx?: SxProps<Theme>;
};

/**
 * TitleBox element. It renders a TitleBox (default variant is h1) and a subtitle (default variant is h5)
 */
const TitleBox = ({
    title,
    subTitle,
    mbTitle = 2,
    mtGrid,
    mbSubTitle,
    variantTitle = 'h1',
    variantSubTitle = 'h5',
    sx
  }: Props) => {
  return (
    <Grid container mt={mtGrid} sx={sx}>
      {title && <Grid item xs={12} mb={mbTitle}>
        <Typography variant={variantTitle}>{title}</Typography>
      </Grid>}
      {subTitle && <Grid item xs={12} mb={mbSubTitle}>
        <Typography variant={variantSubTitle} sx={{ fontSize: '18px' }}>
          {subTitle}
        </Typography>
      </Grid>}
    </Grid>
  );
}

export default TitleBox;