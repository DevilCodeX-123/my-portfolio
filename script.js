import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';

const FloatingShape = () => {
  const meshRef = useRef();
  
  // Subtle rotation and parallax logic
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.cos(t / 4) / 8;
    meshRef.current.rotation.y = Math.sin(t / 4) / 8;
    meshRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

export const HeroScene = () => (
  <div className="absolute inset-0 -z-10">
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} color="purple" intensity={1} />
      <FloatingShape />
    </Canvas>
  </div>
);
import { motion } from 'framer-motion';

const Portfolio = () => {
  return (
    <div className="bg-[#030712] text-white min-h-screen font-sans selection:bg-indigo-500">
      <HeroScene />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          DESIGNER.IO
        </h1>
        <div className="space-x-8 text-sm uppercase tracking-widest opacity-80">
          {['About', 'Projects', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item}`} className="hover:text-indigo-400 transition-colors">{item}</a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="About" className="h-screen flex items-center px-10 md:px-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <span className="text-indigo-500 font-mono mb-4 block">01. INTRODUCTION</span>
          <h2 className="text-7xl font-black mb-6 leading-tight">Crafting Digital <br/> Dimensions.</h2>
          <p className="text-gray-400 text-lg">Full-stack creative specializing in 3D web experiences and immersive UI design.</p>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section id="Projects" className="py-32 px-10 md:px-24">
        <h3 className="text-4xl font-bold mb-16">Selected Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-6 rounded-3xl h-80 flex flex-col justify-end group cursor-pointer"
            >
              <div className="overflow-hidden rounded-xl mb-4 h-40 bg-indigo-900/20">
                {/* Image or 3D canvas would go here */}
              </div>
              <h4 className="text-xl font-bold">Project Neo-0{i}</h4>
              <p className="text-sm text-gray-400">Interaction Design / Three.js</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section with Glow Effects */}
      <section id="Skills" className="py-32 bg-indigo-950/10">
        <div className="text-center mb-20">
          <h3 className="text-4xl font-bold italic">Technologies</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {['React', 'Three.js', 'WebGL', 'Tailwind', 'GSAP', 'Framer'].map(skill => (
            <div key={skill} className="px-8 py-4 rounded-full border border-white/10 hover:bg-indigo-600/20 hover:border-indigo-500/50 transition-all duration-300">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};