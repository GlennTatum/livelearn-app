import React from 'react';

import Accordian from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Course from './components/Course';

function App() {

  return (
  <div>
    <Container>
      <Row>
        <Col>
        <Accordian defaultActiveKey="0">
          <Course courseName={'AP Seminar'} courseDescription={'Get Started with AP Seminar'} />
        </Accordian>
        </Col>
      </Row>
    </Container>
  </div>
  );
}

export default App;
