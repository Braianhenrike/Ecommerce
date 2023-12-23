import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useHistory } from "react-router-dom";

import { PropTypes } from "prop-types";


import PerfectScrollbar from "perfect-scrollbar";


import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
} from "contexts/BackgroundColorContext";

var ps;

function Sidebar(props) {
  const location = useLocation();

  const history = useHistory();
  const sidebarRef = React.useRef(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("apiRole");

    if (storedRole === 'admin') {
      setIsAdmin(true);
    }

  }, [history]);

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const filterAuthRoutes = (routes) => {
    return routes.filter((route) => !route.layout.includes("/auth"));
  };

  const filterAdminRoutes = (routes) => {
    return routes.filter((route) => route.admin);
  };

  const filterAuthAdminRoutes = (routes) => {
    const authRoutes = filterAuthRoutes(routes);

    if (isAdmin) {
      return authRoutes;
    } else {
      const adminRoutesFiltered = filterAdminRoutes(authRoutes);
      const filteredRoutes = authRoutes.filter(
        (route) => !adminRoutesFiltered.includes(route)
      );
      return filteredRoutes;
    }
  };


  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const { routes, rtlActive, logo } = props;

  const filteredRoutes = filterAuthAdminRoutes(routes);

  let logoImg = null;

  let logoText = null;

  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              {filteredRoutes.map((prop, key) => {
                if (prop.redirect) return null;
                return (
                  <li
                    className={
                      activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                      onClick={props.toggleSidebar}
                    >
                      <i className={prop.icon} />
                      <p>{rtlActive ? prop.rtlName : prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    text: PropTypes.node,
    imgSrc: PropTypes.string
  })
};

export default Sidebar;