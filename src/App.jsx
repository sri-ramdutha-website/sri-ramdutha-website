import React, { useState } from "react";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.jpeg" alt="logo" />
          <span>Sri Ramdutha Constructions</span>
        </div>
        <ul>
          <li onClick={() => setActiveSection("home")}>Home</li>
          <li onClick={() => setActiveSection("about")}>About</li>
          <li onClick={() => setActiveSection("projects")}>Projects</li>
          <li onClick={() => setActiveSection("contact")}>Contact</li>
        </ul>
      </nav>

      {/* Sections */}
      <main>
        {/* Home Section */}
        {activeSection === "home" && (
          <section className="home">
            <div className="hero-left">
              <h1>Building Your Dream with Precision</h1>
              <p>
                At SRI RAMDUTHA, we specialize in delivering top-notch
                construction services tailored to your needs. Our commitment to
                quality and innovation ensures that your projects are executed
                with precision and excellence.
              </p>
            </div>
            <div className="hero-right">
              <img src="/villa.jpg" alt="villa" />
            </div>
          </section>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <section className="about">
            <h2>About Us</h2>
            <p>
              We are a leading construction company with a mission to turn your
              vision into reality. Our team ensures every project is completed
              with care, precision, and durability. With decades of experience,
              Sri Ramdutha Constructions is trusted for quality and excellence.
            </p>
            <img src="/director.jpg" alt="MD" className="md-photo" />
          </section>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <section className="projects">
            <h2>Our Projects</h2>
            <div className="projects-grid" style={{ marginTop: 18 }}>
              <div className="project-card">
                <img src="/proj1.jpg" alt="Project 1" />
                <div className="project-meta">Project 1 • Residential</div>
              </div>

              <div className="project-card">
                <img src="/proj2.jpg" alt="Project 2" />
                <div className="project-meta">Project 2 • Commercial</div>
              </div>

              <div className="project-card">
                <img src="/proj3.jpg" alt="Project 3" />
                <div className="project-meta">Project 3 • Villa</div>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {activeSection === "contact" && (
          <section className="contact">
            <h2>Request a Call Back</h2>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted! (You can connect this to backend/email)");
              }}
            >
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" required />
              <select>
                <option value="">Select Service (optional)</option>
                <option>Residential Construction</option>
                <option>Commercial Projects</option>
                <option>Renovation</option>
                <option>Interiors</option>
              </select>
              <textarea placeholder="Message"></textarea>
              <button type="submit">Submit</button>
            </form>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
