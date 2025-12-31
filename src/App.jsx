import React, { useState, useEffect, useRef } from 'react';
import Admin from './Admin';
import { Moon, Sun, Menu, X, Mail, Github, Linkedin, ExternalLink, Globe, BookOpen, Flag, Users, Headphones, Wrench, Activity, MessageCircle, Clock, Palette, FileText, Mic } from 'lucide-react';

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateLangs, setAnimateLangs] = useState(false);
  const [animateSkills, setAnimateSkills] = useState(false);
  const languagesRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    // IntersectionObserver to animate bars when sections scroll into view
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.25 };

    const langObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimateLangs(true);
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const skillsObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAnimateSkills(true);
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (languagesRef.current) langObserver.observe(languagesRef.current);
    if (skillsRef.current) skillsObserver.observe(skillsRef.current);

    return () => {
      langObserver.disconnect();
      skillsObserver.disconnect();
    };
  }, []);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  // Languages separated from general skills so we can show them in their own section
  const languages = [
    { name: 'Arabic', icon: <Globe className="w-6 h-6" />, level: 100, description: 'Native' },
    { name: 'English', icon: <BookOpen className="w-6 h-6" />, level: 90, description: 'C1 Proficiency' },
    { name: 'German', icon: <Flag className="w-6 h-6" />, level: 50, description: 'A2.2 Level' },
  ];

  const skills = [
    { name: 'Team Support & Coaching', icon: <Users className="w-6 h-6" />, level: 75 },
    { name: 'Customer Complaint Resolution', icon: <Headphones className="w-6 h-6" />, level: 90 },
  { name: 'Problem Solving & Escalation Handling', icon: <Wrench className="w-6 h-6" />, level: 100 },
    { name: 'Performance Monitoring', icon: <Activity className="w-6 h-6" />, level: 100 },
    { name: 'Communication & Engagement', icon: <MessageCircle className="w-6 h-6" />, level: 90 },
    { name: 'Creative designer with advanced design skills', icon: <Palette className="w-6 h-6" />, level: 85 },
    { name: 'Professional writer (3 novels & 1 book)', icon: <BookOpen className="w-6 h-6" />, level: 95 },
    { name: 'Storytelling & content creation focused', icon: <FileText className="w-6 h-6" />, level: 100 },
    { name: 'Learning voice-over & audio expression', icon: <Mic className="w-6 h-6" />, level: 60 },
    { name: 'Time Management & Multitasking', icon: <Clock className="w-6 h-6" />, level: 100 },
  ];

  const initialProjects = [
    {
      title: 'Spinocerebellar Ataxia',
      description: 'Educational presentation on Spinocerebellar Ataxia, a neurological disorder.',
      image: '/images/Spinocerebellar Ataxia.jpeg',
      tags: ['educational'],
      link: 'https://www.canva.com/design/DAE-J3vykbA/DHLaXMNC0S_uiaG3QVwhUA/edit?utm_content=DAE-J3vykbA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
      title: 'Qamar Team Logo',
      description: 'Logo design for the Qamar team at German Jordanian University.',
      image: '/images/gju logo.jpg',
      tags: ['educational'],
      link: 'https://www.canva.com/design/DAGb1ChS2bA/MuYucaIXHqtWEala8djEpg/edit?utm_content=DAGb1ChS2bA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
      title: 'Presentation about The Pursuit of Happyness Film',
      description: 'Educational presentation analyzing the film The Pursuit of Happyness.',
      image: '/images/The Pursuit of Happyness Film.jpg',
      tags: ['educational'],
      link: 'https://www.canva.com/design/DAG8hqMOFik/47lcH1glU6GAlNb9aXEIiw/edit?utm_content=DAG8hqMOFik&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
    {
      title: 'Presentation about Principles of Marketing',
      description: 'Educational presentation on the fundamental principles of marketing.',
      image: '/images/gju.jpg',
      tags: ['educational'],
      link: 'https://www.canva.com/design/DAGvf42X4Ps/bimQ_ZLnhfJwWwT_mhzOsQ/edit?utm_content=DAGvf42X4Ps&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton'
    },
  ];
  const [projects, setProjects] = useState(() => {
    try {
      const raw = localStorage.getItem('projects');
      return raw ? JSON.parse(raw) : initialProjects;
    } catch (e) {
      return initialProjects;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('projects', JSON.stringify(projects));
    } catch (e) {
      // ignore
    }
  }, [projects]);

  // Experiences and certifications to display in Projects/Experience section
  const experiences = [
    {
      role: 'Guest Relations Trainee – Front Office & Management',
      company: '',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=800&fit=crop',
      date: '',
      bullets: [
        'Managed guest check-in/out procedures and inquiries',
        'Coordinated between Front Office, Housekeeping, and Management',
        'Maintained high customer satisfaction under pressure',
      ],
    },
    {
      role: 'Sales Associate – Customer Service',
      company: 'Rawan Cake',
      date: 'March 2024 – July 2024',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&h=800&fit=crop',
      bullets: [
        'Achieved daily sales targets through quality customer service',
        'Built client relationships and handled transactions accurately',
        'Provided product guidance and supported store operations',
      ],
    },
    {
      role: 'Teaching Assistant – German Pre-Course',
      company: 'German Jordanian University',
      date: '',
      image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&h=800&fit=crop',
      bullets: [
        "Assisted in delivering beginner German content",
        'Supported students with grammar and pronunciation practice',
        'Organized class activities and assessments',
      ],
    },
  ];

  const certifications = [
    '1st Place – Creative Writing Competition (Jordanian Universities)',
    'Certificate of Achievement – UAE Reading Challenge (Outstanding Level)',
    'Certificate of Appreciation – Aroogah Al Fikr Publishing',
    'Co-author of published book "I Named You My World"',
  ];

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 3000);
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-4xl font-bold mb-6`}>
              MA
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Malak AL-Rawahna</span>
          </h1>
          <p className={`text-xl sm:text-2xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            GAEBC - student at GJU 
          </p>
          <p className={`text-lg max-w-2xl mx-auto mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
           Customer-focused professional with experience in hotels, customer service, and team support. Strong communication, leadership, and problem-solving skills.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-8 py-3 rounded-lg font-semibold border-2 transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
            >
              Contact Me
            </button>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <a href="#" className={`p-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className={`p-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className={`p-3 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}>
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
<section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          I am a dedicated and ambitious customer service professional with hands-on experience in hospitality and retail environments. My journey in customer-centric roles has equipped me with strong communication skills, leadership potential, and the ability to thrive under pressure. Currently, I'm pursuing a Bachelor's degree in German & English for Business and Communication at the German Jordanian University, with an expected graduation in 2028. This academic path complements my practical experience, providing me with both the theoretical framework and language skills needed for international business environments.
        </p>
        <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          My professional background includes guest relations training at hotel front offices and customer service roles in retail settings. At Rawan Cake, I honed my sales techniques and customer engagement strategies, consistently meeting daily targets while building lasting client relationships. As a Teaching Assistant for German language courses at my university, I developed coaching and instructional skills that translate directly to team leadership and training scenarios. These diverse experiences have given me a comprehensive understanding of service excellence from multiple perspectives.
        </p>
        <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Beyond my professional and academic pursuits, I'm a published writer with notable achievements in creative competitions. I co-authored the book "I Named You My World" and won first place in a Jordanian universities creative writing competition. These accomplishments reflect my strong communication abilities and attention to detail—qualities that enhance my customer service approach. I'm fluent in Arabic and English, with developing proficiency in German, allowing me to connect with diverse customer bases.
        </p>
      </div>
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <h3 className="text-2xl font-bold mb-6">Quick Facts</h3>
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Currently studying at German Jordanian University</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Experienced in hotel guest relations and retail customer service</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Published co-author of "I Named You My World"</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>1st Place in Creative Writing Competition (Jordanian Universities)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Fluent in Arabic and English, learning German</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Award-winning UAE Reading Challenge participant</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>German Language Teaching Assistant experience</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-3">▹</span>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Available for 24/7 shift rotations</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* Skills Section */}
      {/* Languages Section (new) */}
  <section ref={languagesRef} id="languages" className={`py-12 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Languages</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {languages.map((lang, index) => (
              <div key={lang.name} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white shadow-md'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center">
                      <div className="text-blue-500 mr-3">{lang.icon}</div>
                      <h3 className="text-lg font-semibold">{lang.name}</h3>
                    </div>
                    <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang.description}</p>
                  </div>
                  <span className={`text-sm ml-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{lang.level}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: animateLangs ? `${lang.level}%` : '0%', transitionDelay: `${index * 150}ms` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

  <section ref={skillsRef} id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`p-6 rounded-xl transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-500 mr-3">{skill.icon}</div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out"
                    style={{ width: animateSkills ? `${skill.level}%` : '0%', transitionDelay: `${index * 100}ms` }}
                  />
                </div>
                <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {skill.level}% proficiency
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {projects && projects.length ? projects.map((p, idx) => (
              <div
                key={`proj-${idx}`}
                className={`rounded-xl overflow-hidden transition-transform hover:scale-105 ${darkMode ? 'bg-gray-900' : 'bg-gray-50 shadow-lg'}`}
              >
                {p.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform hover:scale-110" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{(p.tags || []).join(', ')}</span>
                  </div>

                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{p.description}</p>

                  {p.link && p.link !== '#' && (
                    <div className="mt-4">
                      <a href={p.link} target="_blank" rel="noreferrer" className="inline-block text-blue-500 hover:underline">View Project</a>
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50 shadow-lg'}`}>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>No projects to show.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800/60' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>

          <div className="grid sm:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <div
                key={`exp-${index}`}
                className={`rounded-xl overflow-hidden transition-transform hover:scale-105 ${darkMode ? 'bg-gray-900' : 'bg-gray-50 shadow-lg'}`}
              >
                {exp.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={exp.image} alt={exp.role} className="w-full h-full object-cover transition-transform hover:scale-110" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{exp.company}{exp.company && exp.date ? ' | ' : ''}{exp.date}</span>
                  </div>

                  <ul className={`mt-2 list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {Array.isArray(exp.bullets) ? exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    )) : <li>{exp.bullets}</li>}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 grid sm:grid-cols-1">
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-gray-50 shadow-lg'}`}>
              <h3 className="text-2xl font-bold mb-4">Certifications & Awards</h3>
              <ul className={`list-disc pl-5 space-y-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <p className={`text-center text-lg mb-12 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>

          {formSubmitted && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-center">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className={`block mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
                    : 'bg-white border-gray-300 focus:border-blue-500'
                } border-2 outline-none ${formErrors.name ? 'border-red-500' : ''}`}
                placeholder="Your name"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
                    : 'bg-white border-gray-300 focus:border-blue-500'
                } border-2 outline-none ${formErrors.email ? 'border-red-500' : ''}`}
                placeholder="your.email@example.com"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className={`block mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
                    : 'bg-white border-gray-300 focus:border-blue-500'
                } border-2 outline-none ${formErrors.message ? 'border-red-500' : ''}`}
                placeholder="Your message..."
              />
              {formErrors.message && (
                <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            © 2024 H2O digital co. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
      {/* Hidden Admin route - visit /admin to access the client-side admin panel */}
      <Admin projects={projects} setProjects={setProjects} />
    </div>
  );
}