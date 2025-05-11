import { Routes, Route} from "react-router-dom";
import { Container } from "react-bootstrap";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { OrderSummary } from "./pages/OrderSummary";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
function App() {
  return (
    <>
    <ShoppingCartProvider>
    <Navbar/>
    <Container className="mb-4">
    <Routes>
      

      <Route path="/ocado" element={<Shop/>}/>
      <Route path="/ocado/cart" element={<Cart/>}/>
      <Route path="/ocado/order-summary" element={<OrderSummary/>}/>
</Routes>
</Container>
</ShoppingCartProvider>

</>
)

  
}

export default App