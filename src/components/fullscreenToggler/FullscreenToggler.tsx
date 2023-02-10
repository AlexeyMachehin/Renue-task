import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import classes from './fullscreenToggler.module.css';
interface IFullscreenTogglerProps {
  elementId: string;
}

export default function FullscreenToggler({
  elementId,
}: IFullscreenTogglerProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
      }
    });
    return () => {
      document.removeEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          setIsFullScreen(false);
        }
      });
    };
  }, []);

  const toggleFullScreen = (id: string) => {
    const HTMLelement = document.querySelector(`#${id}`);

    if (!document.fullscreenElement) {
      HTMLelement?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <Button
      className={classes.toggleButtonIcon}
      onClick={() => {
        toggleFullScreen(elementId);
      }}>
      {!isFullScreen && <ZoomInIcon className={classes.toggleButtonIcon} />}
    </Button>
  );
}
