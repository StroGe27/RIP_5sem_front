import React from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styles from './Card.module.scss'

export type CardProps = {
  id?: number,
  title?: React.ReactNode;
  ghz?: number;
  processor?: string;
  cost?: number;
  img?: string;
  processor_type_id?: number;
  onButtonClick?: React.MouseEventHandler;
  onImageClick?: React.MouseEventHandler;
};

const OneCard: React.FC<CardProps> = ({id, title, ghz, processor, cost, img, processor_type_id, onButtonClick, onImageClick }) => {
  const src = img !== "null" ? `http://127.0.0.1:9000/test/user_img/${img}` : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg";
  return (
    <Card>
      <Link to={`/orders/${id}/`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            style={{ cursor: 'pointer', width: '100%', height: 'auto',padding: '10px'}}
            onClick={onImageClick}
            src={src}
            alt="IMG"
            rounded
          />
        </div>
      </Link>
      <Card.Body className='d-flex flex-column'>
        
        <h4>{title}</h4>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div className={styles['attribute-style']}>{cost} руб/мес</div>
          <div className={styles['attribute-style']}>{ghz} Ghz</div>
          <div className={styles['attribute-style']}>{processor}</div>
          <div className={styles['attribute-style']}>{status}</div>
          <div className={styles['attribute-style']} > 
            {processor_type_id === 1 ? <img
            src={'http://127.0.0.1:9000/test/INTEL.png'}
            alt="Intel"
            style={{
              height: '20px',
            }}/> : <img src={'http://127.0.0.1:9000/test/AMD.png'}
            alt="Amd"
            style={{
              height: '20px',
              }}/>}
          </div>
        </div>
        {/* <Card.Text>Цена: {cost} руб/мес</Card.Text>
        <Card.Text>Цена: {cost} руб/мес</Card.Text> */}
        <div className='mt-auto w-100' style={{position: 'relative', height: 60}}>
          <Button style={{ backgroundColor: '#2787F5', padding: '15px 30px', borderColor: "#000", position: 'absolute', right: 0, marginBottom: 50, fontSize: 18 }} onClick={onButtonClick} variant="primary">Добавить</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OneCard;