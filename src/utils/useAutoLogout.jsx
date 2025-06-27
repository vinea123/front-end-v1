// src/utils/useAutoLogout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useAutoLogout(timeout = 1 * 60 * 1000) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // alert('You have been logged out due to inactivity.');
      navigate('/');
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, timeout);
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
    };
  }, [navigate, timeout]);
}

export default useAutoLogout;
