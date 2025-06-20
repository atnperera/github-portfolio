document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.skills').forEach(section => {
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Initialize skill bars width
    document.querySelectorAll('.skill-level').forEach(bar => {
        const width = bar.classList.contains('html') ? '95%' :
                      bar.classList.contains('css') ? '90%' :
                      bar.classList.contains('javascript') ? '85%' :
                      bar.classList.contains('react') ? '80%' :
                      bar.classList.contains('node') ? '75%' :
                      bar.classList.contains('python') ? '70%' :
                      bar.classList.contains('php') ? '65%' :
                      bar.classList.contains('sql') ? '80%' : '0%';
        bar.style.width = width;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Hero section animation
    const heroElements = [
        document.querySelector('.hero-content h1'),
        document.querySelector('.hero-content h4'),
        document.querySelector('.hero-content p'),
        document.querySelector('.hero-content .btn'),
        document.querySelector('.hero-image img')
    ];

    // Function to trigger animations
    function animateHero() {
        heroElements.forEach(element => {
            if (element) {
                element.classList.add('animate-in');
            }
        });
    }

    // Trigger on page load
    setTimeout(animateHero, 300);

    // Optional: Re-animate when scrolled to (for single-page apps)
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero');
        if (isElementInViewport(heroSection)) {
            animateHero();
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});
// Expandable section toggle
document.querySelector('.expand-btn').addEventListener('click', function() {
  this.closest('.expandable-section').classList.toggle('expanded');
  this.innerHTML = this.closest('.expandable-section').classList.contains('expanded') ? 
    'Read Less <i class="fas fa-chevron-up"></i>' : 
    'Read More <i class="fas fa-chevron-down"></i>';
});

// Email copy functionality
document.querySelector('.copyable').addEventListener('click', function() {
  navigator.clipboard.writeText(this.textContent.trim());
  
  // Visual feedback
  const originalText = this.textContent;
  this.textContent = 'Copied!';
  setTimeout(() => {
    this.textContent = originalText;
  }, 1500);
});

// Phone click-to-call
document.querySelector('.click-to-call').addEventListener('click', function() {
  const phoneNumber = this.textContent.trim().replace(/\s/g, '');
  window.open(`tel:${phoneNumber}`);
});

// Scroll animation trigger
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelector('.about-content').classList.add('in-view');
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

aboutObserver.observe(document.querySelector('#about'));