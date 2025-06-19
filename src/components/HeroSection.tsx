import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Floating geometric shapes
    const shapes: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      color: string;
      opacity: number;
      type: 'cube' | 'pyramid' | 'sphere';
      velocity: { x: number; y: number; z: number };
    }> = [];

    // Create shapes
    const colors = [
      'rgba(139, 92, 246, 0.8)', // Purple
      'rgba(99, 102, 241, 0.8)', // Indigo
      'rgba(236, 72, 153, 0.8)', // Pink
      'rgba(59, 130, 246, 0.8)', // Blue
      'rgba(168, 85, 247, 0.8)', // Violet
    ];

    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 60 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.7 + 0.3,
        type: ['cube', 'pyramid', 'sphere'][Math.floor(Math.random() * 3)] as 'cube' | 'pyramid' | 'sphere',
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
          z: (Math.random() - 0.5) * 2,
        },
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.velocity.x;
        shape.y += shape.velocity.y;
        shape.z += shape.velocity.z;
        shape.rotation += shape.rotationSpeed;

        // Wrap around screen
        if (shape.x > canvas.width + 100) shape.x = -100;
        if (shape.x < -100) shape.x = canvas.width + 100;
        if (shape.y > canvas.height + 100) shape.y = -100;
        if (shape.y < -100) shape.y = canvas.height + 100;
        if (shape.z > 1000) shape.z = -200;
        if (shape.z < -200) shape.z = 1000;

        // Calculate perspective
        const perspective = 800;
        const scale = perspective / (perspective + shape.z);
        const x = shape.x * scale + (canvas.width * (1 - scale)) / 2;
        const y = shape.y * scale + (canvas.height * (1 - scale)) / 2;
        const size = shape.size * scale;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(shape.rotation);
        ctx.globalAlpha = shape.opacity * scale;

        // Draw different shapes
        if (shape.type === 'cube') {
          drawCube(ctx, size, shape.color);
        } else if (shape.type === 'pyramid') {
          drawPyramid(ctx, size, shape.color);
        } else {
          drawSphere(ctx, size, shape.color);
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    // Shape drawing functions
    const drawCube = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      const gradient = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color.replace('0.8', '0.4'));
      
      ctx.fillStyle = gradient;
      ctx.fillRect(-size/2, -size/2, size, size);
      
      // Add border
      ctx.strokeStyle = color.replace('0.8', '1');
      ctx.lineWidth = 2;
      ctx.strokeRect(-size/2, -size/2, size, size);
    };

    const drawPyramid = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size/2);
      ctx.lineTo(-size/2, size/2);
      ctx.lineTo(size/2, size/2);
      ctx.closePath();
      ctx.fill();
      
      ctx.strokeStyle = color.replace('0.8', '1');
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawSphere = (ctx: CanvasRenderingContext2D, size: number, color: string) => {
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size/2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color.replace('0.8', '0.2'));
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, size/2, 0, Math.PI * 2);
      ctx.fill();
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-indigo-900/20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span className="text-white/90 text-sm font-medium">Transform Your Future with upLern</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          <span className="text-white">Learn from the</span>
          <br />
          <span className="text-white">Experts</span>
          <br />
          <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-transparent bg-clip-text animate-pulse">
            Elevate Your Skills
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
          Unlock your full potential with our comprehensive online courses. 
          Dive into a world of knowledge and transform your career with our 
          expertly-designed learning experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-600">
          <Link 
            to="/courses"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Start Learning Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/premium-pass"
            className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Get Premium Pass
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-800">
          {[
            { number: '10K+', label: 'Students' },
            { number: '50+', label: 'Courses' },
            { number: '95%', label: 'Success Rate' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-white/70 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-2xl backdrop-blur-sm animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-pink-400/30 to-yellow-400/30 rounded-xl backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-40 w-24 h-24 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-3xl backdrop-blur-sm animate-float" style={{ animationDelay: '0.5s' }}></div>
    </section>
  );
};

export default HeroSection;