import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import emailjs from "@emailjs/browser";

const Contact = ({ header }) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showStatus, setShowStatus] = useState({
    show: false,
    type: "",
    msg: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setLoading(true);

    // THAY THẾ CÁC THÔNG SỐ NÀY TỪ DASHBOARD EMAILJS CỦA BẠN
    const SERVICE_ID = "YOUR_SERVICE_ID";
    const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
    const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY).then(
      (result) => {
        setLoading(false);
        setShowStatus({
          show: true,
          type: "success",
          msg: "Thank you! Your message has been sent successfully. 🚀",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        formRef.current.reset();
      },
      (error) => {
        setLoading(false);
        setShowStatus({
          show: true,
          type: "danger",
          msg: "Oops! Something went wrong. Please try again later. 😅",
        });
        console.error("EmailJS Error:", error.text);
      },
    );

    // Tự động ẩn thông báo sau 5 giây
    setTimeout(() => setShowStatus({ ...showStatus, show: false }), 5000);
  };

  return (
    <div className="contact-section">
      <Container>
        <motion.h2
          className="header"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {header || "Get In Touch"}
        </motion.h2>

        <Row className="mt-5 align-items-stretch">
          <Col lg={5} className="mb-5">
            <motion.div
              className="contact-info-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ height: "100%" }}
            >
              <h3 className="mb-4">Let's Connect</h3>
              <p className="mb-5" style={{ opacity: 0.8 }}>
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your visions. Feel free to reach
                out!
              </p>

              <div className="info-item mb-4">
                <div className="icon">📍</div>
                <div>
                  <h6 className="mb-1">Location</h6>
                  <p className="mb-0 text-muted">Ho Chi Minh City, Vietnam</p>
                </div>
              </div>

              <div className="info-item">
                <div className="icon">📧</div>
                <div>
                  <h6 className="mb-1">Email</h6>
                  <p className="mb-0 text-muted">phucphuc2004444@gmail.com</p>
                </div>
              </div>
            </motion.div>
          </Col>

          <Col lg={7}>
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {showStatus.show && (
                <Alert
                  variant={showStatus.type}
                  onClose={() => setShowStatus({ ...showStatus, show: false })}
                  dismissible
                >
                  {showStatus.msg}
                </Alert>
              )}

              <Form ref={formRef} onSubmit={handleSendMessage}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        name="name"
                        value={formData.name}
                        type="text"
                        placeholder="Full Name"
                        className="modern-input"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Control
                        name="email"
                        value={formData.email}
                        type="email"
                        placeholder="Email Address"
                        className="modern-input"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Control
                    name="subject"
                    value={formData.subject}
                    type="text"
                    placeholder="Subject"
                    className="modern-input"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    name="message"
                    value={formData.message}
                    as="textarea"
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="modern-input"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn-modern w-100 py-3"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message 🚀"}
                  </Button>
                </motion.div>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
