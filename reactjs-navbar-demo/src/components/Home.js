import React from 'react';
import { Form, FormControl, Button, Container, Card, CardGroup} from 'react-bootstrap';

const Home = () => {
    return(
        <div>
            <Container>
                <CardGroup>
                    <Card border="primary" style={{ width: '18rem', margin: '5px' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                    <Card border="secondary" style={{ width: '18rem', margin: '5px' }}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Container>
        </div>
    );
};

export default Home;