import React, { useState, useEffect, Suspense, useMemo } from "react";
import { motion } from "framer-motion"; // Sử dụng framer-motion thay cho react-reveal
import FallbackSpinner from "./components/FallbackSpinner";
import NavBarWithRouter from "./components/NavBar";
import Home from "./components/Home";
import endpoints from "./constants/endpoints";

function MainApp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.routes, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  const sectionComponents = useMemo(() => {
    if (!data) return [];
    return data.sections.map((section) => ({
      ...section,
      Component: React.lazy(() => import("./components/" + section.component)),
    }));
  }, [data]);

  return (
    <div className="MainApp">
      <NavBarWithRouter />

      <main className="main">
        {/* Section Home */}
        <section id="home" className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Home />
          </motion.div>
        </section>

        {/* Danh sách các Section con với hiệu ứng hiện đại */}
        <Suspense fallback={<FallbackSpinner />}>
          {sectionComponents.map((section) => {
            const { Component, headerTitle, path } = section;
            const sectionId = path.replace("/", "") || "home";

            return (
              <section
                key={headerTitle}
                id={sectionId}
                className="section-wrapper"
                style={{ minHeight: "100vh" }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }} // Hiệu ứng lặp lại khi cuộn
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 50,
                  }}
                  className="container"
                >
                  <Component header={headerTitle} />
                </motion.div>
              </section>
            );
          })}
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
