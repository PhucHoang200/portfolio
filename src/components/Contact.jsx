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

    const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        setShowStatus({
          show: true,
          type: "success",
          msg: "Message sent successfully! 🚀",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        formRef.current.reset();
      })
      .catch((err) => {
        setLoading(false);
        setShowStatus({
          show: true,
          type: "danger",
          msg: "Failed to send message. Please try again. 😅",
        });
        console.error(err);
      });

    setTimeout(() => setShowStatus({ ...showStatus, show: false }), 5000);
  };

  return (
    <div className="contact-section">
      <Container>
        <motion.h2
          className="header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {header || "Get In Touch"}
        </motion.h2>

        <Row className="mt-5 align-items-stretch">
          {/* Cột Thông tin liên lạc đã được cải tiến */}
          <Col lg={5} className="mb-5">
            <motion.div
              className="contact-info-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="info-title">Contact Information</h3>
              <p className="info-subtitle">
                Feel free to reach out for collaborations or just a friendly
                chat.
              </p>

              <div className="info-details-container">
                {/* Location Card */}
                <motion.div className="info-box" whileHover={{ scale: 1.03 }}>
                  <div className="info-icon-wrapper">📍</div>
                  <div className="info-text">
                    <span className="info-label">Location</span>
                    <span className="info-value">
                      Ho Chi Minh City, Vietnam
                    </span>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div className="info-box" whileHover={{ scale: 1.03 }}>
                  <div className="info-icon-wrapper">📧</div>
                  <div className="info-text">
                    <span className="info-label">Email</span>
                    <span className="info-value">
                      phucphuc2004444@gmail.com
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Col>

          {/* Cột Form liên hệ */}
          <Col lg={7}>
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {showStatus.show && (
                <Alert variant={showStatus.type} dismissible>
                  {showStatus.msg}
                </Alert>
              )}
              <Form ref={formRef} onSubmit={handleSendMessage}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="contact-label">
                        Full Name
                      </Form.Label>
                      <Form.Control
                        name="name"
                        value={formData.name}
                        type="text"
                        placeholder="Your Name"
                        className="modern-input"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label className="contact-label">
                        Email Address
                      </Form.Label>
                      <Form.Control
                        name="email"
                        value={formData.email}
                        type="email"
                        placeholder="example@gmail.com"
                        className="modern-input"
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-4">
                  <Form.Label className="contact-label">Subject</Form.Label>
                  <Form.Control
                    name="subject"
                    value={formData.subject}
                    type="text"
                    placeholder="Project Discussion"
                    className="modern-input"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="contact-label">Message</Form.Label>
                  <Form.Control
                    name="message"
                    value={formData.message}
                    as="textarea"
                    rows={4}
                    placeholder="Your Message..."
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
