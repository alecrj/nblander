import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Global animation settings
gsap.defaults({
  duration: 1,
  ease: "power2.out"
})

// Main application class
class NewBridgeLiving {
  constructor() {
    this.isLoaded = false
    this.currentTestimonial = 0
    this.testimonialTimer = null
    this.cursor = null
    this.progressRing = null
    
    this.init()
  }
  
  init() {
    this.setupCursor()
    this.setupProgressRing()
    this.setupHeroCanvas()
    this.setupInitialStates()
    this.initializeAnimations()
    this.bindEvents()
    
    // Mark as loaded
    setTimeout(() => {
      this.isLoaded = true
      document.body.classList.add('loaded')
    }, 100)
  }
  
  setupCursor() {
    this.cursor = document.querySelector('.cursor')
    
    if (window.innerWidth > 1024) {
      document.addEventListener('mousemove', this.updateCursor.bind(this))
      document.addEventListener('mouseenter', this.showCursor.bind(this), true)
      document.addEventListener('mouseleave', this.hideCursor.bind(this), true)
      
      // Add hover effects for interactive elements
      const interactiveElements = document.querySelectorAll('a, button, [data-magnetic]')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'))
        el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'))
      })
    }
  }
  
  updateCursor(e) {
    gsap.to(this.cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  showCursor() {
    this.cursor.classList.add('active')
  }
  
  hideCursor() {
    this.cursor.classList.remove('active')
  }
  
  setupProgressRing() {
    this.progressRing = document.querySelector('.progress-ring')
    const progressCircle = document.querySelector('.progress-ring-progress')
    const radius = progressCircle.r.baseVal.value
    const circumference = radius * 2 * Math.PI
    
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`
    progressCircle.style.strokeDashoffset = circumference
    
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress
        const offset = circumference - (progress * circumference)
        progressCircle.style.strokeDashoffset = offset
        
        if (progress > 0.1) {
          this.progressRing.classList.add('visible')
        } else {
          this.progressRing.classList.remove('visible')
        }
      }
    })
  }
  
  setupHeroCanvas() {
    const canvas = document.getElementById('heroCanvas')
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    let particles = []
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.1
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }
      
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      requestAnimationFrame(animate)
    }
    
    animate()
  }
  
  setupInitialStates() {
    // Set initial states for elements that will animate
    gsap.set('.hero-title .title-word', { y: '100%', opacity: 0 })
    gsap.set('.hero-subtitle', { y: 30, opacity: 0 })
    gsap.set('.hero-cta', { y: 30, opacity: 0 })
    gsap.set('.hero-scroll', { y: 30, opacity: 0 })
    
    // Bridge elements
    gsap.set('.bridge-deck', { 
      strokeDasharray: 1000,
      strokeDashoffset: 1000
    })
    gsap.set('.bridge-cables line', { 
      strokeDasharray: 100,
      strokeDashoffset: 100,
      opacity: 0 
    })
    gsap.set('.bridge-towers .tower', { scaleY: 0, transformOrigin: 'bottom' })
    
    // Philosophy cards
    gsap.set('.philosophy-card', { y: 60, opacity: 0 })
    
    // Timeline items
    gsap.set('.timeline-item', { x: (index) => index % 2 === 0 ? -60 : 60, opacity: 0 })
    gsap.set('.timeline-marker', { scale: 0 })
    
    // Living features
    gsap.set('.feature-item', { x: -30, opacity: 0 })
    gsap.set('.visual-scene .element', { scale: 0, rotation: -10 })
    
    // Text masks
    gsap.set('.title-mask', { overflow: 'hidden' })
    
    // Contact form elements
    gsap.set('.form-group', { y: 20, opacity: 0 })
    gsap.set('.contact-item', { x: 30, opacity: 0 })
  }
  
  initializeAnimations() {
    this.animateHero()
    this.animateNavigation()
    this.animateBridge()
    this.animatePhilosophy()
    this.animateApproach()
    this.animateCommunity()
    this.animateLiving()
    this.animateContact()
    this.animateTextMasks()
    this.setupMagneticElements()
    this.setupParallaxEffects()
  }
  
  animateHero() {
    const heroTimeline = gsap.timeline({ delay: 0.5 })
    
    heroTimeline
      .to('.hero-title .title-word', {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      })
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, '-=0.6')
      .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, '-=0.4')
      .to('.hero-scroll', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, '-=0.2')
    
    // Parallax background
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to('.hero-gradient', {
        yPercent: 50,
        ease: "none"
      })
    })
    
    // Fade out hero content
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      animation: gsap.to('.hero-content', {
        opacity: 0,
        y: -100,
        ease: "none"
      })
    })
  }
  
  animateNavigation() {
    const nav = document.querySelector('.nav')
    
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 90%',
      end: 'bottom 90%',
      onEnter: () => {
        gsap.to(nav, {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          duration: 0.3
        })
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          duration: 0.3
        })
      }
    })
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href').substring(1)
        const target = document.getElementById(targetId)
        
        if (target) {
          gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: target,
              offsetY: 80
            },
            ease: "power2.inOut"
          })
        }
      })
    })
  }
  
  animateBridge() {
    const bridgeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.bridge-section',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    })
    
    bridgeTimeline
      .to('.bridge-deck', {
        strokeDashoffset: 0,
        duration: 2,
        ease: "none"
      })
      .to('.bridge-towers .tower', {
        scaleY: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out"
      }, '-=1')
      .to('.bridge-cables line', {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, '-=0.5')
    
    // Bridge floating animation
    gsap.to('.bridge-svg', {
      y: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }
  
  animatePhilosophy() {
    gsap.utils.toArray('.philosophy-card').forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        animation: gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: index * 0.2,
          ease: "power3.out"
        })
      })
      
      // Hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.02,
          y: -8,
          duration: 0.6,
          ease: "power2.out"
        })
        
        gsap.to(card.querySelector('.card-visual div'), {
          scale: 1.1,
          rotation: 10,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        })
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        })
        
        gsap.to(card.querySelector('.card-visual div'), {
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        })
      })
    })
  }
  
  animateApproach() {
    // Animate timeline line
    ScrollTrigger.create({
      trigger: '.approach-timeline',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      animation: gsap.fromTo('.timeline-line', 
        { height: '0%' },
        { height: '100%', ease: "none" }
      )
    })
    
    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      const marker = item.querySelector('.timeline-marker')
      const content = item.querySelector('.timeline-content')
      
      ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        animation: gsap.timeline()
          .to(marker, {
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          })
          .to(item, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out"
          }, '-=0.4')
      })
      
      // Animate content elements
      const contentElements = content.querySelectorAll('h3, p, .timeline-meta')
      gsap.set(contentElements, { y: 20, opacity: 0 })
      
      ScrollTrigger.create({
        trigger: item,
        start: 'top 70%',
        animation: gsap.to(contentElements, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out"
        })
      })
    })
  }
  
  animateCommunity() {
    this.setupTestimonialSlider()
    
    // Animate testimonial cards entrance
    ScrollTrigger.create({
      trigger: '.community',
      start: 'top 70%',
      animation: gsap.fromTo('.testimonial-card',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      )
    })
  }
  
  setupTestimonialSlider() {
    const track = document.querySelector('.testimonials-track')
    const dots = document.querySelectorAll('.nav-dot')
    const testimonials = document.querySelectorAll('.testimonial-card')
    
    // Auto-rotate testimonials
    this.testimonialTimer = setInterval(() => {
      this.nextTestimonial()
    }, 5000)
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToTestimonial(index)
      })
    })
    
    // Initialize first testimonial
    this.updateTestimonialSlider()
  }
  
  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % 3
    this.updateTestimonialSlider()
  }
  
  goToTestimonial(index) {
    this.currentTestimonial = index
    this.updateTestimonialSlider()
    
    // Reset timer
    clearInterval(this.testimonialTimer)
    this.testimonialTimer = setInterval(() => {
      this.nextTestimonial()
    }, 5000)
  }
  
  updateTestimonialSlider() {
    const track = document.querySelector('.testimonials-track')
    const dots = document.querySelectorAll('.nav-dot')
    
    gsap.to(track, {
      x: `-${this.currentTestimonial * 100}%`,
      duration: 0.8,
      ease: "power2.inOut"
    })
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentTestimonial)
    })
  }
  
  animateLiving() {
    // Animate features
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        animation: gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power2.out"
        })
      })
    })
    
    // Animate visual scenes
    this.setupLivingVisual()
  }
  
  setupLivingVisual() {
    const scenes = document.querySelectorAll('.visual-scene')
    let currentScene = 0
    
    // Initialize elements
    scenes.forEach((scene, sceneIndex) => {
      const elements = scene.querySelectorAll('.element')
      
      if (sceneIndex === 0) {
        // Animate first scene on scroll trigger
        ScrollTrigger.create({
          trigger: '.living-visual',
          start: 'top 80%',
          animation: gsap.to(elements, {
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)"
          })
        })
      }
    })
    
    // Scene rotation
    setInterval(() => {
      this.switchLivingScene(currentScene, (currentScene + 1) % scenes.length)
      currentScene = (currentScene + 1) % scenes.length
    }, 4000)
  }
  
  switchLivingScene(from, to) {
    const scenes = document.querySelectorAll('.visual-scene')
    const fromScene = scenes[from]
    const toScene = scenes[to]
    
    // Fade out current scene
    gsap.to(fromScene, {
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        fromScene.classList.remove('active')
      }
    })
    
    // Fade in new scene
    setTimeout(() => {
      toScene.classList.add('active')
      const elements = toScene.querySelectorAll('.element')
      
      gsap.fromTo(toScene, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.inOut" }
      )
      
      gsap.fromTo(elements,
        { scale: 0, rotation: -10 },
        { 
          scale: 1, 
          rotation: 0, 
          duration: 1, 
          stagger: 0.1,
          ease: "elastic.out(1, 0.5)" 
        }
      )
    }, 300)
  }
  
  animateContact() {
    // Animate form groups
    gsap.utils.toArray('.form-group').forEach((group, index) => {
      ScrollTrigger.create({
        trigger: group,
        start: 'top 90%',
        animation: gsap.to(group, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out"
        })
      })
    })
    
    // Animate contact info
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        animation: gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power2.out"
        })
      })
    })
    
    // Form interactions
    this.setupFormInteractions()
  }
  
  setupFormInteractions() {
    const form = document.getElementById('contactForm')
    const inputs = form.querySelectorAll('input, select, textarea')
    
    inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        const line = e.target.nextElementSibling
        if (line && line.classList.contains('input-line')) {
          gsap.to(line, {
            width: '100%',
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })
      
      input.addEventListener('blur', (e) => {
        const line = e.target.nextElementSibling
        if (line && line.classList.contains('input-line') && !e.target.value) {
          gsap.to(line, {
            width: '0%',
            duration: 0.3,
            ease: "power2.out"
          })
        }
      })
    })
    
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.submitForm()
    })
  }
  
  submitForm() {
    const button = document.querySelector('.contact-form .btn-primary')
    const originalText = button.querySelector('.btn-text').textContent
    
    // Loading state
    gsap.to(button, {
      scale: 0.95,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {
        button.querySelector('.btn-text').textContent = 'Sending...'
        
        // Simulate form submission
        setTimeout(() => {
          button.querySelector('.btn-text').textContent = 'Message Sent!'
          gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)"
          })
          
          setTimeout(() => {
            button.querySelector('.btn-text').textContent = originalText
          }, 2000)
        }, 1500)
      }
    })
  }
  
  animateTextMasks() {
    gsap.utils.toArray('.title-mask').forEach(mask => {
      ScrollTrigger.create({
        trigger: mask,
        start: 'top 80%',
        animation: gsap.fromTo(mask,
          { 
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
          },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: "power2.inOut"
          }
        )
      })
    })
  }
  
  setupMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]')
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.8,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)"
        })
      })
    })
  }
  
  setupParallaxEffects() {
    // Subtle parallax for section backgrounds
    gsap.utils.toArray('.approach-bg, .contact-bg').forEach(bg => {
      ScrollTrigger.create({
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.to(bg, {
          yPercent: 20,
          ease: "none"
        })
      })
    })
    
    // Philosophy cards parallax
    gsap.utils.toArray('.philosophy-card').forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        animation: gsap.to(card, {
          y: (index % 2 === 0 ? -1 : 1) * 50,
          ease: "none"
        })
      })
    })
  }
  
  bindEvents() {
    // Resize handler
    window.addEventListener('resize', this.debounce(() => {
      ScrollTrigger.refresh()
    }, 250))
    
    // Visibility change handler
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(this.testimonialTimer)
      } else {
        this.testimonialTimer = setInterval(() => {
          this.nextTestimonial()
        }, 5000)
      }
    })
  }
  
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new NewBridgeLiving()
})

// Performance optimizations
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
})

// Optimize for mobile
if (window.innerWidth <= 768) {
  ScrollTrigger.config({
    ignoreMobileResize: true
  })
}

// Preloader
window.addEventListener('load', () => {
  gsap.to('.preloader', {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      const preloader = document.querySelector('.preloader')
      if (preloader) {
        preloader.remove()
      }
    }
  })
})

// Export for debugging
window.ScrollTrigger = ScrollTrigger
window.gsap = gsap