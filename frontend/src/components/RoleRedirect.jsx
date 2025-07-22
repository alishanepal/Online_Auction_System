import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get role from sessionStorage or localStorage (adjust as needed)
    const role = sessionStorage.getItem('role') || localStorage.getItem('role');
    if (role === 'seller') {
      navigate('/seller', { replace: true });
    } else if (role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  return null;
};

export default RoleRedirect;
