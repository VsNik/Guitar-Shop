import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

enum StartPosition {
  Top = 0,
  Left = 0,
}

export const ScrollTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: StartPosition.Top,
      left: StartPosition.Left,
    });
  }, [pathname]);

  return null;
};
