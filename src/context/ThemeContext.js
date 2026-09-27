import React, { createContext, useContext, useMemo, useState } from 'react';
import { colors as lightColors } from '../theme/theme';

const darkColors = {
  ...lightColors,
  background: '#121212',
  surface: '#1E1E1E',
  textPrimary: '#FFFFFF',
  textSecondary: '#BDBDBD',
  border: '#333333',
  muted: '#444444',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const colors = useMemo(
    () => (isDark ? darkColors : lightColors),
    [isDark]
  );

  function toggleTheme() {
    setIsDark((previous) => !previous);
  }

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}