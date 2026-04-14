import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> certification
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech Student</h4>
                <h5>Greater Noida Institute Of Technology</h5>
              </div>
              <h3>2024 - Ongoing</h3>
            </div>
            <p>
              Currently pursuing my degree and building a strong foundation in
              Java, JavaScript, Python, HTML, CSS, backend development,
              problem solving, algorithms and data structures.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Certification</h4>
                <h5>Introduction to Data Science Job Simulation</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Completed a data science job simulation that strengthened my
              analytical thinking and practical understanding of data-driven
              workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Project Focus</h4>
                <h5>AI Interview</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built an AI-powered interview assistant that simulates technical
              interview sessions, evaluates responses, and provides real-time
              feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
