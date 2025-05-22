document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  if (prefersDarkScheme.matches) {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
    }
  });

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else if (savedTheme === "light") {
    body.classList.remove("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navActions = document.querySelector(".nav-actions");

  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.style.display === "flex";

    if (isOpen) {
      navLinks.style.display = "none";
      navActions.style.display = "none";
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      navLinks.style.display = "flex";
      navActions.style.display = "flex";
      menuToggle.innerHTML = '<i class="fas fa-times"></i>';

      if (window.innerWidth < 768) {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "100%";
        navLinks.style.left = "0";
        navLinks.style.right = "0";
        navLinks.style.backgroundColor = "var(--card-bg)";
        navLinks.style.padding = "1rem";
        navLinks.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

        navActions.style.flexDirection = "column";
        navActions.style.position = "absolute";
        navActions.style.top = "calc(100% + " + navLinks.offsetHeight + "px)";
        navActions.style.left = "0";
        navActions.style.right = "0";
        navActions.style.backgroundColor = "var(--card-bg)";
        navActions.style.padding = "1rem";
        navActions.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        navActions.style.gap = "0.5rem";
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) {
      navLinks.style.display = "flex";
      navActions.style.display = "flex";
      navLinks.style.flexDirection = "row";
      navLinks.style.position = "static";
      navLinks.style.backgroundColor = "transparent";
      navLinks.style.padding = "0";
      navLinks.style.boxShadow = "none";

      navActions.style.flexDirection = "row";
      navActions.style.position = "static";
      navActions.style.backgroundColor = "transparent";
      navActions.style.padding = "0";
      navActions.style.boxShadow = "none";
      navActions.style.gap = "1rem";

      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    } else {
      navLinks.style.display = "none";
      navActions.style.display = "none";
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        if (window.innerWidth < 768) {
          navLinks.style.display = "none";
          navActions.style.display = "none";
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".course-card, .feature-card, .testimonial-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  const animatedElements = document.querySelectorAll(
    ".course-card, .feature-card, .testimonial-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
});
