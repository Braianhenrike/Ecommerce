import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { useCart } from "components/UseCart/UseCart";

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader
} from "reactstrap";

function UserNavbar(props) {
  const [collapseOpen, setcollapseOpen] = useState(false);
  const [modalSearch, setmodalSearch] = useState(false);
  const [color, setcolor] = useState("navbar-transparent");
  const { cart } = useCart();
  const history = useHistory();
  const [totalPurchase, setTotalPurchase] = useState(0);

  useEffect(() => {
    const total = cart.reduce((acc, product) => {
      const price = parseFloat(product.price) || 0;
      const quantity = parseInt(product.quantity) || 0;
      return acc + price * quantity;
    }, 0);
    setTotalPurchase(total);
  }, [cart]);

  useEffect(() => {
    window.addEventListener("resize", updateColor);

    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });

  const updateColor = () => {
    if (window.innerWidth < 999 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };

  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };

  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const logout = () => {
    if (
      localStorage.getItem("apiToken") != null ||
      localStorage.getItem("user") != null
    ) {
      localStorage.clear();
      history.push("/auth/login");
      return;
    };
  };
  
  const goToPayment = () => {
    history.push({
      pathname: "/user/payment",
      state: { cart: cart, totalPurchase: totalPurchase.toFixed(2) }
    });
  };

  const goToProfile = () => {
    history.push("/user/user-profile");
  };


  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup>
              <UncontrolledDropdown nav>
                <DropdownToggle caret color="default" data-toggle="dropdown" nav>
                  <div className="notification d-none d-lg-block d-xl-block" />
                  <i className="tim-icons icon-cart" />
                  <p className="d-lg-none text-dark">Carrinho</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  {cart.map((product) => (
                    <DropdownItem key={product.id} className="nav-item">
                      <div>
                        <img src={`data:image/png;base64,${product.image}`} alt={product.name} style={{ maxWidth: "300px", maxHeight: "300px" }}/>
                      </div>
                      <div className="text-dark">
                        <span>{product.name}</span>
                      </div>
                      <div className="text-dark">
                        <span>Preço: R${product.price}</span>
                      </div>
                      <div className="text-dark">
                        <span>Quantidade: {product.quantity}</span>
                      </div>
                    </DropdownItem>
                  ))}
                  <DropdownItem >
                    <div className="text-dark">
                      <span>Total da Compra: R${totalPurchase.toFixed(2)}</span>
                    </div>
                  </DropdownItem>
                  <DropdownItem className="nav-item">
                    <Button
                      color="info"
                      onClick={goToPayment}
                    >
                      <i className="tim-icons icon-basket" /> Finalizar Compra
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item" onClick={goToProfile}>Profile</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">
                      <Button onClick={logout}>
                        <span className="d-md-block">Logout</span>
                      </Button>
                    </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default UserNavbar;