import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './liveLearnLogo.png';
import styles from './StudentHome.module.css';
import dashboard from './dashboard.webp';
import studyResource from './studyResource.webp';
import groupStudy from './groupStudy.webp';

const StudentHome = () => {
  return (
    <div className={styles.studentHomeContainer}>
      <header className={styles.header}>
        <img src={logo} alt="LiveLearn Logo" className="logo" />
        <h1>Welcome, Student!</h1>
        <p>Explore your learning environment and make the most of your educational journey.</p>
      </header>
      <main className={styles.mainContent}>
        <Carousel>
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={dashboard}
              alt="Student Dashboard"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3>Your Dashboard</h3>
              <p>Access all your courses, assignments, and grades from one place.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={studyResource}
              alt="Study Resources"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3>Study Resources</h3>
              <p>Enhance your learning with a variety of educational tools and materials.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className={`d-block w-100 ${styles.carouselImage}`}
              src={groupStudy}
              alt="Group Study"
            />
            <Carousel.Caption className={styles.carouselCaption}>
              <h3>Group Study Sessions</h3>
              <p>Collaborate and learn together with your peers in interactive sessions.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <section className={styles.features}>
          <div className={styles.feature}>
            <h3>Upcoming Events</h3>
            <p>Stay updated with the latest school events, seminars, and workshops.</p>
            <button className={styles.buttonFeature}>Learn More</button>
          </div>
          <div className={styles.feature}>
            <h3>Recent Achievements</h3>
            <p>Celebrate your milestones and review feedback on your recent submissions.</p>
            <button className={styles.buttonFeature}>Learn More</button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 LiveLearn. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentHome;
