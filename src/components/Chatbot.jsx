import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm SIFRA, Veeresh's assistant. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [voices, setVoices] = useState([]);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  const quickReplies = [
    { icon: '💼', text: 'Tell me about skills', query: 'What are your skills?' },
    { icon: '🚀', text: 'Show projects', query: 'Tell me about your projects' },
    { icon: '🎓', text: 'Education', query: 'What is your education?' },
    { icon: '📧', text: 'Contact info', query: 'How can I contact you?' },
    { icon: '📜', text: 'Certifications', query: 'What certifications do you have?' },
    { icon: '💻', text: 'Experience', query: 'Tell me about your experience' }
  ];

  const emojis = ['😊', '👍', '🎉', '💡', '🚀', '💼', '🎓', '📧', '👋', '❤️', '🔥', '⭐'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (messages.length > 1) {
      const history = {
        date: new Date(),
        messages: messages,
        count: messages.length
      };
      setConversationHistory(prev => [history, ...prev.slice(0, 4)]);
    }
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    // Load voices for text-to-speech
    if ('speechSynthesis' in window) {
      // Load voices
      window.speechSynthesis.getVoices();
      
      // Some browsers need this event to load voices
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      console.log('Available voices:', availableVoices.map(v => v.name));
    };

    if ('speechSynthesis' in window) {
      loadVoices();
      
      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Text-to-Speech with female voice
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      
      // Small delay to ensure voices are loaded
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Get fresh list of available voices
        const availableVoices = window.speechSynthesis.getVoices();
        
        console.log('Total voices available:', availableVoices.length);
        console.log('All voice names:', availableVoices.map(v => `${v.name} (${v.lang})`));
        
        // Try to find a female voice - prioritize by quality
        let femaleVoice = null;
        
        // Priority 1: Google female voices (best quality)
        femaleVoice = availableVoices.find(voice => 
          voice.name.toLowerCase().includes('google') && 
          voice.name.toLowerCase().includes('female')
        );
        
        // Priority 2: Microsoft Zira (Windows)
        if (!femaleVoice) {
          femaleVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('zira')
          );
        }
        
        // Priority 3: Microsoft Hazel (Windows)
        if (!femaleVoice) {
          femaleVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('hazel')
          );
        }
        
        // Priority 4: Apple Samantha (Mac)
        if (!femaleVoice) {
          femaleVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('samantha')
          );
        }
        
        // Priority 5: Apple Victoria (Mac)
        if (!femaleVoice) {
          femaleVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('victoria')
          );
        }
        
        // Priority 6: Any voice with "female" in the name
        if (!femaleVoice) {
          femaleVoice = availableVoices.find(voice => 
            voice.name.toLowerCase().includes('female')
          );
        }
        
        // Priority 7: English voices that sound female (common names)
        if (!femaleVoice) {
          const femaleNames = ['karen', 'fiona', 'moira', 'tessa', 'susan', 'linda', 'heather', 'catherine'];
          femaleVoice = availableVoices.find(voice => 
            femaleNames.some(name => voice.name.toLowerCase().includes(name)) &&
            voice.lang.startsWith('en')
          );
        }
        
        // Set the voice if found
        if (femaleVoice) {
          utterance.voice = femaleVoice;
          console.log('✓ Using female voice:', femaleVoice.name, '(', femaleVoice.lang, ')');
        } else {
          console.log('⚠ No female voice found, using default voice');
          // Use first English voice as fallback
          const englishVoice = availableVoices.find(v => v.lang.startsWith('en'));
          if (englishVoice) {
            utterance.voice = englishVoice;
            console.log('Using fallback English voice:', englishVoice.name);
          }
        }
        
        // Voice settings for cute female tone
        utterance.rate = 0.9; // Slightly slower for a cuter sound
        utterance.pitch = 1.4; // Higher pitch for cute female voice
        utterance.volume = 1;
        utterance.lang = 'en-US';
        
        utterance.onend = () => {
          setIsSpeaking(false);
        };
        
        utterance.onerror = (event) => {
          console.error('Speech error:', event);
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
      }, 150);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    console.log('SIFRA processing message:', userMessage);
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 I'm SIFRA, Veeresh's assistant. I'm here to help you learn more about him. What would you like to know?";
    } else if (message.includes('who are you') || message.includes('your name')) {
      return "I'm SIFRA - Smart Interactive Female Response Assistant! I help visitors learn about Veeresh's skills, projects, and experience. How can I assist you?";
    } else if (message.includes('skills') || message.includes('technologies') || message.includes('tech stack')) {
      return "SIFRA here! Veeresh is skilled in:\n\n🔹 Data Analytics & Visualization: Python, SQL, Pandas, NumPy, Power BI, Tableau\n🔹 AI & Machine Learning: TensorFlow, PyTorch, Scikit-Learn, Keras\n🔹 Full-Stack Development: React.js, Node.js, Express.js, MongoDB\n🔹 Tools: Git, GitHub, VS Code, Jupyter, AWS, Docker\n\nWould you like to know more about any specific skill?";
    } else if (message.includes('projects') || message.includes('work')) {
      return "SIFRA here! Here are Veeresh's top projects:\n\n🌾 Smart Agri Vision - 98% accuracy crop prediction\n🌿 Plant Disease Analysis - CNN-based detection with 2K+ downloads\n💻 UptoSkilla Web App - Full-stack MERN application\n🏠 Housing Price Predictor - AI-powered real estate advisor\n🤖 AI Resume Builder - Intelligent resume creation tool\n\nWhich project interests you?";
    } else if (message.includes('experience') || message.includes('internship')) {
      return "SIFRA here! Veeresh has completed 4+ internships:\n\n📊 BCG X Company - Data Science\n📈 Labmentix - Data Analytics\n💻 UPTOSKILLS - MERN Full Stack\n☁️ AWS - Solutions Architecture\n\nHe has hands-on experience in data analytics, ML modeling, and cloud architecture!";
    } else if (message.includes('education') || message.includes('college')) {
      return "SIFRA here! 🎓 Education:\n\nB.E. in AI and Data Science\nGovernment Engineering College, Nargund\nCGPA: 7.8/10\nDuration: Sep 2022 - May 2026";
    } else if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      return "SIFRA here! 📧 Contact Information:\n\nEmail: pujarveeresh7@gmail.com\n📱 Phone: +91 7483112442\n\nFeel free to reach out anytime!";
    } else if (message.includes('certifications') || message.includes('certificates')) {
      return "SIFRA here! 🏆 Verified Certifications:\n\n✅ Machine Learning - Coursera/Stanford\n✅ SQL Database - Oracle/MySQL\n✅ Data Analytics - Google/Coursera\n✅ Infosys Springboard\n\nAll certifications are verified!";
    } else if (message.includes('github')) {
      return "SIFRA here! � GitHub: github.com/veeresh0071\n\nCheck out the repositories for code samples!";
    } else if (message.includes('linkedin')) {
      return "SIFRA here! 🔗 LinkedIn: linkedin.com/in/veeresh-pujar-94733b334/\n\nConnect for professional networking!";
    } else if (message.includes('thank')) {
      return "You're welcome! 😊 I'm SIFRA, and I'm always here to help. Anything else you'd like to know about Veeresh?";
    } else if (message.includes('bye')) {
      return "Goodbye! 👋 I'm SIFRA, and I'll be here whenever you need me. Feel free to come back anytime!";
    } else {
      return "I'm SIFRA, and I can help you with:\n\n💼 Skills & Technologies\n🚀 Projects\n📚 Experience\n🎓 Education\n🏆 Certifications\n📧 Contact Info\n\nWhat would you like to know about Veeresh?";
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setShowQuickReplies(false);
    setMessageCount(prev => prev + 1);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        type: 'bot',
        text: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      speak(botResponse.text);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (query) => {
    setInputValue(query);
    setTimeout(() => handleSend(), 100);
  };

  const insertEmoji = (emoji) => {
    setInputValue(prev => prev + emoji);
    setShowEmoji(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      type: 'bot',
      text: "Chat cleared! I'm SIFRA, how can I help you?",
      timestamp: new Date()
    }]);
    setShowQuickReplies(true);
    setMessageCount(0);
  };

  const loadHistory = (history) => {
    setMessages(history.messages);
    setShowHistory(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = {
        type: 'user',
        text: `📎 Uploaded: ${file.name}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fileMessage]);
      
      setTimeout(() => {
        const botResponse = {
          type: 'bot',
          text: "Thanks for sharing! I'm SIFRA, and I'm in demo mode so I can't process files right now, but I'd love to help with any questions about Veeresh!",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 500);
    }
  };

  return (
    <>
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: isOpen ? 0 : [0, -10, 0]
        }}
        transition={{
          y: {
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {messageCount > 0 && !isOpen && (
          <motion.span 
            className="message-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {messageCount}
          </motion.span>
        )}
        
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              width="28" 
              height="28" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </motion.svg>
          ) : (
            <motion.div
              key="robot"
              className="robot-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                {/* Modern female android head */}
                <path d="M 12 3 Q 8 3 8 7 L 8 10 Q 8 12 10 12 L 14 12 Q 16 12 16 10 L 16 7 Q 16 3 12 3 Z" fill="currentColor"/>
                
                {/* Hair/headpiece detail */}
                <ellipse cx="12" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.7"/>
                <path d="M 9 4 Q 9 2 12 2 Q 15 2 15 4" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                
                {/* Eyes - glowing effect */}
                <ellipse cx="10" cy="8" rx="1.2" ry="1.5" fill="#00d9ff"/>
                <ellipse cx="14" cy="8" rx="1.2" ry="1.5" fill="#00d9ff"/>
                <circle cx="10" cy="8" r="0.6" fill="white" opacity="0.8"/>
                <circle cx="14" cy="8" r="0.6" fill="white" opacity="0.8"/>
                
                {/* Facial features */}
                <path d="M 10.5 10 Q 12 10.5 13.5 10" stroke="white" strokeWidth="0.5" fill="none" opacity="0.6"/>
                
                {/* Neck connector */}
                <rect x="11" y="12" width="2" height="1.5" rx="0.5" fill="currentColor"/>
                
                {/* Shoulders/upper body - feminine */}
                <path d="M 7 13.5 Q 7 14 8 14 L 10 14 L 10 19 Q 10 20 11 20 L 13 20 Q 14 20 14 19 L 14 14 L 16 14 Q 17 14 17 13.5 Z" fill="currentColor"/>
                
                {/* Chest panel - tech detail */}
                <rect x="10.5" y="15" width="3" height="3" rx="0.5" fill="none" stroke="white" strokeWidth="0.3" opacity="0.4"/>
                <line x1="12" y1="15.5" x2="12" y2="17.5" stroke="white" strokeWidth="0.3" opacity="0.4"/>
                
                {/* Arms - sleek design */}
                <rect x="6.5" y="14" width="1.5" height="5" rx="0.8" fill="currentColor"/>
                <rect x="16" y="14" width="1.5" height="5" rx="0.8" fill="currentColor"/>
                <circle cx="7.2" cy="19" r="0.8" fill="currentColor"/>
                <circle cx="16.8" cy="19" r="0.8" fill="currentColor"/>
                
                {/* Lower body */}
                <rect x="10.5" y="20" width="1.3" height="3" rx="0.6" fill="currentColor"/>
                <rect x="12.2" y="20" width="1.3" height="3" rx="0.6" fill="currentColor"/>
                
                {/* Base/feet */}
                <ellipse cx="11.2" cy="23" rx="1" ry="0.5" fill="currentColor"/>
                <ellipse cx="12.8" cy="23" rx="1" ry="0.5" fill="currentColor"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    {/* Modern female android head */}
                    <path d="M 12 3 Q 8 3 8 7 L 8 10 Q 8 12 10 12 L 14 12 Q 16 12 16 10 L 16 7 Q 16 3 12 3 Z" fill="currentColor"/>
                    
                    {/* Hair/headpiece detail */}
                    <ellipse cx="12" cy="4" rx="4" ry="2" fill="currentColor" opacity="0.7"/>
                    <path d="M 9 4 Q 9 2 12 2 Q 15 2 15 4" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                    
                    {/* Eyes - glowing effect */}
                    <ellipse cx="10" cy="8" rx="1.2" ry="1.5" fill="#00d9ff"/>
                    <ellipse cx="14" cy="8" rx="1.2" ry="1.5" fill="#00d9ff"/>
                    <circle cx="10" cy="8" r="0.6" fill="white" opacity="0.8"/>
                    <circle cx="14" cy="8" r="0.6" fill="white" opacity="0.8"/>
                    
                    {/* Facial features */}
                    <path d="M 10.5 10 Q 12 10.5 13.5 10" stroke="white" strokeWidth="0.5" fill="none" opacity="0.6"/>
                    
                    {/* Neck connector */}
                    <rect x="11" y="12" width="2" height="1.5" rx="0.5" fill="currentColor"/>
                    
                    {/* Shoulders/upper body - feminine */}
                    <path d="M 7 13.5 Q 7 14 8 14 L 10 14 L 10 19 Q 10 20 11 20 L 13 20 Q 14 20 14 19 L 14 14 L 16 14 Q 17 14 17 13.5 Z" fill="currentColor"/>
                    
                    {/* Chest panel - tech detail */}
                    <rect x="10.5" y="15" width="3" height="3" rx="0.5" fill="none" stroke="white" strokeWidth="0.3" opacity="0.4"/>
                    <line x1="12" y1="15.5" x2="12" y2="17.5" stroke="white" strokeWidth="0.3" opacity="0.4"/>
                    
                    {/* Arms - sleek design */}
                    <rect x="6.5" y="14" width="1.5" height="5" rx="0.8" fill="currentColor"/>
                    <rect x="16" y="14" width="1.5" height="5" rx="0.8" fill="currentColor"/>
                    <circle cx="7.2" cy="19" r="0.8" fill="currentColor"/>
                    <circle cx="16.8" cy="19" r="0.8" fill="currentColor"/>
                    
                    {/* Lower body */}
                    <rect x="10.5" y="20" width="1.3" height="3" rx="0.6" fill="currentColor"/>
                    <rect x="12.2" y="20" width="1.3" height="3" rx="0.6" fill="currentColor"/>
                    
                    {/* Base/feet */}
                    <ellipse cx="11.2" cy="23" rx="1" ry="0.5" fill="currentColor"/>
                    <ellipse cx="12.8" cy="23" rx="1" ry="0.5" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h3>SIFRA</h3>
                  <span className="status-online">Online</span>
                </div>
              </div>
              
              <div className="header-actions">
                {isSpeaking && (
                  <motion.button
                    className="header-action-btn"
                    onClick={stopSpeaking}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Stop speaking"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16"/>
                      <rect x="14" y="4" width="4" height="16"/>
                    </svg>
                  </motion.button>
                )}
                
                <motion.button
                  className="header-action-btn"
                  onClick={() => setShowHistory(!showHistory)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Conversation history"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </motion.button>
                
                <motion.button
                  className="header-action-btn"
                  onClick={clearChat}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Clear chat"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {showHistory && (
                <motion.div
                  className="history-panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <h4>Recent Conversations</h4>
                  {conversationHistory.length > 0 ? (
                    conversationHistory.map((history, idx) => (
                      <motion.div
                        key={idx}
                        className="history-item"
                        onClick={() => loadHistory(history)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{history.date.toLocaleDateString()}</span>
                        <span className="history-count">{history.count} messages</span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="no-history">No conversation history yet</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-content">
                    {message.text}
                  </div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="message bot typing-indicator"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <AnimatePresence>
              {showQuickReplies && messages.length <= 2 && (
                <motion.div
                  className="quick-replies"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {quickReplies.map((reply, idx) => (
                    <motion.button
                      key={idx}
                      className="quick-reply-btn"
                      onClick={() => handleQuickReply(reply.query)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <span className="quick-reply-icon">{reply.icon}</span>
                      <span className="quick-reply-text">{reply.text}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showEmoji && (
                <motion.div
                  className="emoji-picker"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {emojis.map((emoji, idx) => (
                    <motion.button
                      key={idx}
                      className="emoji-btn"
                      onClick={() => insertEmoji(emoji)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="chatbot-input-container">
              <div className="chatbot-input-wrapper">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  accept="image/*,.pdf,.doc,.docx"
                />
                
                <motion.button
                  className="input-action-btn"
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Attach file"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
                  </svg>
                </motion.button>

                <input
                  type="text"
                  className="chatbot-input"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                
                <motion.button
                  className="input-action-btn"
                  onClick={() => setShowEmoji(!showEmoji)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Add emoji"
                >
                  😊
                </motion.button>

                <motion.button
                  className={`voice-btn ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={isListening ? "Stop listening" : "Start voice input"}
                >
                  {isListening ? (
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </motion.svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                      <line x1="12" y1="19" x2="12" y2="23"/>
                      <line x1="8" y1="23" x2="16" y2="23"/>
                    </svg>
                  )}
                </motion.button>

                <motion.button
                  className="send-btn"
                  onClick={handleSend}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={inputValue.trim() === ''}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
