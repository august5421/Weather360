import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { setMobile, setTablet } from '../actions/actions';

const MobileDetector = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1200px)' });

  useEffect(() => {
    dispatch(setMobile(isMobile));
  }, [isMobile, dispatch]);
  
  useEffect(() => {
    dispatch(setTablet(isTablet));
  }, [isTablet, dispatch]);

  return null;
};

export default MobileDetector;
