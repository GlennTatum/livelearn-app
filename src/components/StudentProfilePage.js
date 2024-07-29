import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

import styles from "./StudentProfilePage.module.css";
import ExamBuilder from "./exambuilder";
import StudentLab from "./StudentLab";
import StudentContentHelper from "./StudentAssist";
import { ProgressBar } from "react-bootstrap";

export default function StudentProfilePage() {
  const now = 60;
  return (
    <>
      <div className={styles.topcontainer}>
        <Row>
          <Col md={2} className={styles.column}>
            <div className={styles.box}>
              <div className={styles.flexcontainer}>
                <Image
                  src="https://i.imgur.com/Y1EMauD.png"
                  roundedCircle
                  alt="profile picture"
                  className={styles.profilepicture}
                />
              </div>
              <div className={styles.flexcontainer}>
                <p>Student User</p>
              </div>
              <div className={styles.flexcontainer}>
                <p>Computer Science</p>
              </div>
              <div className={styles.flexcontainer}>
                <p>Level 1: Beginner</p>
              </div>
              <div
                style={{
                  display: "block",
                  width: 260,
                  padding: 5,
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              >
                <ProgressBar
                  now={now}
                  label={`${now}%`}
                  variant="length"
                  style={{ justifySelf: "center", justifyItems: "center" }}
                />
              </div>
            </div>
          </Col>
          <Col lg={1} className={styles.gutter}></Col>
          <Col className={styles.column}>
            <div className={styles.box}>
              <div className={styles.flexcontainer}>
                <h2>
                  <b>LiveLearn.ai Chat</b>
                </h2>
              </div>
              <div>
                <StudentContentHelper />
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <br></br>
        </div>
        <Row>
          <Col className={styles.column}>
            <div className={styles.box}>
              <div className={styles.flexcontainer}>
                <h2>
                  <b>Exam Builder</b>
                </h2>
              </div>
              <div>
                <ExamBuilder />
              </div>
            </div>
          </Col>
        </Row>
        <div>
          <br></br>
        </div>
        <Row>
          <Col className={styles.column}>
            <div className={styles.box}>
              <div className={styles.flexcontainer}>
                <h2>
                  <b>Code</b>
                </h2>
              </div>
              <div>
                <StudentLab />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
