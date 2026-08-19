import { useEffect, useRef, useState } from 'react';
import { ChevronRight, TrendingUp, BarChart, Target, Compass, Flame, Loader2, CheckCircle2 } from 'lucide-react';
import './index.css';

const FadeInSection = ({ children, id, setActiveSection, sectionIndex }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          setActiveSection(sectionIndex);
        }
      });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [setActiveSection, sectionIndex]);

  return (
    <div
      id={id}
      className="fade-in-section min-h-screen flex flex-col justify-center py-20 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto"
      ref={domRef}
    >
      {children}
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Konami Code Easter Egg State
  const [easterEggActive, setEasterEggActive] = useState(false);
  
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let keySequence = [];
    
    const handleKeyDown = (e) => {
      keySequence.push(e.key);
      keySequence = keySequence.slice(-10);
      
      if (keySequence.join(',') === konamiCode.join(',')) {
        setEasterEggActive(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // The character's upward movement based on section
  const characterBottomPos = 10 + (activeSection * 12); // moves up as we scroll

  const handleAnalyze = () => {
    if (analysisComplete) {
      document.getElementById('recognize')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setIsAnalyzing(true);
    // Simulate API call and analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      // Auto-scroll to the next section to show the "Aha" moment
      setTimeout(() => {
        document.getElementById('recognize')?.scrollIntoView({ behavior: 'smooth' });
      }, 600);
    }, 1800);
  };

  return (
    <div className={`relative min-h-screen text-gray-100 font-sans overflow-hidden transition-colors duration-1000 ${easterEggActive ? 'easter-egg-mode' : ''}`}>
      
      {/* Background Texture & Glows */}
      <div className="bg-grid"></div>
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xl font-bold text-white tracking-wide">
          <Flame className={easterEggActive ? 'text-[#00f3ff] drop-shadow-[0_0_10px_rgba(0,242,255,0.8)] transition-colors duration-1000' : 'text-[#ff5e00] transition-colors duration-1000'} size={24} />
          PathFinder
        </div>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#" className="hover:text-white transition-colors">Products</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Resources</a>
          <a href="#" className="hover:text-white transition-colors">Partners</a>
          <a href="#" className="hover:text-white transition-colors">Why PathFinder</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</button>
          <button className="px-5 py-2 rounded-full text-sm font-bold text-white btn-fire">Sign up for free</button>
        </div>
      </header>

      {/* Fixed Character, Staircase Visual Metaphor, and Floating Nodes */}
      <div className="fixed right-0 top-0 w-full h-full pointer-events-none z-0 flex items-center justify-center lg:justify-end opacity-60 lg:opacity-80">
        <div className="relative w-full max-w-2xl h-full hidden md:block">
           
           {/* Neural Network / Circuit Lines */}
           <svg className="absolute w-full h-full transition-all duration-1000" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Main Path */}
             <path 
                d="M100,100 L100,80 L80,80 L80,60 L60,60 L60,40 L40,40 L40,20 L20,20" 
                fill="none" 
                stroke={easterEggActive ? "url(#blueGradient)" : "url(#fireGradient)"} 
                strokeWidth="0.5" 
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: easterEggActive ? 'drop-shadow(0 0 6px rgba(0,242,255,0.9))' : 'drop-shadow(0 0 6px rgba(255,94,0,0.9))' }}
                className="transition-all duration-1000"
             />
             {/* Branching connection lines to fill empty space */}
             <path d="M10,80 L30,80 L30,65 L45,65" fill="none" stroke={easterEggActive ? "rgba(0,242,255,0.5)" : "rgba(255,94,0,0.3)"} strokeWidth="0.2" className="transition-all duration-1000" />
             <path d="M90,20 L75,20 L75,35 L60,35" fill="none" stroke={easterEggActive ? "rgba(0,242,255,0.5)" : "rgba(255,94,0,0.3)"} strokeWidth="0.2" className="transition-all duration-1000" />
             <path d="M20,40 L30,40 L30,55" fill="none" stroke={easterEggActive ? "rgba(0,242,255,0.5)" : "rgba(255,94,0,0.3)"} strokeWidth="0.2" className="transition-all duration-1000" />
             <path d="M80,95 L65,95 L65,80" fill="none" stroke={easterEggActive ? "rgba(0,242,255,0.5)" : "rgba(255,94,0,0.3)"} strokeWidth="0.2" className="transition-all duration-1000" />
             
             <defs>
                <linearGradient id="fireGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#c22900" />
                  <stop offset="50%" stopColor="#ff5e00" />
                  <stop offset="100%" stopColor="#ff9100" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0011ff" />
                  <stop offset="50%" stopColor="#0077ff" />
                  <stop offset="100%" stopColor="#00f3ff" />
                </linearGradient>
             </defs>
           </svg>

           {/* Floating Background Nodes */}
           <div className="absolute top-[20%] right-[10%] w-12 h-12 floating-node text-lg font-bold">S.</div>
           <div className="absolute top-[35%] right-[40%] w-12 h-12 floating-node text-lg font-bold">AI</div>
           <div className="absolute top-[65%] left-[55%] w-12 h-12 floating-node text-lg font-bold">M</div>
           <div className="absolute top-[80%] left-[10%] w-12 h-12 floating-node text-lg font-bold">A</div>
           <div className="absolute top-[40%] left-[20%] w-12 h-12 floating-node text-lg font-bold">X</div>
           <div className="absolute top-[95%] right-[20%] w-12 h-12 floating-node text-lg font-bold">G</div>

           {/* Character Silhouette - Glowing Ember */}
           <div 
             className="absolute w-4 h-4 rounded-full ember transition-all duration-1000 ease-out"
             style={{ 
               bottom: `${characterBottomPos}%`, 
               right: `${characterBottomPos}%`,
               transform: `translate(50%, 50%) ${easterEggActive ? 'scale(1.5)' : 'scale(1)'}`,
               backgroundColor: '#ffffff'
             }}
           ></div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10 w-full md:w-2/3 lg:w-1/2 pt-16">
        
        {/* Navigation / Progress Indicator */}
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 z-50">
          {[0,1,2,3,4,5,6].map(i => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === i 
                ? (easterEggActive ? 'bg-[#00f3ff] scale-150 shadow-[0_0_12px_rgba(0,242,255,1)]' : 'bg-[#ff9100] scale-150 shadow-[0_0_12px_rgba(255,145,0,1)]') 
                : 'bg-gray-700'
              }`}
            />
          ))}
        </nav>

        {/* 1. HERO / START */}
        <FadeInSection id="hero" setActiveSection={setActiveSection} sectionIndex={0}>
          <div className="space-y-6">
            <div className={`inline-block px-3 py-1 mb-4 rounded-full border bg-white/5 text-xs text-gray-300 font-medium tracking-wide transition-colors duration-1000 ${easterEggActive ? 'border-[#00f3ff]/30 shadow-[0_0_10px_rgba(0,242,255,0.2)]' : 'border-white/10'}`}>
              {easterEggActive ? '✦ HYPER-DRIVE MODE ENGAGED' : '✦ PathFinder Release 2.0'}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
              Your career isn't a <span className="text-gray-600 line-through">straight line.</span><br/>
              But your next step can be <span className="gradient-text-fire">clear.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-lg">
              We translate your past experience into your future trajectory.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <button 
                onClick={() => document.getElementById('understand')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white px-8 py-4 rounded-full font-bold text-lg btn-fire flex items-center gap-2"
              >
                Try The Product <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* 2. UNDERSTAND (The Interactive Demo) */}
        <FadeInSection id="understand" setActiveSection={setActiveSection} sectionIndex={1}>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white relative z-10 drop-shadow-md mb-8">
              Experience the engine.
            </h2>
            
            {/* Mock App Window */}
            <div className="rounded-2xl border border-gray-700/50 bg-[#0c0c0e]/90 backdrop-blur-xl shadow-2xl overflow-hidden relative">
              {/* App Window Header */}
              <div className="bg-[#151518]/90 border-b border-gray-700/50 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs font-bold text-gray-500 tracking-widest transition-colors duration-1000">
                  {easterEggActive ? 'PATHFINDER OMEGA' : 'PATHFINDER AI'}
                </div>
                <div className="w-10"></div>
              </div>
              
              {/* App Window Body */}
              <div className="p-6 md:p-8 relative">
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full filter blur-[100px] opacity-10 pointer-events-none transition-colors duration-1000 ${easterEggActive ? 'bg-[#00f3ff]' : 'bg-[#ff5e00]'}`}></div>
                
                <div className="flex flex-col gap-2 mb-4">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Context</label>
                  <p className="text-sm text-gray-500">Paste your background, resume summary, or what you've been doing.</p>
                </div>
                
                <div className="relative z-10 mb-6">
                  <textarea 
                    className={`w-full h-32 input-dark rounded-xl p-5 text-gray-200 transition-all resize-none font-medium leading-relaxed border-gray-700/50 ${easterEggActive ? 'focus:border-[#00f3ff]/50 focus:shadow-[0_0_15px_rgba(0,242,255,0.2)]' : 'focus:border-[#ff5e00]/50'}`}
                    defaultValue="I've been working in marketing for 8 years. I'm currently a marketing manager and want to move into product management, but I don't know if my skills translate."
                  />
                </div>
                
                <div className="flex justify-end">
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      analysisComplete 
                        ? (easterEggActive 
                            ? "bg-[#1a1a1f] text-[#00f3ff] border border-[#00f3ff]/30 hover:bg-[#00f3ff]/10" 
                            : "bg-[#1a1a1f] text-[#ff9100] border border-[#ff9100]/30 hover:bg-[#ff9100]/10")
                        : "btn-fire text-white"
                    }`}
                  >
                    {isAnalyzing && <Loader2 className="animate-spin" size={18} />}
                    {!isAnalyzing && analysisComplete && <CheckCircle2 size={18} />}
                    {isAnalyzing ? "Analyzing skills..." : analysisComplete ? "View Insights" : "Run Analysis"}
                  </button>
                </div>

                {/* Simulated Loading Progress */}
                <div className={`mt-6 w-full h-1 bg-gray-800 rounded-full overflow-hidden transition-opacity duration-300 ${isAnalyzing ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`h-full w-full origin-left animate-pulse ${easterEggActive ? 'bg-gradient-to-r from-[#0011ff] to-[#00f3ff]' : 'bg-gradient-to-r from-[#c22900] to-[#ff9100]'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 3. RECOGNIZE */}
        <FadeInSection id="recognize" setActiveSection={setActiveSection} sectionIndex={2}>
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-md">
              You already have more than you think.
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {['Leadership', 'Analytics', 'Customer Research', 'Strategy'].map((skill, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl flex items-center gap-4 transition-all hover:bg-white/5">
                  <div className={`w-2 h-2 rounded-full transition-colors duration-1000 ${easterEggActive ? 'bg-[#00f3ff] shadow-[0_0_8px_rgba(0,242,255,0.8)]' : 'bg-[#ff9100] shadow-[0_0_8px_rgba(255,145,0,0.8)]'}`}></div>
                  <span className="text-lg font-medium text-gray-200">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* 4. IDENTIFY */}
        <FadeInSection id="identify" setActiveSection={setActiveSection} sectionIndex={3}>
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-md">
              You don't need to learn everything.<br/>
              <span className="text-gray-500">You need to close the right gaps.</span>
            </h2>
            <div className="space-y-6 glass-card p-8 rounded-3xl">
              {[
                { name: 'Product Discovery', val: 75 },
                { name: 'Product Metrics', val: 55 },
                { name: 'Product Lifecycle', val: 40 }
              ].map((gap, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between font-medium text-gray-300">
                    <span>{gap.name}</span>
                    <span className={`transition-colors duration-1000 ${easterEggActive ? 'text-[#00f3ff]' : 'text-[#ff9100]'}`}>{gap.val}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700 shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${easterEggActive ? 'bg-gradient-to-r from-[#0011ff] to-[#00f3ff] shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'bg-gradient-to-r from-[#c22900] to-[#ff9100] shadow-[0_0_10px_rgba(255,94,0,0.5)]'}`}
                      style={{ width: `${gap.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* 5. EXPLORE */}
        <FadeInSection id="explore" setActiveSection={setActiveSection} sectionIndex={4}>
          <div className="space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-md">
              Where could your experience take you?
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Product Management', match: 89, icon: <Target className={easterEggActive ? "text-[#00f3ff] transition-colors" : "text-[#ff9100] transition-colors"} /> },
                { title: 'Product Strategy', match: 81, icon: <Compass className={easterEggActive ? "text-[#00f3ff] transition-colors" : "text-[#ff9100] transition-colors"} /> },
                { title: 'Growth Product', match: 76, icon: <TrendingUp className={easterEggActive ? "text-[#00f3ff] transition-colors" : "text-[#ff9100] transition-colors"} /> }
              ].map((role, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl flex items-center justify-between group cursor-pointer transition-all hover:scale-[1.02]">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-black/40 rounded-xl transition-colors border border-transparent shadow-inner ${easterEggActive ? 'group-hover:bg-[#00f3ff]/20 group-hover:border-[#00f3ff]/30' : 'group-hover:bg-[#ff5e00]/20 group-hover:border-[#ff5e00]/30'}`}>
                      {role.icon}
                    </div>
                    <span className="text-xl font-bold text-gray-100 group-hover:text-white transition-colors">{role.title}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Match</span>
                    <span className={`text-2xl font-bold transition-colors duration-1000 drop-shadow-[0_0_5px_currentColor] ${easterEggActive ? 'text-[#00f3ff]' : 'text-[#ff9100]'}`}>{role.match}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>

        {/* 6. ACT */}
        <FadeInSection id="act" setActiveSection={setActiveSection} sectionIndex={5}>
          <div className="space-y-12 text-center md:text-left glass-card p-10 rounded-3xl relative overflow-hidden">
            <div className={`absolute bottom-0 left-0 w-full h-1 opacity-50 transition-colors duration-1000 ${easterEggActive ? 'bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent' : 'bg-gradient-to-r from-transparent via-[#ff5e00] to-transparent'}`}></div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Turn insight into movement.
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-center md:justify-start pt-4">
              {['LEARN', 'BUILD', 'APPLY', 'CONNECT'].map((step, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-8">
                  <span className="font-bold text-xl tracking-widest text-gray-300">{step}</span>
                  {i < 3 && <ChevronRight className={`hidden md:block transition-colors duration-1000 ${easterEggActive ? 'text-[#00f3ff]' : 'text-[#ff5e00]'}`} />}
                </div>
              ))}
            </div>
            <div className="pt-6">
              <button className="px-10 py-5 rounded-full font-bold text-lg btn-fire w-full md:w-auto text-white">
                Explore My Path
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* 7. FINAL */}
        <FadeInSection id="final" setActiveSection={setActiveSection} sectionIndex={6}>
          <div className="space-y-8 flex flex-col items-center justify-center text-center py-20 relative">
            <div className={`absolute inset-0 -z-10 transition-colors duration-1000 ${easterEggActive ? 'bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.15)_0%,transparent_60%)]' : 'bg-[radial-gradient(circle_at_center,rgba(255,94,0,0.15)_0%,transparent_60%)]'}`}></div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              You were never starting from <span className="gradient-text-fire">zero.</span>
            </h2>
            <p className="text-2xl md:text-3xl text-gray-400 font-medium mb-4">
              You just needed to see the path.
            </p>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-widest mb-12">
              Built with real code. Zero fake testimonials.
            </p>
            <button className={`text-white px-10 py-4 rounded-full font-bold text-lg btn-fire shadow-[0_0_30px_currentColor] transition-colors duration-1000 ${easterEggActive ? 'text-[#00f3ff]' : 'text-white'}`}>
              Start Your Journey
            </button>
          </div>
        </FadeInSection>

      </main>
    </div>
  );
}

export default App;
