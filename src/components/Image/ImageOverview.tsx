import { useState } from 'react';
import ImageVisualizer from './ImageVisualizer';

const ImageOverview = ({ src, width, height, alt, ...rest }: React.HTMLProps<HTMLImageElement>) => {
  const [fullScreenMode, setFullScreenMode] = useState(false);

  const handleClose = () => {
    setFullScreenMode(false);
  };

  const handleOpen = () => {
    setFullScreenMode(true);
  };
  return (
    <>
      <img
        src={src}
        onClick={handleOpen}
        width={width}
        height={height}
        style={{ cursor: 'pointer' }}
        {...rest}
      />
      {fullScreenMode && <ImageVisualizer src={src ?? ''} alt={alt ?? ''} onClose={handleClose} />}
    </>
  );
};

export default ImageOverview;
