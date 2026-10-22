import "./DashBoard.css";
import Hero from "./Hero/Hero";
import PatrimonioCard from "./Cards/PatrimonioCard/PatrimonioCard";
import Analytics from "./Analytics/Analytics";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { useValores } from "../../../context/ValoresContext";
import { useAuth, useUserId } from "../../../context/AuthContext";


function Dashboard() {
  const { valoresVisiveis, alternarValores } = useValores();
  const { user, loading, perfil, perfilLoading } = useAuth();
  const userId = useUserId();
  console.log("Dashboard userId:", userId);
  if (loading) {
    return <div className="Dashboard">Carregando...</div>;
  }

  if (!user) {
    return <div className="Dashboard">Usuário não autenticado.</div>;
  }

  return (
    <div className="Dashboard">
      <div className="Dashboard-main">
        <div className="Dashboard-header">
          <div className="header-title">
            <h1>
              Bom dia{" "}
              {perfilLoading ? "..." : perfil?.NOME ?? "usuário"}! 👋
            </h1>

            <p>Aqui está o resumo da sua vida financeira.</p>
          </div>

          <PatrimonioCard pUserId={userId} />
        </div>

        <button
          onClick={alternarValores}
          className="toggle-valores-button"
        >
          {valoresVisiveis ? <IoEye /> : <IoEyeOff />}
        </button>

        <Hero pUserId={userId} />
        <Analytics pUserId={userId} />
      </div>
    </div>
  );
}

export default Dashboard;