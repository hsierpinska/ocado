import products from '../data/products.json';
import { Col, Row } from 'react-bootstrap';

import { StoreItem } from '../components/StoreItem';
export function Shop() {
  return (
    <>
    <h1>Sklep</h1>
    
     <Row md={2} xs={1} lg={3} className="g-3">
      {products.map(product => (
        <Col key={product.id}>
          <StoreItem {...product} />
        </Col>
      ))}
      </Row>
   </>
  );
} 