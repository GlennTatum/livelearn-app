import Accordian from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Course(props) {
    return (
        <div>
            <Accordian.Item eventKey="0">
                <Accordian.Header>
                <Container>
                    <Row>
                    <Col>
                        {props.courseName}
                    </Col>
                    </Row>
                </Container>
                </Accordian.Header>
                <Accordian.Body>
                <p>{props.courseDescription}</p>
                </Accordian.Body>
            </Accordian.Item>
        </div>
    );
}