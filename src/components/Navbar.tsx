import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
    const { cartQuantity } = useShoppingCart();
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
          <Container>
            <Nav className="me-auto">
              <Nav.Link to="/" as={NavLink}>Sklep</Nav.Link>
              <Nav.Link  to="/cart" as={NavLink} style={{width:"100px"}}>Koszyk
              <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "relative", top: "-23px", right: "-60px" }}>
                {cartQuantity}</div>
              </Nav.Link>
              <Nav.Link to="/order-summary" as={NavLink}>Zamówienia</Nav.Link>
            </Nav>

          </Container>
        </NavbarBs>
    );
}