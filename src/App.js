import React from 'react';

import Accordian from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Course from './components/Course';

function App() {

  const courseInfo = [
    {
      courseName: 'AP Seminar',
      courseDescription: 'Develop and practice the skills in research, collaboration, and communication that you’ll need in any academic discipline. You’ll investigate topics in a variety of subject areas, write research-based essays, and design and give presentations both individually and as part of a team.',
    }
  ]

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
