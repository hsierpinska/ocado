import { useState } from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, ListGroup, Row, Col, Alert } from 'react-bootstrap'
import products from '../data/products.json'

export function OrderSummary() {
  const { cartItems, removeFromCart } = useShoppingCart()
  const navigate = useNavigate()
  const [orderSuccess, setOrderSuccess] = useState(false)


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

  const handleOrderSubmit = () => {
    // after submitting the order, clear the cart
    // and redirect to the home page after 3 seconds
    cartItems.forEach(item => removeFromCart(item.id))
    setOrderSuccess(true)
    setTimeout(() => navigate('/'), 3000)
  }

  return (
    <div>
      <h1>Podsumowanie zamówienia</h1>
      {cartItems.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <div>
          <ListGroup>
            {cartItems.map(item => {
              const product = getProductById(item.id)
              if (!product) return null 
              const price = product.price.main + product.price.fractional / 100
              return (
                <ListGroup.Item key={item.id} className="d-flex align-items-center">
                  <Row className="w-100">
                    <Col xs={6}>
                      <strong>{product.name}</strong>
                      <p>Cena: {price.toFixed(2)} zł</p>
                    </Col>
                    <Col xs={3}>
                      <p>Ilość: {item.quantity}</p>
                    </Col>
                    <Col xs={3}>
                    {/* partial sums for each product */}
                      <p>Suma częściowa: {(price * item.quantity).toFixed(2)} zł</p>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
          <h3>Łączna kwota: {getTotalPrice().toFixed(2)} zł</h3>
          <Button variant="success" onClick={handleOrderSubmit}>Złóż Zamówienie</Button>
        </div>
      )}
      
      {orderSuccess && (
        <Alert variant="success" className="mt-4">
          Zamówienie zostało złożone! Przekierowuję do sklepu...
        </Alert>
      )}

      <div>
        <Link to="/ocado/cart">Wróć do koszyka</Link>
      </div>
    </div>
  )
}
