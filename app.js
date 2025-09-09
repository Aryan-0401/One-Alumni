// Modern Alumni Portal 2025 - JavaScript
class AlumniPortal {
    constructor() {
        this.currentUser = null;
        this.currentRole = null;
        this.currentSection = 'dashboard';
        this.data = {
            users: [
                {
                    id: "alum001",
                    role: "alumni",
                    name: "Priya Sharma",
                    email: "priya.sharma@email.com",
                    phone: "+91-98765-43210",
                    graduationYear: "2018",
                    degree: "B.Tech Computer Science",
                    currentJob: "Software Engineer",
                    company: "TCS",
                    industry: "Information Technology",
                    location: "Bangalore, India",
                    bio: "Passionate software developer with 5+ years experience in web development.",
                    achievements: "Led development of major client application, promoted to senior role",
                    profilePhoto: "https://via.placeholder.com/150x150?text=PS",
                    mentorshipAvailable: true
                },
                {
                    id: "alum002",
                    role: "alumni",
                    name: "Rajesh Kumar",
                    email: "rajesh.kumar@email.com",
                    phone: "+91-87654-32109",
                    graduationYear: "2016",
                    degree: "B.Tech Mechanical Engineering",
                    currentJob: "Project Manager",
                    company: "Mahindra",
                    industry: "Automotive",
                    location: "Mumbai, India",
                    bio: "Experienced project manager specializing in automotive manufacturing.",
                    achievements: "Successfully managed 20+ projects, cost savings of 15%",
                    profilePhoto: "https://via.placeholder.com/150x150?text=RK",
                    mentorshipAvailable: true
                },
                {
                    id: "alum003",
                    role: "alumni",
                    name: "Anjali Gupta",
                    email: "anjali.gupta@email.com",
                    phone: "+91-76543-21098",
                    graduationYear: "2019",
                    degree: "B.Tech Electronics Engineering",
                    currentJob: "Research Scientist",
                    company: "ISRO",
                    industry: "Aerospace",
                    location: "Hyderabad, India",
                    bio: "Research scientist working on satellite communication systems.",
                    achievements: "Published 8 research papers, contributed to 3 satellite missions",
                    profilePhoto: "https://via.placeholder.com/150x150?text=AG",
                    mentorshipAvailable: false
                },
                {
                    id: "admin001",
                    role: "admin",
                    name: "Dr. Suresh Pandey",
                    email: "admin@university.edu",
                    phone: "+91-65432-10987",
                    designation: "Alumni Relations Director"
                },
                {
                    id: "stud001",
                    role: "student",
                    name: "Amit Singh",
                    email: "amit.singh@student.edu",
                    phone: "+91-54321-09876",
                    year: "3rd Year",
                    course: "B.Tech Computer Science",
                    mentorNeeded: true,
                    interests: ["Web Development", "AI/ML", "Software Engineering"]
                }
            ],
            events: [
                {
                    id: "evt001",
                    title: "Annual Alumni Meet 2025",
                    description: "Join us for the annual alumni gathering with networking, cultural programs, and campus tours.",
                    date: "2025-12-15",
                    time: "10:00 AM",
                    location: "University Main Auditorium",
                    category: "networking",
                    rsvpCount: 156,
                    maxCapacity: 500,
                    organizer: "Alumni Relations Office"
                },
                {
                    id: "evt002",
                    title: "Career Development Workshop",
                    description: "Interactive workshop on modern career development strategies and industry trends.",
                    date: "2025-10-20",
                    time: "2:00 PM",
                    location: "Virtual Event",
                    category: "career",
                    rsvpCount: 89,
                    maxCapacity: 200,
                    organizer: "Career Services"
                },
                {
                    id: "evt003",
                    title: "Tech Talk: AI in Industry",
                    description: "Leading industry experts discuss artificial intelligence applications in various sectors.",
                    date: "2025-10-05",
                    time: "4:00 PM",
                    location: "Engineering Block Seminar Hall",
                    category: "academic",
                    rsvpCount: 234,
                    maxCapacity: 300,
                    organizer: "Computer Science Department"
                },
                {
                    id: "evt004",
                    title: "Alumni Football Tournament",
                    description: "Friendly football matches between different graduation batches.",
                    date: "2025-11-30",
                    time: "9:00 AM",
                    location: "University Sports Ground",
                    category: "social",
                    rsvpCount: 64,
                    maxCapacity: 100,
                    organizer: "Sports Committee"
                }
            ],
            announcements: [
                {
                    id: "ann001",
                    title: "New Alumni Portal Features",
                    content: "We've added new mentorship matching and job board features to the alumni portal. Explore these exciting new tools!",
                    date: "2025-09-01",
                    category: "general",
                    author: "Alumni Relations Office"
                },
                {
                    id: "ann002",
                    title: "Scholarship Fund Update",
                    content: "Thanks to generous alumni donations, we've established 5 new scholarships for deserving students. Applications now open.",
                    date: "2025-08-25",
                    category: "alumni news",
                    author: "Development Office"
                }
            ],
            engagementMetrics: {
                totalAlumni: 1250,
                activeUsers: 456,
                eventAttendance: 89,
                messageOpenRate: 72,
                newRegistrations: 23,
                mentorshipConnections: 34
            }
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.startFloatingAnimation();
    }

    setupEventListeners() {
        // Role selection
        document.querySelectorAll('.role-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectRole(e.currentTarget.dataset.role);
            });
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.modal-backdrop').addEventListener('click', () => {
            this.closeModal();
        });

        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            this.handleLogin(e);
        });

        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(item.dataset.section);
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchAlumni(e.target.value);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterAlumni(e.target.dataset.filter);
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Form input animations
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        // Observe cards and sections for scroll animations
        setTimeout(() => {
            document.querySelectorAll('.stat-card, .dashboard-card, .alumni-card, .event-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                observer.observe(el);
            });
        }, 100);
    }

    startFloatingAnimation() {
        // Create additional floating elements dynamically
        const heroSection = document.querySelector('.hero-section');
        for (let i = 0; i < 6; i++) {
            const floater = document.createElement('div');
            floater.className = 'float-item';
            floater.style.cssText = `
                position: absolute;
                width: ${Math.random() * 40 + 20}px;
                height: ${Math.random() * 40 + 20}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 15}s infinite linear;
                animation-delay: ${Math.random() * -20}s;
            `;
            document.querySelector('.floating-elements').appendChild(floater);
        }
    }

    selectRole(role) {
        this.currentRole = role;
        this.showModal();
        
        // Add ripple effect to clicked card
        const card = document.querySelector(`[data-role="${role}"]`);
        this.addRippleEffect(card);
    }

    showModal() {
        const modal = document.getElementById('loginModal');
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    closeModal() {
        const modal = document.getElementById('loginModal');
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Show loading spinner
        this.showLoading();

        // Simulate login process
        setTimeout(() => {
            // Find user by email
            const user = this.data.users.find(u => u.email === email);
            
            if (user && user.role === this.currentRole) {
                this.currentUser = user;
                this.hideLoading();
                this.closeModal();
                this.showDashboard();
                this.showSuccessToast('Login successful! Welcome back.');
            } else {
                this.hideLoading();
                this.showSuccessToast('Invalid credentials or role mismatch.');
            }
        }, 1500);
    }

    showDashboard() {
        document.getElementById('landingPage').classList.remove('active');
        document.getElementById('dashboardPage').classList.add('active');
        
        // Update navigation with user info
        this.updateUserProfile();
        
        // Render dashboard content
        this.renderDashboard();
        this.renderDirectory();
        this.renderEvents();
        this.renderAnnouncements();

        // Animate entrance
        setTimeout(() => {
            document.querySelectorAll('.stat-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.opacity = '1';
                }, index * 100);
            });
        }, 100);
    }

    updateUserProfile() {
        const avatar = document.querySelector('.profile-avatar img');
        if (this.currentUser.profilePhoto) {
            avatar.src = this.currentUser.profilePhoto;
        } else {
            avatar.src = `https://via.placeholder.com/40x40?text=${this.currentUser.name.split(' ').map(n => n[0]).join('')}`;
        }
        avatar.alt = this.currentUser.name;
    }

    renderDashboard() {
        // Update stats with animation
        this.animateCounter('totalAlumni', this.data.engagementMetrics.totalAlumni);
        this.animateCounter('activeUsers', this.data.engagementMetrics.activeUsers);
        this.animateCounter('eventAttendance', this.data.engagementMetrics.eventAttendance);
        this.animateCounter('mentorshipConnections', this.data.engagementMetrics.mentorshipConnections);
    }

    animateCounter(elementId, target) {
        const element = document.getElementById(elementId);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 30);
    }

    renderDirectory() {
        const grid = document.getElementById('directoryGrid');
        const alumni = this.data.users.filter(user => user.role === 'alumni');
        
        grid.innerHTML = alumni.map(alum => `
            <div class="alumni-card" data-name="${alum.name.toLowerCase()}" data-company="${alum.company.toLowerCase()}" data-location="${alum.location.toLowerCase()}">
                <div class="alumni-header">
                    <div class="alumni-avatar">
                        ${alum.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div class="alumni-info">
                        <h3>${alum.name}</h3>
                        <p>${alum.currentJob} at ${alum.company}</p>
                    </div>
                </div>
                <div class="alumni-details">
                    <p><strong>Graduation:</strong> ${alum.graduationYear}</p>
                    <p><strong>Degree:</strong> ${alum.degree}</p>
                    <p><strong>Industry:</strong> ${alum.industry}</p>
                    <p><strong>Location:</strong> ${alum.location}</p>
                    <p><strong>Bio:</strong> ${alum.bio}</p>
                    ${alum.mentorshipAvailable ? '<span class="mentor-badge">Available for Mentorship</span>' : ''}
                </div>
            </div>
        `).join('');

        // Add staggered animation
        setTimeout(() => {
            document.querySelectorAll('.alumni-card').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }

    renderEvents() {
        const grid = document.getElementById('eventsGrid');
        
        grid.innerHTML = this.data.events.map(event => {
            const eventDate = new Date(event.date);
            const month = eventDate.toLocaleDateString('en-US', { month: 'short' });
            const day = eventDate.getDate();
            
            return `
                <div class="event-card">
                    <div class="event-header">
                        <span class="event-category">${event.category}</span>
                        <h3>${event.title}</h3>
                        <div class="event-meta">
                            <span><i class="fas fa-calendar"></i> ${event.date}</span>
                            <span><i class="fas fa-clock"></i> ${event.time}</span>
                            <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                        </div>
                    </div>
                    <div class="event-body">
                        <p class="event-description">${event.description}</p>
                        <div class="event-stats">
                            <span class="rsvp-count">${event.rsvpCount}/${event.maxCapacity} attending</span>
                            <button class="rsvp-btn" onclick="portal.rsvpEvent('${event.id}')">
                                RSVP Now
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderAnnouncements() {
        const list = document.getElementById('announcementsList');
        
        list.innerHTML = this.data.announcements.map(announcement => `
            <div class="announcement-card">
                <div class="announcement-header">
                    <h3 class="announcement-title">${announcement.title}</h3>
                    <span class="announcement-date">${new Date(announcement.date).toLocaleDateString()}</span>
                </div>
                <p class="announcement-content">${announcement.content}</p>
                <p class="announcement-author">— ${announcement.author}</p>
            </div>
        `).join('');
    }

    navigateToSection(section) {
        this.currentSection = section;
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Show section with smooth transition
        document.querySelectorAll('.content-section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        setTimeout(() => {
            document.getElementById(`${section}-section`).classList.add('active');
        }, 150);
    }

    searchAlumni(query) {
        const cards = document.querySelectorAll('.alumni-card');
        const searchTerm = query.toLowerCase().trim();
        
        cards.forEach(card => {
            const name = card.dataset.name;
            const company = card.dataset.company;
            const location = card.dataset.location;
            
            const matches = name.includes(searchTerm) || 
                          company.includes(searchTerm) || 
                          location.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    filterAlumni(filter) {
        const cards = document.querySelectorAll('.alumni-card');
        
        cards.forEach((card, index) => {
            let shouldShow = false;
            
            switch(filter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'mentors':
                    shouldShow = card.querySelector('.mentor-badge') !== null;
                    break;
                case 'recent':
                    // Assuming recent grads are from 2020 onwards
                    const yearText = card.querySelector('.alumni-details p').textContent;
                    const year = parseInt(yearText.match(/\d{4}/)[0]);
                    shouldShow = year >= 2020;
                    break;
            }
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    rsvpEvent(eventId) {
        this.showLoading();
        
        // Simulate RSVP process
        setTimeout(() => {
            // Find and update event
            const event = this.data.events.find(e => e.id === eventId);
            if (event && event.rsvpCount < event.maxCapacity) {
                event.rsvpCount++;
                this.renderEvents();
                this.showSuccessToast('RSVP successful! See you at the event.');
            } else {
                this.showSuccessToast('Event is full or already registered.');
            }
            this.hideLoading();
        }, 1000);
    }

    logout() {
        // Show loading
        this.showLoading();
        
        setTimeout(() => {
            this.currentUser = null;
            this.currentRole = null;
            this.hideLoading();
            
            // Reset to landing page
            document.getElementById('dashboardPage').classList.remove('active');
            document.getElementById('landingPage').classList.add('active');
            
            // Clear form
            document.getElementById('loginForm').reset();
            
            this.showSuccessToast('Logged out successfully.');
        }, 1000);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    showSuccessToast(message) {
        const toast = document.getElementById('successToast');
        toast.querySelector('span').textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 3000);
    }
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .ripple-effect {
        z-index: 0;
    }
`;
document.head.appendChild(style);

// Initialize the application
const portal = new AlumniPortal();

// Add smooth scroll behavior for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add hover effects to buttons
    document.querySelectorAll('.btn-primary, .rsvp-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add typing effect to hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add cursor trail effect
    let mouseTrail = [];
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({x: e.clientX, y: e.clientY, life: 20});
        
        if (mouseTrail.length > 10) {
            mouseTrail.shift();
        }
        
        // Remove old trail points
        mouseTrail = mouseTrail.filter(point => point.life > 0);
        mouseTrail.forEach(point => point.life--);
    });

    // Animate numbers on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.textContent.replace(/,/g, ''));
                portal.animateCounter(element.id, targetValue);
                numberObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe stat numbers
    setTimeout(() => {
        document.querySelectorAll('[id$="Alumni"], [id$="Users"], [id$="Attendance"], [id$="Connections"]').forEach(el => {
            numberObserver.observe(el);
        });
    }, 500);
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}