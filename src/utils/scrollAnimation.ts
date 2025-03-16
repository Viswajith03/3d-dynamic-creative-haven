
export const setupScrollAnimation = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add a slight delay based on the element's position
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("active");
          }, delay);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
  );

  // Setup animations for reveal elements
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el, index) => {
    // Add data-delay based on index for staggered animations
    el.setAttribute("data-delay", (index * 100).toString());
    observer.observe(el);
  });

  // Add parallax scroll effect to elements with .parallax class
  const parallaxElements = document.querySelectorAll(".parallax");
  const handleParallax = () => {
    parallaxElements.forEach((el) => {
      const scrollPosition = window.pageYOffset;
      const speed = el.getAttribute("data-speed") || 0.5;
      el.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  };
  
  window.addEventListener("scroll", handleParallax);

  // Add scroll triggered animations for specific elements
  const animateOnScrollElements = document.querySelectorAll(".animate-on-scroll");
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animation = entry.target.getAttribute("data-animation") || "fade-in";
          entry.target.classList.add(animation);
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
  );
  
  animateOnScrollElements.forEach((el) => {
    scrollObserver.observe(el);
  });

  return () => {
    revealElements.forEach((el) => observer.unobserve(el));
    animateOnScrollElements.forEach((el) => scrollObserver.unobserve(el));
    window.removeEventListener("scroll", handleParallax);
  };
};

export const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Add a class to indicate active navigation
          document.querySelectorAll('.nav-active').forEach(el => {
            el.classList.remove('nav-active');
          });
          this.classList.add('nav-active');
          
          // Smooth scroll with enhanced easing
          const startPosition = window.pageYOffset;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1000; // ms
          let start = null;
          
          // Easing function for smoother scroll
          const easeInOutQuad = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          };
          
          const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutQuad(progress);
            
            window.scrollTo(0, startPosition + distance * easeProgress);
            
            if (timeElapsed < duration) {
              window.requestAnimationFrame(animation);
            }
          };
          
          window.requestAnimationFrame(animation);
        }
      }
    });
  });
};
