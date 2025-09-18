import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

interface Shape {
  x: number;
  y: number;
  size: number;
  type: 'triangle' | 'square' | 'circle';
  color: string;
  dx: number;
  dy: number;
  opacity: number;
}

interface AnimatedBackgroundProps {
  theme?: 'squid-game' | 'blue';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ theme = 'squid-game' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapesRef = useRef<Shape[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize shapes
    const initShapes = () => {
      const shapes: Shape[] = [];
      const colors = theme === 'squid-game' 
        ? ['#dc4242', '#f48fb1', '#ff1744']
        : ['#1244c8', '#4572e6', '#2196f3'];
      
      const shapeTypes: ('triangle' | 'square' | 'circle')[] = ['triangle', 'square', 'circle'];
      
      for (let i = 0; i < 20; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 30 + Math.random() * 40,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
          opacity: 0.2 + Math.random() * 0.3,
        });
      }
      shapesRef.current = shapes;
    };

    const drawShape = (shape: Shape) => {
      ctx.save();
      ctx.globalAlpha = shape.opacity;
      ctx.fillStyle = shape.color;
      
      ctx.translate(shape.x, shape.y);
      
      switch (shape.type) {
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(-shape.size / 2, shape.size / 2);
          ctx.lineTo(shape.size / 2, shape.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'square':
          ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      shapesRef.current.forEach(shape => {
        // Update position
        shape.x += shape.dx;
        shape.y += shape.dy;
        
        // Bounce off edges
        if (shape.x < 0 || shape.x > canvas.width) shape.dx *= -1;
        if (shape.y < 0 || shape.y > canvas.height) shape.dy *= -1;
        
        // Keep shapes within bounds
        shape.x = Math.max(0, Math.min(canvas.width, shape.x));
        shape.y = Math.max(0, Math.min(canvas.height, shape.y));
        
        drawShape(shape);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initShapes();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  const gradientClass = theme === 'squid-game' ? 'squid-game-gradient' : 'blue-gradient';

  return (
    <div className={`animated-background ${gradientClass}`}>
      <canvas ref={canvasRef} className="shapes-canvas" />
    </div>
  );
};

export default AnimatedBackground;