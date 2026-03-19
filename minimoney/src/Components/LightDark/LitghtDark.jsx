import { useTheme } from '../../context/ThemeContext';
import './LightDark.css';

const LightDark = () => {  
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default LightDark;  