import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";

import styles from './StudentProfilePage.module.css';

export default function StudentProfilePage() {

    return (
        <>
            <div className={styles.topcontainer}>
                <Row>
                    <Col md={2} className={styles.column}>
                        <div className={styles.box}>
                            <div className={styles.flexcontainer}>
                                <Image src="https://i.imgur.com/Y1EMauD.png" roundedCircle alt="profile picture" className={styles.profilepicture} />
                            </div>
                            <div className={styles.flexcontainer}>
                                <p>Glenn Tatum</p>
                            </div>
                            <div className={styles.flexcontainer}>
                                <p>Computer Science</p>
                            </div>
                        </div>
                    </Col>
                    <Col lg={1} className={styles.gutter}></Col>
                    <Col className={styles.column}>
                        <div className={styles.box}>
                            <div className={styles.flexcontainer}>
                                <h2>LiveLearn.ai Chat</h2>
                            </div>
                            <div className={styles.chatbox}>
                                Content
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles.column}>
                        <div className={styles.box}>
                            <div className={styles.flexcontainer}>
                                <h2>Exam Curator</h2>
                            </div>
                            <div>
                                Content
                            </div>
                        </div>
                    </Col>
                    <Col md={1} className={styles.gutter}></Col>
                    <Col md={4} className={styles.column}>
                        <div className={styles.box}>
                            <div className={styles.flexcontainer}>
                                <h2>Mastery</h2>
                            </div>
                            <div>
                                Content
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                <Col className={styles.column}>
                        <div className={styles.box}>
                            <div className={styles.flexcontainer}>
                                <h2>Code</h2>
                            </div>
                            <div>
                                Content
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>

    )
}