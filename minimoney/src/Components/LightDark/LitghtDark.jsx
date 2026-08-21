import { useTheme } from '../../context/ThemeContext';
import './LightDark.css';

const LightDark = () => {  
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="theme-toggle-button">
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

export default LightDark;  