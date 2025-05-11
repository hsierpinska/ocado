import { useShoppingCart } from '../context/ShoppingCartContext'
import { Link } from 'react-router-dom'
import { Button, ListGroup, Row, Col } from 'react-bootstrap'
import products from '../data/products.json'

export function Cart() {
  const { cartItems, removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart()

  const getProductById = (id: number) => {
    return products.find(product => product.id === id)
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const product = getProductById(item.id)
      if (product) {
        const price = product.price.main + product.price.fractional / 100
        return total + price * item.quantity
      }
      return total
    }, 0)
  }

  return (
    <div>
      <h1>Twój koszyk</h1>
      {cartItems.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <div>
          <ListGroup>
            {cartItems.map(item => {
              const product = getProductById(item.id)
              if (!product) return null
              const price = product.price.main + product.price.fractional / 100
              const itemTotal = price * item.quantity 

              return (
                <ListGroup.Item key={item.id} className="d-flex align-items-center">
                  <Row className="w-100">
                    <Col xs={2} className="d-flex justify-content-center">
                      <img
                        src={`https://picsum.photos/id/${item.id+10}/50/50`}
                        alt={product.name}
                        className="img-fluid"
                      />
                    </Col>
                    <Col xs={6}>
                      <strong>{product.name}</strong>
                      <p>Cena: {price.toFixed(2)} zł</p>
                      <p>Suma częściowa: {itemTotal.toFixed(2)} zł</p> {/* Wyświetl sumę częściową */}
                    </Col>
                    <Col xs={4} className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button variant="outline-secondary" onClick={() => decreaseCartQuantity(item.id)}>
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button variant="outline-secondary" onClick={() => increaseCartQuantity(item.id)}>
                          +
                        </Button>
                      </div>
                      <Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
                        Usuń
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          <h3>Suma: {getTotalPrice().toFixed(2)} zł</h3>
          <Link to="/ocado/order-summary">
            <Button variant="primary">Przejdź do podsumowania</Button>
          </Link>
        </div>
      )}
      <Link to="/ocado">Wróć do sklepu</Link>
    </div>
  )
}
