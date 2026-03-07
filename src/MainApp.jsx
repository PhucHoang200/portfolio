import React, { useState, useEffect, Suspense, useMemo } from 'react';
import FallbackSpinner from './components/FallbackSpinner';
import NavBarWithRouter from './components/NavBar';
import Home from './components/Home';
import endpoints from './constants/endpoints';
import { Fade } from 'react-reveal';

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  // Tối ưu hóa việc khởi tạo Lazy Components
  const sectionComponents = useMemo(() => {
    if (!data) return [];
    return data.sections.map((section) => ({
      ...section,
      Component: React.lazy(() => import('./components/' + section.component)),
    }));
  }, [data]);

  return (
    <div className="MainApp">
      {/* NavBar cần nhận diện được các ID này để cuộn */}
      <NavBarWithRouter />
      
      <main className="main">
        {/* 1. Phần Home - Điểm bắt đầu */}
        <section id="home" className="section-container">
          <Home />
        </section>

        {/* 2. Danh sách các Section con */}
        <Suspense fallback={<FallbackSpinner />}>
          {sectionComponents.map((section) => {
            const { Component, headerTitle, path } = section;
            
            // Chuyển đổi path thành ID (ví dụ: "/about" -> "about")
            // Đây là chìa khóa để Menu có thể "tìm" thấy phần này khi click
            const sectionId = path.replace('/', ''); 

            return (
              <section 
                key={headerTitle} 
                id={sectionId} 
                className="section-wrapper"
                style={{ minHeight: '100vh', paddingTop: '80px' }} // paddingTop để không bị che bởi NavBar cố định
              >
                <Fade bottom duration={1000} distance="30px">
                  <div className="container">
                    <Component header={headerTitle} />
                  </div>
                </Fade>
              </section>
            );
          })}
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;