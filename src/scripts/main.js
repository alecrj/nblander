import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Global animation settings
gsap.defaults({
  duration: 0.8,
  ease: "power2.out"
})

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
    
    if (window.innerWidth > 1024 && this.cursor) {
      document.addEventListener('mousemove', this.updateCursor.bind(this))
      
      const interactiveElements = document.querySelectorAll('a, button, [data-magnetic], .philosophy-card')
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'))
        el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'))
      })
      
      this.cursor.classList.add('active')
    }
  }
  
  updateCursor(e) {
    if (!this.cursor) return
    
    gsap.to(this.cursor, {
      x: e.clientX - 10,
      y: e.clientY - 10,
      duration: 0.1,
      ease: "none"
    })
  }
  
  setupProgressRing() {
    this.progressRing = document.querySelector('.progress-ring')
    if (!this.progressRing) return
    
    const progressCircle = document.querySelector('.progress-ring-progress')
    if (!progressCircle) return
    
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
        
        if (progress > 0.05) {
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
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.3
        this.speedY = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.4 + 0.1
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
    
    for (let i = 0; i < 40; i++) {
      particles.push(new Particle())
    }
    
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
    // Hero elements
    gsap.set('.hero-title .title-word', { y: 100, opacity: 0, rotationX: 45 })
    gsap.set('.hero-subtitle', { y: 40, opacity: 0 })
    gsap.set('.hero-cta', { y: 40, opacity: 0 })
    gsap.set('.hero-scroll', { y: 20, opacity: 0 })
    
    // Bridge elements
    gsap.set('.bridge-deck', { 
      strokeDasharray: "2000 2000",
      strokeDashoffset: 2000
    })
    gsap.set('.bridge-cables line', { 
      strokeDasharray: "200 200",
      strokeDashoffset: 200,
      opacity: 0 
    })
    gsap.set('.bridge-towers .tower', { scaleY: 0, transformOrigin: 'bottom' })
    
    // Section content
    gsap.set('.section-title .title-mask', { 
      clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
    })
    gsap.set('.section-subtitle', { y: 50, opacity: 0 })
    gsap.set('.philosophy-card', { y: 100, opacity: 0, scale: 0.85 })
    gsap.set('.timeline-item', { y: 80, opacity: 0 })
    gsap.set('.timeline-marker', { scale: 0 })
    gsap.set('.feature-item', { x: -60, opacity: 0 })
    gsap.set('.testimonial-card', { y: 80, opacity: 0 })
    gsap.set('.form-group', { y: 50, opacity: 0 })
    gsap.set('.contact-item', { x: 60, opacity: 0 })
    gsap.set('.visual-scene .element', { scale: 0.6, opacity: 0, rotation: -20 })
  }
  
  initializeAnimations() {
    this.animateHero()
    this.animateNavigation()
    this.animateBridge()
    this.animateTextMasks()
    this.animateSubtitles()
    this.animatePhilosophy()
    this.animateApproach()
    this.animateCommunity()
    this.animateLiving()
    this.animateContact()
    this.setupMagneticElements()
    this.setupParallaxEffects()
  }
  
  animateHero() {
    const heroTl = gsap.timeline({ delay: 0.2 })
    
    heroTl
      .to('.hero-title .title-word', {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "back.out(1.4)"
      })
      .to('.hero-subtitle', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, '-=0.8')
      .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      }, '-=0.6')
      .to('.hero-scroll', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      }, '-=0.4')
    
    // Enhanced parallax with multiple layers
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.3,
      animation: gsap.timeline()
        .to('.hero-gradient', { 
          yPercent: 40, 
          scale: 1.1,
          ease: "none" 
        })
        .to('.hero-content', { 
          opacity: 0.1, 
          y: -100,
          scale: 0.95,
          ease: "none" 
        }, 0)
        .to('.hero-particles', {
          yPercent: 20,
          ease: "none"
        }, 0)
    })
  }
  
  animateNavigation() {
    const nav = document.querySelector('.nav')
    
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom 95%',
      end: 'bottom 95%',
      onEnter: () => {
        gsap.to(nav, {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          duration: 0.3
        })
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(16px)',
          duration: 0.3
        })
      }
    })
    
    // Smooth scroll navigation
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href').substring(1)
        const target = document.getElementById(targetId)
        
        if (target) {
          gsap.to(window, {
            duration: 1.2,
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
    ScrollTrigger.create({
      trigger: '.bridge-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.8,
      animation: gsap.timeline()
        .to('.bridge-deck', {
          strokeDashoffset: 0,
          duration: 3,
          ease: "none"
        })
        .to('.bridge-towers .tower', {
          scaleY: 1,
          duration: 2,
          stagger: 0.2,
          ease: "none"
        }, '-=2')
        .to('.bridge-cables line', {
          strokeDashoffset: 0,
          opacity: 0.8,
          duration: 2,
          stagger: 0.1,
          ease: "none"
        }, '-=1.5')
    })
    
    // Floating animation
    gsap.to('.bridge-svg', {
      y: 10,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }
  
  animateTextMasks() {
    gsap.utils.toArray('.section-title .title-mask').forEach(mask => {
      ScrollTrigger.create({
        trigger: mask.closest('section'),
        start: 'top bottom',
        end: 'top 50%',
        scrub: 0.8,
        animation: gsap.fromTo(mask, {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        }, {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          ease: "none"
        })
      })
    })
  }
  
  animateSubtitles() {
    gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
      ScrollTrigger.create({
        trigger: subtitle,
        start: 'top bottom',
        end: 'top 60%',
        scrub: 0.6,
        animation: gsap.fromTo(subtitle, {
          y: 50,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          ease: "none"
        })
      })
    })
  }
  
  animatePhilosophy() {
    gsap.utils.toArray('.philosophy-card').forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom',
        end: 'top 40%',
        scrub: 0.6,
        animation: gsap.fromTo(card, {
          y: 100,
          opacity: 0,
          scale: 0.85
        }, {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "none"
        })
      })
      
      // Enhanced hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -15,
          scale: 1.03,
          duration: 0.6,
          ease: "power3.out"
        })
        
        const visual = card.querySelector('.card-visual div')
        if (visual) {
          gsap.to(visual, {
            scale: 1.2,
            rotation: 15,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          })
        }
      })
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        })
        
        const visual = card.querySelector('.card-visual div')
        if (visual) {
          gsap.to(visual, {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
          })
        }
      })
    })
  }
  
  animateApproach() {
    // Timeline line that follows scroll
    ScrollTrigger.create({
      trigger: '.approach-timeline',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.5,
      animation: gsap.fromTo('.timeline-line', 
        { height: '0%' },
        { height: '100%', ease: "none" }
      )
    })
    
    // Timeline items that animate as they come into view
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
      const marker = item.querySelector('.timeline-marker')
      const contentElements = item.querySelectorAll('h3, p, .timeline-meta')
      
      // Set initial states
      gsap.set(contentElements, { y: 30, opacity: 0 })
      
      ScrollTrigger.create({
        trigger: item,
        start: 'top bottom',
        end: 'top 30%',
        scrub: 0.6,
        animation: gsap.timeline()
          .fromTo(marker, {
            scale: 0
          }, {
            scale: 1,
            ease: "none"
          })
          .fromTo(item, {
            y: 80,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            ease: "none"
          }, 0)
          .fromTo(contentElements, {
            y: 30,
            opacity: 0
          }, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            ease: "none"
          }, 0.3)
      })
    })
  }
  
  animateCommunity() {
    this.setupTestimonialSlider()
    
    ScrollTrigger.create({
      trigger: '.community',
      start: 'top bottom',
      end: 'top 40%',
      scrub: 0.6,
      animation: gsap.timeline()
        .fromTo('.testimonial-card', {
          y: 80,
          opacity: 0
        }, {
          y: 0,
          opacity: 1,
          ease: "none"
        })
        .fromTo('.testimonials-nav .nav-dot', {
          scale: 0,
          opacity: 0
        }, {
          scale: 1,
          opacity: 1,
          stagger: 0.02,
          ease: "none"
        }, 0.5)
    })
  }
  
  setupTestimonialSlider() {
    const track = document.querySelector('.testimonials-track')
    const dots = document.querySelectorAll('.nav-dot')
    
    if (!track || !dots.length) return
    
    this.testimonialTimer = setInterval(() => {
      this.nextTestimonial()
    }, 5000)
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToTestimonial(index)
      })
    })
    
    this.updateTestimonialSlider()
  }
  
  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % 3
    this.updateTestimonialSlider()
  }
  
  goToTestimonial(index) {
    this.currentTestimonial = index
    this.updateTestimonialSlider()
    
    clearInterval(this.testimonialTimer)
    this.testimonialTimer = setInterval(() => {
      this.nextTestimonial()
    }, 5000)
  }
  
  updateTestimonialSlider() {
    const track = document.querySelector('.testimonials-track')
    const dots = document.querySelectorAll('.nav-dot')
    
    if (!track) return
    
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
    gsap.utils.toArray('.feature-item').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        animation: gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out"
        })
      })
    })
    
    this.setupLivingVisual()
  }
  
  setupLivingVisual() {
    const scenes = document.querySelectorAll('.visual-scene')
    if (!scenes.length) return
    
    let currentScene = 0
    
    ScrollTrigger.create({
      trigger: '.living-visual',
      start: 'top 80%',
      animation: gsap.to('.visual-scene.active .element', {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.3)"
      })
    })
    
    const rotateScenes = () => {
      const nextScene = (currentScene + 1) % scenes.length
      this.switchLivingScene(currentScene, nextScene)
      currentScene = nextScene
      setTimeout(rotateScenes, 4000)
    }
    
    setTimeout(rotateScenes, 3000)
  }
  
  switchLivingScene(from, to) {
    const scenes = document.querySelectorAll('.visual-scene')
    const fromScene = scenes[from]
    const toScene = scenes[to]
    
    if (!fromScene || !toScene) return
    
    gsap.timeline()
      .to(fromScene, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.inOut"
      })
      .call(() => {
        fromScene.classList.remove('active')
        toScene.classList.add('active')
      })
      .fromTo(toScene, 
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.inOut" }
      )
      .fromTo(toScene.querySelectorAll('.element'),
        { scale: 0.7, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1,
          ease: "back.out(1.3)" 
        },
        '-=0.3'
      )
  }
  
  animateContact() {
    gsap.utils.toArray('.form-group').forEach((group, index) => {
      ScrollTrigger.create({
        trigger: group,
        start: 'top 90%',
        animation: gsap.to(group, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.05,
          ease: "power2.out"
        })
      })
    })
    
    gsap.utils.toArray('.contact-item').forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        animation: gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out"
        })
      })
    })
    
    this.setupFormInteractions()
  }
  
  setupFormInteractions() {
    const form = document.getElementById('contactForm')
    if (!form) return
    
    const inputs = form.querySelectorAll('input, select, textarea')
    
    inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        const line = e.target.nextElementSibling
        if (line && line.classList.contains('input-line')) {
          gsap.to(line, {
            width: '100%',
            duration: 0.4,
            ease: "power2.out"
          })
        }
      })
      
      input.addEventListener('blur', (e) => {
        const line = e.target.nextElementSibling
        if (line && line.classList.contains('input-line') && !e.target.value) {
          gsap.to(line, {
            width: '0%',
            duration: 0.4,
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
    if (!button) return
    
    const btnText = button.querySelector('.btn-text')
    const originalText = btnText.textContent
    
    gsap.timeline()
      .to(button, {
        scale: 0.95,
        duration: 0.2,
        ease: "power2.out"
      })
      .call(() => {
        btnText.textContent = 'Sending...'
      })
      .to(button, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      })
      .to({}, { duration: 1.5 })
      .call(() => {
        btnText.textContent = 'Message Sent!'
      })
      .to({}, { duration: 2 })
      .call(() => {
        btnText.textContent = originalText
      })
  }
  
  setupMagneticElements() {
    const magneticElements = document.querySelectorAll('[data-magnetic]')
    
    magneticElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        
        gsap.to(element, {
          x: x * 0.25,
          y: y * 0.25,
          rotation: x * 0.05,
          duration: 0.6,
          ease: "power2.out"
        })
      })
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)"
        })
      })
    })
  }
  
  setupParallaxEffects() {
    // Enhanced background parallax
    gsap.utils.toArray('.approach-bg, .contact-bg').forEach(bg => {
      ScrollTrigger.create({
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.3,
        animation: gsap.fromTo(bg, {
          yPercent: -20
        }, {
          yPercent: 20,
          ease: "none"
        })
      })
    })
    
    // Philosophy cards micro-parallax
    gsap.utils.toArray('.philosophy-card').forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.2,
        animation: gsap.fromTo(card, {
          y: (index % 2 === 0 ? -20 : 20)
        }, {
          y: (index % 2 === 0 ? 20 : -20),
          ease: "none"
        })
      })
    })
    
    // Bridge section parallax
    ScrollTrigger.create({
      trigger: '.bridge-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.2,
      animation: gsap.fromTo('.bridge-container', {
        yPercent: -10
      }, {
        yPercent: 10,
        ease: "none"
      })
    })
  }
  
  bindEvents() {
    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 150)
    })
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.testimonialTimer) clearInterval(this.testimonialTimer)
      } else if (this.isLoaded) {
        this.testimonialTimer = setInterval(() => {
          this.nextTestimonial()
        }, 5000)
      }
    })
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new NewBridgeLiving()
})

// Performance optimization
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
})

// Export for debugging
window.ScrollTrigger = ScrollTrigger
window.gsap = gsap