import React, { useEffect, useRef, useState } from "react";

/*
  Sri Ramdutha Constructions - Single-file React app (code/react)
  - Professional dark + gold architectural portfolio theme
  - Multi-page (client-side) with smooth page transitions and internal scrolling
  - Sections: Home, Projects, Services, Careers, About, Contact/Appointment
  - Forms are simulated client-side (replace with real APIs later)
  - Replace image URLs with your own assets or keep the placeholders
  - Logo loaded from /mnt/data/logo.jpeg (already uploaded in canvas)
*/

export default function App() {
  const [route, setRoute] = useState("/home");
  const [animating, setAnimating] = useState(false);

  // Refs for smooth internal scrolling within a page
  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const servicesRef = useRef(null);
  const careersRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Inject CSS for the app (keeps single-file distribution)
    const css = `
    :root{--bg:#0b0f14;--card:#0f1720;--muted:#9aa4ae;--accent:#c89b2c;--glass:rgba(255,255,255,0.03)}
    *{box-sizing:border-box}
    html,body,#root{height:100%}
    body{margin:0;font-family:Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background:linear-gradient(180deg,var(--bg),#071018);color:#e6eef6}
    .site{min-height:100vh;display:flex;flex-direction:column}
    .topbar{position:fixed;left:0;right:0;top:0;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;background:linear-gradient(180deg, rgba(10,14,20,0.65), rgba(10,14,20,0.45));backdrop-filter: blur(6px);z-index:60;border-bottom:1px solid rgba(255,255,255,0.03)}
    .brand{display:flex;align-items:center;gap:14px}
    .brand img{width:64px;height:64px;object-fit:contain;border-radius:8px;background:var(--glass);padding:6px}
    .brand h1{font-size:18px;margin:0;font-weight:600;color:var(--accent);letter-spacing:0.6px}
    .brand p{margin:0;font-size:12px;color:var(--muted)}
    .nav{display:flex;gap:16px;align-items:center}
    .nav button{background:transparent;border:none;color:var(--muted);padding:8px 12px;border-radius:8px;cursor:pointer;font-size:14px}
    .nav button:hover{color:#fff;background:rgba(255,255,255,0.02)}
    .cta{background:linear-gradient(90deg,var(--accent),#b07e1d);padding:10px 14px;border-radius:10px;color:#051018;font-weight:600;border:none;cursor:pointer}

    /* Page container with smooth transitions */
    .page-wrap{margin-top:86px;flex:1;display:flex;flex-direction:column;gap:48px;padding:32px 48px}
    .page{min-height:calc(100vh - 170px);background:linear-gradient(180deg, rgba(255,255,255,0.01), transparent);border-radius:14px;padding:28px;box-shadow:0 8px 30px rgba(2,6,23,0.6);overflow:auto;transition:transform 450ms ease, opacity 450ms ease}
    .page.enter{transform:translateY(12px);opacity:0}
    .page.enter-active{transform:translateY(0);opacity:1}

    /* HERO */
    .hero{display:grid;grid-template-columns:1fr 520px;gap:36px;align-items:center}
    .hero-left{padding-right:12px}
    .kicker{display:inline-block;padding:6px 12px;background:rgba(200,155,44,0.12);color:var(--accent);border-radius:999px;font-weight:600;font-size:13px}
    .headline{font-size:44px;line-height:1.02;margin:18px 0 8px;color:#ffffff}
    .lead{color:var(--muted);font-size:16px;max-width:70%}
    .bullets{margin-top:22px;display:flex;gap:12px;flex-wrap:wrap}
    .bullet{background:rgba(255,255,255,0.02);padding:10px 12px;border-radius:10px;font-size:13px;color:var(--muted)}

    .hero-right{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;padding:14px;display:flex;flex-direction:column;gap:12px}
    .hero-right img{width:100%;height:360px;object-fit:cover;border-radius:10px}
    .form-card{background:linear-gradient(180deg, rgba(5,8,12,0.4), rgba(255,255,255,0.02));padding:12px;border-radius:10px}

    /* Services grid */
    .services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-top:18px}
    .service{background:linear-gradient(180deg, rgba(255,255,255,0.015), transparent);padding:18px;border-radius:12px;border:1px solid rgba(255,255,255,0.03)}
    .service h3{margin:0;color:#fff}
    .service p{margin-top:8px;color:var(--muted);font-size:14px}

    /* Projects masonry */
    .projects-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
    .project-card{height:220px;border-radius:12px;overflow:hidden;position:relative}
    .project-card img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 350ms ease}
    .project-card:hover img{transform:scale(1.05)}
    .project-meta{position:absolute;left:12px;bottom:12px;background:linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25));padding:8px 10px;border-radius:8px;color:#fff;font-weight:600;font-size:13px}

    /* Careers */
    .careers-list{display:flex;flex-direction:column;gap:12px}
    .job{display:flex;justify-content:space-between;align-items:center;padding:14px;border-radius:10px;background:rgba(255,255,255,0.01);border:1px dashed rgba(255,255,255,0.03)}
    .job h4{margin:0}
    .job small{color:var(--muted)}

    /* About */
    .about-grid{display:grid;grid-template-columns:360px 1fr;gap:24px}
    .md-photo{width:100%;height:320px;object-fit:cover;border-radius:12px}

    /* Contact */
    .contact-grid{display:grid;grid-template-columns:1fr 420px;gap:24px}
    .contact-card{padding:18px;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.01), transparent)}
    label{display:block;font-size:13px;margin-bottom:6px;color:var(--muted)}
    input,select,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:transparent;color:#e6eef6}
    .submit{margin-top:12px}

    .footer{padding:30px 40px;margin-top:24px;border-top:1px solid rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;color:var(--muted)}

    /* Responsiveness */
    @media (max-width:980px){
      .hero{grid-template-columns:1fr;}
      .projects-grid{grid-template-columns:repeat(2,1fr)}
      .about-grid{grid-template-columns:1fr}
      .contact-grid{grid-template-columns:1fr}
    }
    @media (max-width:640px){
      .nav{display:none}
      .page-wrap{padding:18px}
    }
    `;

    const styleTag = document.createElement("style");
    styleTag.id = "sri-ramdutha-styles";
    styleTag.appendChild(document.createTextNode(css));
    document.head.appendChild(styleTag);

    return () => {
      const s = document.getElementById("sri-ramdutha-styles");
      if (s) s.remove();
    };
  }, []);

  // handle navigation with small transition lock
  function navigate(to) {
    if (to === route) return;
    setAnimating(true);
    setTimeout(() => {
      setRoute(to);
      setAnimating(false);
      // scroll to top of new page container
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 260);
  }

  // Simulated form handlers
  const [appointment, setAppointment] = useState({ name: "", phone: "", location: "", service: "" });
  const [apptMsg, setApptMsg] = useState(null);

  function submitAppointment(e) {
    e && e.preventDefault();
    if (!appointment.name || !appointment.phone || !appointment.location) {
      setApptMsg({ type: "err", text: "Please fill name, phone and location." });
      return;
    }
    setApptMsg({ type: "loading", text: "Submitting..." });
    setTimeout(() => {
      setApptMsg({ type: "ok", text: "Thanks! Our team will call within 12 hours." });
      setAppointment({ name: "", phone: "", location: "", service: "" });
    }, 900);
  }

  const [resumeMsg, setResumeMsg] = useState(null);
  function submitResume(form) {
    if (!form.name || !form.phone || !form.resumeFile) {
      setResumeMsg({ type: "err", text: "Please provide name, phone and attach resume." });
      return;
    }
    setResumeMsg({ type: "loading", text: "Uploading..." });
    setTimeout(() => setResumeMsg({ type: "ok", text: "Application received. We'll reach out if shortlisted." }), 900);
  }

  const renderNav = () => (
    <div className="topbar">
      <div className="brand" style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
        <img src="/logo.jpeg" alt="logo" />
        <div>
          <h1>Sri Ramdutha Constructions</h1>
          <p>Precision • Integrity • Tomorrow's Homes</p>
        </div>
      </div>

      <div className="nav">
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/projects")}>Projects</button>
        <button onClick={() => navigate("/services")}>Services</button>
        <button onClick={() => navigate("/careers")}>Careers</button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/contact")} className="cta">Book Appointment</button>
      </div>
    </div>
  );

  return (
    <div className="site">
      {renderNav()}

      <div className="page-wrap">
        {/* HOME */}
        {route === "/home" && (
          <article className={`page ${animating ? "enter" : "enter-active"}`} ref={homeRef}>
            <div className="hero">
              <div className="hero-left">
                <span className="kicker">Since 2021 • Tirupati</span>
                <h2 className="headline">Dream..? Start with us</h2>
                <p className="lead">We partner with homeowners and developers to translate ideas into beautifully executed spaces. Every rupee you invest is managed with care, transparent processes and disciplined supervision — giving you both peace of mind and lasting value.</p>

                <div className="bullets">
                  <div className="bullet">End-to-end project delivery</div>
                  <div className="bullet">Transparent budgets & milestone billing</div>
                  <div className="bullet">Experienced site supervision</div>
                  <div className="bullet">Pan Andhra & Telangana coverage</div>
                </div>

                <div style={{ marginTop: 26, display: "flex", gap: 12 }}>
                  <button className="cta" onClick={() => navigate("/projects")}>View Projects</button>
                  <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.06)", color: "var(--muted)", padding: "10px 12px", borderRadius: 10 }} onClick={() => navigate("/services")}>Our Services</button>
                </div>

                <div style={{ marginTop: 22, color: "var(--muted)" }}>
                  <strong>Base:</strong> Tirupati — Services across Andhra Pradesh & Telangana
                </div>
              </div>

              <aside className="hero-right">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="futuristic villa" />

                <div className="form-card">
                  <strong style={{ display: "block", color: "#fff" }}>Request a callback (within 12 hours)</strong>
                  <form onSubmit={submitAppointment} style={{ display: "grid", gap: 8, marginTop: 10 }}>
                    <input placeholder="Name" value={appointment.name} onChange={(e) => setAppointment({ ...appointment, name: e.target.value })} />
                    <input placeholder="Phone" value={appointment.phone} onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })} />
                    <input placeholder="Location" value={appointment.location} onChange={(e) => setAppointment({ ...appointment, location: e.target.value })} />
                    <select value={appointment.service} onChange={(e) => setAppointment({ ...appointment, service: e.target.value })} style={{ background: '#0f1720', color: '#e6eef6'}}>
                      <option value="">-- Select Service (optional) --</option>
                      <option>Residential Houses & Villas</option>
                      <option>Residential Apartments</option>
                      <option>Shops & Offices</option>
                      <option>Other Services</option>
                    </select>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button type="submit" className="cta">Request Callback</button>
                      <button type="button" style={{ background: "transparent", color: "var(--muted)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 12px" }} onClick={() => setAppointment({ name: "", phone: "", location: "", service: "" })}>Clear</button>
                    </div>

                    {apptMsg && <p style={{ fontSize: 13, color: apptMsg.type === "err" ? "#ffb4b4" : "#bfe7c6" }}>{apptMsg.text}</p>}
                  </form>
                </div>
              </aside>
            </div>

            <section style={{ marginTop: 28 }}>
              <h3 style={{ margin: 0 }}>Why choose Sri Ramdutha</h3>
              <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 980 }}>Our commitment is simple — deliver thoughtfully designed, robustly constructed spaces where quality and value meet. From foundation design to final finishes, we emphasise clear communication, ethical procurement and dependable timelines.</p>

              <div style={{ display: "flex", gap: 16, marginTop: 18, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 10, minWidth: 220 }}>
                  <strong>Design partnership</strong>
                  <div style={{ color: "var(--muted)", marginTop: 8 }}>Work with architects & designers to shape a home that reflects your lifestyle and budget.</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 10, minWidth: 220 }}>
                  <strong>Quality control</strong>
                  <div style={{ color: "var(--muted)", marginTop: 8 }}>Material testing, skilled trades, and site supervision at every milestone.</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: 16, borderRadius: 10, minWidth: 220 }}>
                  <strong>Transparent billing</strong>
                  <div style={{ color: "var(--muted)", marginTop: 8 }}>Milestone-based invoicing and clear procurement documentation.</div>
                </div>
              </div>
            </section>
          </article>
        )}

        {/* PROJECTS */}
        {route === "/projects" && (
          <article className={`page ${animating ? "enter" : "enter-active"}`} ref={projectsRef}>
            <h2>Projects — Portfolio</h2>
            <p style={{ color: "var(--muted)" }}>A curated selection of residential and commercial projects demonstrating our workmanship and attention to detail. (Placeholder gallery — you can replace images later.)</p>

            <div className="projects-grid" style={{ marginTop: 18 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div className="project-card" key={i} onClick={() => alert("Replace this with project detail modal — project " + i)}>
                  <img src="/proj1.jpg" alt="Project 1" />
                  <div className="project-meta">Project #{i} • Residential</div>
                </div>
              ))}
            </div>

            <section style={{ marginTop: 24 }}>
              <h3>Case Study — Modern Villa, Tirupati</h3>
              <p style={{ color: "var(--muted)", marginTop: 8 }}>An end-to-end villa project where we handled design coordination, structural oversight, and finishes. Challenges included sloping plots and custom facade detailing. Outcome — delivered on schedule with client satisfaction and minimal change orders.</p>

              <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                <img alt="villa" src="https://images.unsplash.com/photo-1542317854-3f9a5f9a6f2f?auto=format&fit=crop&w=800&q=60" style={{ width: 360, height: 220, objectFit: "cover", borderRadius: 10 }} />
                <img alt="villa" src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60" style={{ width: 360, height: 220, objectFit: "cover", borderRadius: 10 }} />
              </div>

              <div style={{ marginTop: 18 }}>
                <strong>Project highlights</strong>
                <ul style={{ color: "var(--muted)" }}>
                  <li>Custom facade with weather-resistant finish</li>
                  <li>Rainwater harvesting and efficient plumbing</li>
                  <li>Energy-efficient lighting and windows</li>
                  <li>4-phase project schedule with clear milestones</li>
                </ul>
              </div>
            </section>
          </article>
        )}

        {/* SERVICES */}
        {route === "/services" && (
          <article className={`page ${animating ? "enter" : "enter-active"}`} ref={servicesRef}>
            <h2>Our Services</h2>
            <p style={{ color: "var(--muted)" }}>Full-spectrum construction services — design, construction, interiors and post-handover support.</p>

            <div className="services-grid">
              {[
                {
                  title: "Residential Houses & Villas",
                  desc: "Custom villas and houses with end-to-end project delivery: foundation, structure, finishes and landscaping."
                },
                { title: "Residential Apartments", desc: "Apartment construction for small-to-medium developers with efficient site coordination." },
                { title: "Shops & Offices", desc: "Commercial fit-outs and small commercial buildings with a focus on durability and function." },
                { title: "Renovation & Restoration", desc: "Upgrades and retrofits — structural strengthening, finishes and MEP improvements." },
                { title: "Project Management", desc: "Detailed project scheduling, procurement management and quality assurance." },
                { title: "Other Services", desc: "Consultation, small civil works, interior detailing and landscaping packages." }
              ].map((s, idx) => (
                <div className="service" key={idx}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                    <button className="cta" onClick={() => { setAppointment({ ...appointment, service: s.title }); navigate("/contact"); }}>Request Callback</button>
                    <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "var(--muted)", padding: "8px 10px", borderRadius: 8 }} onClick={() => alert(s.title + " — detailed scope can be added here.")}>Learn more</button>
                  </div>
                </div>
              ))}
            </div>

            <section style={{ marginTop: 24 }}>
              <h3>How we price</h3>
              <p style={{ color: "var(--muted)" }}>We offer transparent milestone billing. Major material costs are listed separately and we provide alternate vendors for significant items so clients can choose the best fit for budget and quality.</p>

              <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ minWidth: 220, background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 10 }}>
                  <strong>Pre-construction</strong>
                  <div style={{ color: "var(--muted)", marginTop: 8 }}>Feasibility, preliminary costing and schedule.</div>
                </div>
                <div style={{ minWidth: 220, background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 10 }}>
                  <strong>Construction</strong>
                  <div style={{ color: "var(--muted)", marginTop: 8 }}>Execution, supervision and quality checks.</div>
                </div>
                <div style={{ minWidth: 220, background: "rgba(255,255,255,0.02)", padding: 14, borderRadius: 10 }}>
                  <strong>Handover</strong>
                  <div style={{ color: "var(--muted)", marginTop: 8 }}>Final inspection, as-built drawings and warranty support.</div>
                </div>
              </div>
            </section>
          </article>
        )}

        {/* CAREERS */}
        {route === "/careers" && (
          <article className={`page ${animating ? "enter" : "enter-active"}`} ref={careersRef}>
            <h2>Careers</h2>
            <p style={{ color: "var(--muted)" }}>We look for people who are hardworking, skilled and aligned with our values of transparency and quality. Check this page regularly for openings.</p>

            {/* For now, keep no openings — show general application */}
            <div style={{ marginTop: 18 }}>
              <div className="careers-list">
                <div className="job">
                  <div>
                    <h4>No openings available right now</h4>
                    <small>We will update this section when positions open. Meanwhile you may submit a general application below.</small>
                  </div>
                  <div>
                    <button className="cta" onClick={() => navigate("/contact")} style={{ fontSize: 13 }}>Send CV</button>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <h3>General Application</h3>
                <p style={{ color: "var(--muted)" }}>Submit your details and resume for future opportunities.</p>
                <GeneralApplication onSubmit={submitResume} msg={resumeMsg} />
              </div>
            </div>
          </article>
        )}

        {/* ABOUT */}
        {route === "/about" && (
          <article className={`page ${animating ? "enter" : "enter-active"}`} ref={aboutRef}>
            <h2>About Sri Ramdutha Constructions Pvt. Ltd.</h2>
            <div className="about-grid" style={{ marginTop: 12 }}>
              <div>
                <img src="/md.jpeg" alt="MD" className="md-photo" />
              </div>

              <div>
                <p style={{ color: "var(--muted)" }}>Founded in 2021, Sri Ramdutha Constructions brings together hands-on project management and skilled trades to deliver residential and commercial projects across Andhra Pradesh and Telangana. With three directors guiding the company and a focus on craftsmanship, we aim to raise the standards of regional construction through better planning and accountability.</p>

                <div style={{ marginTop: 12 }}>
                  <h4>Leadership</h4>
                  <p style={{ color: "var(--muted)" }}><strong>Patibandla Venkateswarlu</strong> — Managing Director. Patibandla brings practical experience in site supervision, project scheduling and contractor coordination. There is space here to add the official photo and a short bio highlighting past projects and qualifications.</p>
                </div>

                <div style={{ marginTop: 14 }}>
                  <h4>Office & Contact</h4>
                  <p style={{ color: "var(--muted)" }}>5-85 Upparapalli main road, Tirupati Rural</p>
                  <p style={{ color: "var(--muted)" }}>Phone: +91 9493420909 • Email: sriramduthaconstructions@gmail.com</p>
                </div>
              </div>
            </div>

            <section style={{ marginTop: 18 }}>
              <h3>Our Values</h3>
              <ol style={{ color: "var(--muted)", marginTop: 8 }}>
                <li>Client-first approach — clear communication and honesty</li>
                <li>Quality driven — insistence on tested materials and skilled trades</li>
                <li>Timely delivery — realistic schedules and accountability</li>
              </ol>
            </section>
          </article>
        )}

        {/* CONTACT / APPOINTMENT */}
        {route === "/contact" && (
          <article className={`page ${animating ? "enter" : "enter-active"}`} ref={contactRef}>
            <h2>Book Appointment & Contact</h2>
            <div className="contact-grid" style={{ marginTop: 12 }}>
              <div className="contact-card">
                <h4>Request a callback</h4>
                <p style={{ color: "var(--muted)" }}>Fill the form and our team will call within 12 hours.</p>
                <form onSubmit={submitAppointment} style={{ marginTop: 12, display: "grid", gap: 10 }}>
                  <label>Name</label>
                  <input value={appointment.name} onChange={(e) => setAppointment({ ...appointment, name: e.target.value })} />
                  <label>Phone</label>
                  <input value={appointment.phone} onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })} />
                  <label>Location</label>
                  <input value={appointment.location} onChange={(e) => setAppointment({ ...appointment, location: e.target.value })} />
                  <label>Service (optional)</label>
                  <select value={appointment.service} onChange={(e) => setAppointment({ ...appointment, service: e.target.value })}>
                    <option value="">Select service</option>
                    <option>Residential Houses & Villas</option>
                    <option>Residential Apartments</option>
                    <option>Shops & Offices</option>
                    <option>Other Services</option>
                  </select>
                  <div className="submit" style={{ display: "flex", gap: 8 }}>
                    <button type="submit" className="cta">Request Callback</button>
                    <button type="button" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "var(--muted)", padding: "10px 12px", borderRadius: 8 }} onClick={() => setAppointment({ name: "", phone: "", location: "", service: "" })}>Reset</button>
                  </div>

                  {apptMsg && <p style={{ color: apptMsg.type === "err" ? "#ffb4b4" : "#bfe7c6" }}>{apptMsg.text}</p>}
                </form>

                <div style={{ marginTop: 18 }}>
                  <h4>Contact Details</h4>
                  <p style={{ color: "var(--muted)" }}>5-85 Upparapalli main road, Tirupati Rural</p>
                  <p style={{ color: "var(--muted)" }}>Phone: +91 9493420909</p>
                  <p style={{ color: "var(--muted)" }}>Email: sriramduthaconstructions@gmail.com</p>
                </div>
              </div>

              <div style={{ padding: 18, borderRadius: 12 }}>
                <h4>Map & Visit</h4>
                <p style={{ color: "var(--muted)" }}>Map placeholder — replace with embedded Google Maps iframe for office location when you have a domain and API key.</p>
                <div style={{ width: "100%", height: 280, background: "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>Map Placeholder</div>
              </div>
            </div>
          </article>
        )}

        <footer className="footer">
          <div>
            <strong style={{ color: "var(--accent)" }}>Sri Ramdutha Constructions Pvt. Ltd.</strong>
            <div style={{ color: "var(--muted)", marginTop: 6 }}>5-85 Upparapalli main road, Tirupati Rural • +91 9493420909</div>
          </div>
          <div style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} Sri Ramdutha Constructions. All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
}

function GeneralApplication({ onSubmit, msg }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", resumeFile: null });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      style={{ display: "grid", gap: 8, maxWidth: 560 }}
    >
      <label>Name</label>
      <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <label>Phone</label>
      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <label>Email</label>
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <label>Resume (pdf/doc)</label>
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setForm({ ...form, resumeFile: e.target.files && e.target.files[0] })} />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" className="cta">Submit Application</button>
        <button
          type="button"
          style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.04)", color: "var(--muted)", padding: "10px 12px", borderRadius: 8 }}
          onClick={() => setForm({ name: "", phone: "", email: "", resumeFile: null })}
        >
          Clear
        </button>
      </div>
      {msg && <p style={{ color: msg.type === "err" ? "#ffb4b4" : "#bfe7c6" }}>{msg.text}</p>}
    </form>
  );
}
