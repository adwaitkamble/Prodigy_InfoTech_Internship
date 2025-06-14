import { Button } from "@/components/ui/button";
import { Download, ChevronDown, User } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const downloadResume = () => {
    // In a real implementation, this would trigger a file download
    alert('Please contact me directly for my latest resume at adwaitakamble007@gmail.com');
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg relative overflow-hidden">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white rounded-full opacity-15 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Professional photo placeholder */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center overflow-hidden">
            <User className="h-16 w-16 sm:h-20 sm:w-20 text-white/80" />
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Hi, I'm <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Adwait Kamble</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
            Computer Engineering Student & Data Analytics Enthusiast
          </p>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Passionate about programming, data analytics, and emerging technologies. 
            Ready to contribute to innovative solutions and drive collaborative success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-white text-primary px-8 py-3 hover:bg-slate-100 transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </Button>
            <Button 
              onClick={downloadResume}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white px-8 py-3 hover:bg-white hover:text-primary transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
