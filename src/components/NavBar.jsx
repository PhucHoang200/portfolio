import { Navbar, Nav, Container } from 'react-bootstrap';
import React, { useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router';
// Import Link từ react-scroll để thay thế NavLink của router
import { Link as ScrollLink } from 'react-scroll';
import styled, { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import ThemeToggler from './ThemeToggler';

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
      content: '';
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
      method: 'GET',
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
            duration={500}
            onClick={() => setExpanded(false)}
            style={{ cursor: 'pointer' }}
          >
            <Navbar.Brand>
              <img
                src={data?.logo?.source}
                className="d-inline-block align-top"
                alt="main logo"
                style={
                  data?.logo?.height && data?.logo?.width
                    ? { height: data?.logo?.height, width: data?.logo?.width }
                    : styles.logoStyle
                }
              />
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
                if (section?.type === 'link') {
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
                // path "/about" sẽ được chuyển thành id "about"
                const targetId = section.href.replace('/', '');
                
                return (
                  <InternalScrollLink
                    key={section.title}
                    to={targetId}       // ID của section trong MainApp.jsx
                    spy={true}          // Tự động nhận diện khi cuộn qua
                    smooth={true}       // Hiệu ứng lướt mượt
                    duration={500}      // Thời gian lướt (ms)
                    offset={-70}        // Bù trừ cho độ cao của Navbar
                    onClick={() => setExpanded(false)}
                    className="navbar__link"
                    activeClass="active" // Class khi đang ở mục đó
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