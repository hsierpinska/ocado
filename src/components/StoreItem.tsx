import { Card } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext'
type StoreItemProps = {
  id: number
  name: string
  price: {
    main: number
    fractional: number
  }
}
export function StoreItem({id, name, price}: StoreItemProps) {
    
    const { getItemQuantity, increaseCartQuantity} = useShoppingCart();
    const quantity = getItemQuantity(id);
    return <Card> 
        
        <Card.Img variant="top" src={`https://picsum.photos/id/${id+105}/300/200`} />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex just">{name}</Card.Title>
            <Card.Text>
                Cena: {price.main},{price.fractional} zł
            </Card.Text>
            {quantity > 0 ? (<span>Ilość w koszyku: {quantity}</span>) : <span>---------</span>}
            
            <button className="btn btn-primary w-100 mt-1" onClick={()=> increaseCartQuantity(id)} >
                Dodaj do koszyka
            </button>
        </Card.Body>
    </Card>
}