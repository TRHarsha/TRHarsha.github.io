import { useEffect, useRef } from 'react';
import { usePersona } from '../context/PersonaProvider';
import { useTheme } from '../context/ThemeProvider';

export default function VisualBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { persona } = usePersona();
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation parameters
    const particles: Particle[] = [];
    const particleCount = 50;
    
    // Colors based on persona
    let particleColor = '';
    let maxSpeed = 0;
    let particleSize = 0;
    let trailLength = 0;
    
    // Different visual for each persona
    switch (persona) {
      case 'ai-engineer':
        particleColor = theme === 'dark' ? 'rgba(96, 165, 250, ' : 'rgba(59, 130, 246, ';
        maxSpeed = 1;
        particleSize = 3;
        trailLength = 5;
        break;
      case 'full-stack':
        particleColor = theme === 'dark' ? 'rgba(167, 139, 250, ' : 'rgba(139, 92, 246, ';
        maxSpeed = 1.5;
        particleSize = 2;
        trailLength = 8;
        break;
      case 'researcher':
        particleColor = theme === 'dark' ? 'rgba(45, 212, 191, ' : 'rgba(20, 184, 166, ';
        maxSpeed = 0.7;
        particleSize = 4;
        trailLength = 3;
        break;
    }
    
    // Initialize particles
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      
      constructor() {
        this.x = Math.random() * canvas.offsetWidth;
        this.y = Math.random() * canvas.offsetHeight;
        this.size = Math.random() * particleSize + 1;
        this.speedX = (Math.random() - 0.5) * maxSpeed;
        this.speedY = (Math.random() - 0.5) * maxSpeed;
      }
      
      update() {
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off walls
        if (this.x < 0 || this.x > canvas.offsetWidth) {
          this.speedX = -this.speedX;
        }
        
        if (this.y < 0 || this.y > canvas.offsetHeight) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particleColor}0.8)`;
        ctx.fill();
        
        // Draw trail
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * trailLength, this.y - this.speedY * trailLength);
        ctx.strokeStyle = `${particleColor}0.3)`;
        ctx.lineWidth = this.size / 2;
        ctx.stroke();
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${particleColor}${0.1 - distance/1000})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [persona, theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.3 }}
    />
  );
}