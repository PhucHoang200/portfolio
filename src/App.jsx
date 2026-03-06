import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from 'use-dark-mode';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import { lightTheme, darkTheme } from './theme/themes';

function App() {
  // Xóa hoặc comment dòng window.matchMedia = null để tránh lỗi crash hệ thống
  // window.matchMedia = null; 

  const darkMode = useDarkMode(true);

  return (
    <AppContext.Provider value={{ darkMode }}>
      <ThemeProvider theme={darkMode.value ? darkTheme : lightTheme}>
        <GlobalStyles />
        <div className="App">
          {/* Dùng HashRouter giúp không bao giờ bị lỗi 404 khi F5. 
              Không cần dùng basename={process.env.PUBLIC_URL} với HashRouter.
          */}
          <Router>
            <MainApp />
          </Router>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
