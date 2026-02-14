import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }
    
    setIsLoading(true);
    setStatus('');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '52e8f707-bc5a-46d6-a46d-70fa6df39a96',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Email sent successfully:', result);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 4000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-premium">
      {/* Ambient Background */}
      <div className="contact-ambient">
        <div className="ambient-gradient-contact"></div>
        <div className="ambient-grain-contact"></div>
      </div>

      <div className="contact-container-premium">
        {/* Section Title */}
        <motion.h2 
          className="contact-title-premium"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          CONTACT
        </motion.h2>

        {/* Two Column Layout */}
        <div className="contact-grid">
          {/* Left Side - Personal Contact Block */}
          <motion.div 
            className="contact-info-premium"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="contact-invite">
              Have an idea, opportunity, or question? Let's connect.
            </p>

            <div className="contact-details-premium">
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.33334 3.33334H16.6667C17.5833 3.33334 18.3333 4.08334 18.3333 5.00001V15C18.3333 15.9167 17.5833 16.6667 16.6667 16.6667H3.33334C2.41668 16.6667 1.66668 15.9167 1.66668 15V5.00001C1.66668 4.08334 2.41668 3.33334 3.33334 3.33334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.3333 5L10 10.8333L1.66666 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="detail-content">
                  <span className="detail-label">Email</span>
                  <a href="mailto:pujarveeresh7@gmail.com" className="detail-value">
                    pujarveeresh7@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1112 17.2006 18.1856C16.9808 18.26 16.7478 18.2876 16.5167 18.2667C13.9523 17.988 11.489 17.1118 9.32499 15.7083C7.31151 14.4289 5.60443 12.7218 4.32499 10.7083C2.91663 8.53435 2.04019 6.05916 1.76666 3.48334C1.74583 3.25294 1.77321 3.02069 1.84707 2.80139C1.92092 2.58209 2.03963 2.38061 2.19562 2.2098C2.35162 2.039 2.54149 1.90247 2.75314 1.80928C2.9648 1.7161 3.1936 1.66768 3.42499 1.66668H5.92499C6.32953 1.66269 6.72148 1.80593 7.028 2.06965C7.33452 2.33336 7.53155 2.69958 7.58332 3.10001C7.68011 3.90006 7.86283 4.68562 8.12499 5.44168C8.2402 5.74998 8.26189 6.08476 8.18721 6.40447C8.11253 6.72417 7.94453 7.01526 7.70416 7.24168L6.64166 8.30418C7.8116 10.3766 9.6226 12.1876 11.695 13.3575L12.7575 12.295C12.9839 12.0547 13.275 11.8867 13.5947 11.812C13.9144 11.7373 14.2492 11.759 14.5575 11.8742C15.3136 12.1363 16.0991 12.3191 16.8992 12.4158C17.3048 12.4682 17.6752 12.6694 17.9394 12.9818C18.2036 13.2942 18.3435 13.6928 18.3333 14.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="detail-content">
                  <span className="detail-label">Phone</span>
                  <a href="tel:+917483112442" className="detail-value">
                    +91 7483112442 / 7483512442
                  </a>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.form 
            className="contact-form-premium"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="form-field">
              <motion.input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className={focusedField === 'name' || formData.name ? 'has-value' : ''}
                animate={{
                  scale: focusedField === 'name' ? 1.01 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <label className={focusedField === 'name' || formData.name ? 'active' : ''}>
                Name
              </label>
            </div>

            <div className="form-field">
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className={focusedField === 'email' || formData.email ? 'has-value' : ''}
                animate={{
                  scale: focusedField === 'email' ? 1.01 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <label className={focusedField === 'email' || formData.email ? 'active' : ''}>
                Email
              </label>
            </div>

            <div className="form-field">
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows="5"
                className={focusedField === 'message' || formData.message ? 'has-value' : ''}
                animate={{
                  scale: focusedField === 'message' ? 1.01 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <label className={focusedField === 'message' || formData.message ? 'active' : ''}>
                Message
              </label>
            </div>

            <motion.button
              type="submit"
              className="submit-btn-premium"
              disabled={isLoading || !formData.name || !formData.email || !formData.message}
              whileHover={(!isLoading && formData.name && formData.email && formData.message) ? { 
                scale: 1.02,
                y: -2
              } : {}}
              whileTap={(!isLoading && formData.name && formData.email && formData.message) ? { 
                scale: 0.97 
              } : {}}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  className="success-message-premium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.6667 5L7.50001 14.1667L3.33334 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Message sent successfully!</span>
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  className="error-message-premium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 6.66667V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 13.3333H10.0083" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Failed to send message. Please try again.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
