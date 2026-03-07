import { Navbar, Nav, Container } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router";
// Import Link từ react-scroll để thay thế NavLink của router
import { Link as ScrollLink } from "react-scroll";
import styled, { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import ThemeToggler from "./ThemeToggler";

const styles = {
  logoStyle: {
    width: 50,
    height: 40,
  },
};

const ExternalNavLink = styled.a`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }
`;

// Chuyển đổi styled component từ NavLink sang ScrollLink
const InternalScrollLink = styled(ScrollLink)`
  color: ${(props) => props.theme.navbarTheme.linkColor};
  cursor: pointer;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: ${(props) => props.theme.navbarTheme.linkHoverColor};
  }

  &.active {
    color: ${(props) => props.theme.navbarTheme.linkActiveColor};
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 10%;
      width: 80%;
      height: 2px;
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="md"
      bg="dark"
      variant="dark"
      className="navbar-custom"
      expanded={expanded}
      style={{ backgroundColor: theme.navbarTheme.bg }}
    >
      <Container>
        {data?.logo && (
          <ScrollLink
            to="home"
            smooth={true}
            duration={300}
            onClick={() => setExpanded(false)}
            style={{ cursor: "pointer" }}
          >
            <Navbar.Brand className="navbar-brand-text">
              HOANG PHUC
            </Navbar.Brand>
          </ScrollLink>
        )}
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            {data &&
              data.sections?.map((section) => {
                // Xử lý link ngoài (ví dụ: dẫn đến Resume hoặc Blog)
                if (section?.type === "link") {
                  return (
                    <ExternalNavLink
                      key={section.title}
                      href={section.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setExpanded(false)}
                      className="navbar__link"
                      theme={theme}
                    >
                      {section.title}
                    </ExternalNavLink>
                  );
                }

                // Xử lý link nội bộ để cuộn (Smooth Scroll)
                let targetId = section.href.replace("/", "");

                // Nếu href là "/" thì targetId sẽ rỗng, ta phải gán nó là "home"
                if (targetId === "") {
                  targetId = "home";
                }

                return (
                  <InternalScrollLink
                    key={section.title}
                    to={targetId} // Bây giờ nút Home sẽ có to="home"
                    spy={true}
                    smooth={"easeInOutQuart"}
                    duration={300}
                    offset={-70}
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    activeClass="active"
                    theme={theme}
                  >
                    {section.title}
                  </InternalScrollLink>
                );
              })}
          </Nav>
          <ThemeToggler onClick={() => setExpanded(false)} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Vẫn giữ withRouter để tránh lỗi nếu các thành phần khác yêu cầu,
// nhưng logic điều hướng chính giờ dựa trên ScrollLink.
const NavBarWithRouter = withRouter(NavBar);
export default NavBarWithRouter;
