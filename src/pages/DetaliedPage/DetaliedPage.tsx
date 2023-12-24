import * as React from 'react';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import Image from "react-bootstrap/Image"
import styles from './DetaliedPage.module.scss'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import { mockOrders } from '../../../consts'

type Order = {
    id: number,
    title: string,
    status: string,
    processor: string,
    ghz: number,
    ram: number,
    // ip: string,
    availableos: string,
    cost: number,
    img: string,
    processor_type_id: number;
};

const DetailedPage: React.FC = () => {
    const params = useParams();
    const id = params.id === undefined ? '' : params.id;
    const [order, setOrder] = useState<Order>();
    const fetchOrder = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/`);
        const jsonData = await response.json();
        setOrder(jsonData)
    //     try {
    //         const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}/`);
    //         const jsonData = await response.json();
    //         setOrder(jsonData)
    //     } catch {
    //         const order = mockOrders.find(item => item.id === Number(id));
    //         // setOrder(order) // допилить
    //     }
    };
    useEffect(() => {
        fetchOrder();
    }, []);
    const src = order?.img !== "NULL" ? `http://127.0.0.1:9000/test/user_img/${order?.img}` : "https://www.solaredge.com/us/sites/nam/files/Placeholders/Placeholder-4-3.jpg";
    console.log(src)
    return (
        <div className='main__page'>
            <Header/>
            <div className={styles.content} style={{paddingTop: "90px"}}>
                <div className='d-flex gap-5'>
                    <Image
                        style={{ width: '45%' }}
                        src={src}
                        rounded
                    />
                    <div style={{width: '55%'}}>
                        <h4>{order?.title}</h4>
                        <div className={styles.content__description}>
                        <p>Status: {order?.status}</p>
                        <p>Processor: {order?.processor}</p>
                        <p>GHz: {order?.ghz}</p>
                        <p>RAM: {order?.ram}</p>
                        <p>Available OS: {order?.availableos}</p>
                        <p>Cost: {order?.cost}</p>
                        <p>Img-src: {order?.img}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
};
  
export default DetailedPage;