import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./liveLearnLogo.png";
import { FaRobot } from "react-icons/fa";
import styles from "./TeacherHome.module.css";
import aiAssisted from "./AI-Assisted.webp";
import realtimeAnalytics from "./realtimeAnalytics.webp";
import feedback from "./feedback.webp";

const TeacherHome = () => {
  return (
    <div className={styles.teacherHomeContainer}>
      <header className={styles.header}>
        <img src={logo} alt="LiveLearn Logo" className="logo" />
        <h1>Welcome to LiveLearn</h1>
      </header>
      <main className={styles.mainContent}>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`} // Apply the carouselImage class from CSS
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={aiAssisted}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>AI-Assisted Planning</h3>
              <p>
                Create dynamic lesson plans that adapt to your students' needs.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`} // Ensure consistent application of styles
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={realtimeAnalytics}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Real-Time Analytics</h3>
              <p>
                Get real-time insights to adjust your teaching strategies on the
                fly.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
          <Carousel.Item interval={1000}>
            {" "}
            {/* Maintains the 3-second interval here too */}
            <img
              style={{ height: "1000px", width: "1400px" }}
              className="d-block"
              src={feedback}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Automated Feedback</h3>
              <p>
                Provide instant feedback on assignments with our AI algorithms.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h2>Empowering Teachers with AI</h2>
        <p>
          Harness the power of artificial intelligence to personalize learning
          experiences, automate grading, and gain insights into student
          performance.
        </p>
        <div className={styles.features}>
          <div className={styles.feature}>
            <FaRobot size={50} />
            <h3>AI-Assisted Planning</h3>
            <p>
              Create dynamic lesson plans that adapt to your students' needs.
            </p>
          </div>
          <div className={styles.feature}>
            <FaRobot size={50} />
            <h3>Real-Time Analytics</h3>
            <p>
              Get real-time insights to adjust your teaching strategies on the
              fly.
            </p>
          </div>
          <div className={styles.feature}>
            <FaRobot size={50} />
            <h3>Automated Feedback</h3>
            <p>
              Provide instant feedback on assignments with our AI algorithms.
            </p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 LiveLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeacherHome;
