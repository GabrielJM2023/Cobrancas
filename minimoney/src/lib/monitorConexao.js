import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function MonitorConexao() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleOnline() {

      const rotaSalva = sessionStorage.getItem("rota_interrompida");
      if (rotaSalva) {
        sessionStorage.removeItem("rota_interrompida");
        navigate(rotaSalva);
      }
    }

    function handleOffline() {
      sessionStorage.setItem("rota_interrompida", location.pathname);
      navigate("/sem-conexao");
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [location.pathname, navigate]);
  

  return null; 
}
