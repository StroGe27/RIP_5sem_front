import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from 'components/Header';
import OneCard from 'components/Card';
import styles from './MainPage.module.scss'
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import SliderFilter from 'components/Slider';

import { categories, mockOrders } from '../../../consts';

export type Order = {
    id: number,
    title: string,
    status: string,
    processor: string,
    ghz: number,
    ram: number,
    ip: string,
    availableos: string,
    cost: number,
    img: string,
    processor_type_id: number;
}

export type ReceivedOrderData = {
    id: number,
    title: string,
    status: string,
    processor: string,
    ghz: number,
    ram: number,
    ip: string,
    availableos: string,
    cost: number,
    img: string,
    processor_type_id: number;
}



const MainPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [typeValue, setTypeValue] = useState<string>(categories[0].value)
    const [titleValue, setTitleValue] = useState<string>('')
    const [priceValue, setPriceValue] = useState<number>()
    const [sliderValues, setSliderValues] = useState([0, 10000]);
    const linksMap = new Map<string, string>([
        ['Виды Виртуальных машин', '/']
    ]);

    const fetchOrders = async () => {
        let url = 'http://127.0.0.1:8000/api/orders/search/?'

        // if (titleValue) {
        //     url += `search/?title=${titleValue}`


        //     if (typeValue && typeValue !== 'All') {
        //         url += `&type=${typeValue}`
        //     }
        //     if (priceValue) {
        //         url += `&max_price=${priceValue}`
        //     }
        // } else if(typeValue && typeValue !== 'База процессора') {
        //     url += `?type=${typeValue}`
        //     if (priceValue) {
        //         url += `&max_price=${priceValue}`
        //     }
        // } else if (priceValue){
        //     url += `?max_price=${priceValue}`
        // }
        // let searching = ''
        if (titleValue) {
            url += `title=${titleValue}`
           
            // if  (priceValue) {
            //     url += `?max_price=${priceValue}`
            // }
        }
        if (typeValue !== 'All'){
            url += `&type=${typeValue}`
        }
        // if (!titleValue && !typeValue){
        //     url += '?'
        // }
        url += `&lcost=${sliderValues[0]}`
        url += `&rcost=${sliderValues[1]}`


        try {
            const response = await fetch(url);
            const jsonData = await response.json();
            const newOrdersArr = jsonData.map((raw: ReceivedOrderData) => ({
                id: raw.id,
                title: raw.title,
                status: raw.status,
                processor: raw.processor,
                ghz: raw.ghz,
                ram: raw.ram,
                ip: raw.ip,
                availableos: raw.availableos,
                cost: raw.cost,
                img: raw.img,
                processor_type_id: raw.processor_type_id
                }));
                
                setOrders(newOrdersArr);
        }
        catch {
            console.log('запрос не прошел !')
            
            if (typeValue && typeValue !== 'All') {
                const filteredArray = mockOrders.filter(mockOrders => mockOrders.categoryTitle === typeValue);
                setOrders(filteredArray);
            } else if (titleValue) {
                const filteredArray = mockOrders.filter(mockOrders => mockOrders.title.includes(titleValue));
                setOrders(filteredArray);
            } else if (priceValue) {
                const filteredArray = mockOrders.filter(mockOrders => mockOrders.price <= priceValue);
                setOrders(filteredArray);
            }
            
            else {
                setOrders(mockOrders);
            }
        }
        
    };
    useEffect(() => {
        fetchOrders();
    }, []);

    const handleSearchButtonClick = () => {
        fetchOrders();
    }

    const handleTitleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(event.target.value);
    };

    const handlePriceValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPriceValue(Number(event.target.value));
    };

    const handleSliderChange = (values: number[]) => {
        setSliderValues(values);
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleCategorySelect = (eventKey: string | null) => {
        if (eventKey) {
          const selectedCategory = categories.find(category => category.key === eventKey);
          if (selectedCategory) {
            setTypeValue(selectedCategory.value);
          }
        }
    };

    return (
        <div className={styles['main__page']}>
            <Header/>
            <div className={styles['content']}>
                <h1 className="mb-4" style={{fontSize: 30}}>
                    Здесь вы найдете подходящюю модель под ваши нужды
                </h1>

                <Form className="d-flex gap-3" onSubmit={handleFormSubmit}>
                    <div className='w-100'>
                        <Form.Group style={{height: 60}} className='w-100 mb-3' controlId="search__sub.input__sub">
                            <Form.Control style={{height: '100%', borderColor: '#3D348B', fontSize: 18}} value={titleValue} onChange={handleTitleValueChange} type="text" placeholder="Введите название модели" />
                        </Form.Group>
                        <div style={{display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <Dropdown  onSelect={handleCategorySelect}>
                                <Dropdown.Toggle style={{  borderRadius: '20px'}}
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    {typeValue}
                                    <i className="bi bi-chevron-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: '100%', textAlign: 'left'}}>
                                    {categories.map(category => (
                                        <Dropdown.Item key={category.key} eventKey={category.key}>{category.value}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* <Dropdown onSelect={handleCategorySelect}>
                                <Dropdown.Toggle className='but-style'
                                    variant="success"
                                    id="dropdown-basic"
                                >
                                    {typeValue}
                                    <i className="bi bi-chevron-down"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{width: '100%', textAlign: 'left',}}>
                                    {categories.map(category => (
                                        <Dropdown.Item key={category.key} eventKey={category.key}>{category.value}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <SliderFilter
                                onChangeValues={handleSliderChange}
                                minimum={10000}
                                maximum={50000}
                                title="Диапазон цен:"
                            />
                        </div>
                        
                    </div>
                    
                    <Button style={{
                        padding: "15px 40px",
                        borderRadius: '40px',
                        fontSize: 18,
                        height: 60}}
                        onClick={() => handleSearchButtonClick()}>Найти</Button>
                </Form>

                <div className={styles["content__cards"]}>
                    {orders.map((order: Order) => (
                        <OneCard id={order.id}
                        img={order.img}
                        onButtonClick={() => console.log('добавлен в заявки')}
                        title={order.title}
                        processor={order.processor}
                        processor_type_id={order.processor_type_id}
                        // category={order.categoryTitle}
                        cost={Number(order.cost)}
                        ghz={order.ghz}></OneCard>
                    ))}
                </div>
            </div>
        </div>
    )
};
  
export default MainPage;