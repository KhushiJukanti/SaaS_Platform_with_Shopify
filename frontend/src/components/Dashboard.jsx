import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';

const Dashboard = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [conversionRate, setConversionRate] = useState(0);
    const [orders, setOrders] = useState([]);
    const [sortOrder, setSortOrder] = useState('date');
    const [isAutoRefresh, setIsAutoRefresh] = useState(true);

    // Function to fetch order data from your backend
    const fetchOrderData = async () => {
        try {
            const response = await axios.get('http://localhost:7000/shopify/orders');
            const { totalOrders, totalSales, conversionRate } = response.data;

            setTotalOrders(totalOrders);
            setTotalSales(totalSales);
            setConversionRate(conversionRate);
            setOrders(response.data.orders || []); // Set orders if available
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchOrderData();
        if (isAutoRefresh) {
            const intervalId = setInterval(fetchOrderData, 300000); // Refresh every 5 minutes
            return () => clearInterval(intervalId);
        }
    }, [isAutoRefresh]);

    // Handle sorting orders
    const handleSortChange = (order) => {
        setSortOrder(order);
        setOrders(prevOrders => {
            return [...prevOrders].sort((a, b) => {
                if (order === 'date') return new Date(b.created_at) - new Date(a.created_at);
                if (order === 'sales') return b.total_price - a.total_price;
                return 0;
            });
        });
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Total Orders</Card.Title>
                            <Card.Text>{totalOrders}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Total Sales</Card.Title>
                            <Card.Text>${totalSales}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Conversion Rate</Card.Title>
                            <Card.Text>{conversionRate}%</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col xs="auto">
                    <Button variant="primary" onClick={fetchOrderData} className="mb-3">Refresh Data</Button>
                </Col>
                <Col xs="auto">
                    <Button variant={isAutoRefresh ? 'warning' : 'success'} onClick={() => setIsAutoRefresh(!isAutoRefresh)}>
                        {isAutoRefresh ? 'Disable Auto Refresh' : 'Enable Auto Refresh'}
                    </Button>
                </Col>
                <Col className="text-end">
                    <Dropdown className="mb-3">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Sort By: {sortOrder === 'date' ? 'Date' : 'Sales'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSortChange('date')}>Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSortChange('sales')}>Sales</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Row>
                <Col>
                    <h4>Order List</h4>
                    <ul className="list-group">
                        {orders.map((order) => (
                            <li key={order.id} className="list-group-item">
                                Order ID: {order.id} - Total: ${order.total_price} - Date: {new Date(order.created_at).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
