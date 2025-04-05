/**
 * Wanderlust Travel Website
 * Main JavaScript file
 */

document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenu = document.getElementById("mobile-menu")
    const navMenu = document.querySelector(".nav-menu")
  
    if (mobileMenu) {
      mobileMenu.addEventListener("click", () => {
        mobileMenu.classList.toggle("active")
        navMenu.classList.toggle("active")
  
        // Toggle menu icon
        const bars = mobileMenu.querySelectorAll(".bar")
        if (navMenu.classList.contains("active")) {
          bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)"
          bars[1].style.opacity = "0"
          bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)"
        } else {
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        }
      })
    }
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (navMenu && navMenu.classList.contains("active") && !event.target.closest(".navbar")) {
        navMenu.classList.remove("active")
        if (mobileMenu) {
          mobileMenu.classList.remove("active")
          const bars = mobileMenu.querySelectorAll(".bar")
          bars[0].style.transform = "none"
          bars[1].style.opacity = "1"
          bars[2].style.transform = "none"
        }
      }
    })
  
    // Destination slider controls
    const destinationSlider = document.getElementById("destinationSlider")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
  
    if (destinationSlider && prevBtn && nextBtn) {
      const cardWidth = 300 + 24 // card width + gap
  
      prevBtn.addEventListener("click", () => {
        destinationSlider.scrollBy({
          left: -cardWidth,
          behavior: "smooth",
        })
      })
  
      nextBtn.addEventListener("click", () => {
        destinationSlider.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        })
      })
    }
  
    // Testimonial slider
    const testimonialSlider = document.getElementById("testimonialSlider")
    const testimonialDots = document.getElementById("testimonialDots")
  
    if (testimonialSlider && testimonialDots) {
      const dots = testimonialDots.querySelectorAll(".dot")
      let currentSlide = 0
  
      // Function to show a specific slide
      function showSlide(index) {
        const testimonials = testimonialSlider.querySelectorAll(".testimonial-card")
  
        // Hide all testimonials
        testimonials.forEach((testimonial) => {
          testimonial.style.display = "none"
        })
  
        // Remove active class from all dots
        dots.forEach((dot) => {
          dot.classList.remove("active")
        })
  
        // Show the selected testimonial and activate the corresponding dot
        testimonials[index].style.display = "block"
        dots[index].classList.add("active")
        currentSlide = index
      }
  
      // Initialize the slider
      showSlide(0)
  
      // Add click event to dots
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index)
        })
      })
  
      // Auto-rotate testimonials
      setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length
        showSlide(currentSlide)
      }, 5000)
    }
  
    // Newsletter form submission
    const newsletterForm = document.getElementById("newsletterForm")
    const newsletterSuccess = document.getElementById("newsletterSuccess")
  
    if (newsletterForm && newsletterSuccess) {
      newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault()
  
        // Simulate form submission
        const emailInput = newsletterForm.querySelector('input[type="email"]')
        if (emailInput && emailInput.value) {
          // Hide the form and show success message
          newsletterForm.style.display = "none"
          newsletterSuccess.classList.remove("hidden")
  
          // Reset form
          newsletterForm.reset()
  
          // For demo purposes, reset after 5 seconds
          setTimeout(() => {
            newsletterForm.style.display = "flex"
            newsletterSuccess.classList.add("hidden")
          }, 5000)
        }
      })
    }
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          })
  
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active")
            if (mobileMenu) {
              mobileMenu.classList.remove("active")
              const bars = mobileMenu.querySelectorAll(".bar")
              bars[0].style.transform = "none"
              bars[1].style.opacity = "1"
              bars[2].style.transform = "none"
            }
          }
        }
      })
    })
  
    // Animate elements on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".feature-card, .destination-card, .plan-card, .value-card, .team-member",
      )
  
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
  
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1"
          element.style.transform = "translateY(0)"
        }
      })
    }
  
    // Initialize animation
    window.addEventListener("scroll", animateOnScroll)
    animateOnScroll() // Run once on page load
  })
  
  