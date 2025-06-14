import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Enthusiastic Team Player & Future Tech Leader
            </h3>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              I'm an enthusiastic computer engineering student with a strong academic background 
              and genuine passion for programming and data analytics. Currently pursuing my 
              Bachelor's degree at Pimpri Chinchwad College of Engineering, Pune.
            </p>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              What drives me is the intersection of technology and leadership. I believe in 
              leveraging technical expertise to foster collaborative environments and guide 
              teams toward shared goals. My commitment to continuous learning keeps me updated 
              with emerging technologies and industry trends.
            </p>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Beyond coding, I'm passionate about finance and stock market analysis, which 
              has led me to earn certifications including SEBI INVESTOR CERTIFICATION. 
              This diverse interest helps me approach problems from multiple perspectives.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <Card className="text-center p-4 bg-slate-50">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">2027</div>
                  <div className="text-sm text-slate-600">Expected Graduation</div>
                </CardContent>
              </Card>
              <Card className="text-center p-4 bg-slate-50">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-2">6+</div>
                  <div className="text-sm text-slate-600">Certifications Completed</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Modern technology workspace image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl hover-lift">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern developer workspace with multiple monitors and code" 
                className="w-full h-auto object-cover" 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Data analytics visualization */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Data analytics dashboard with charts and graphs" 
                  className="w-full h-24 sm:h-32 object-cover" 
                />
              </div>
              
              {/* Programming code visualization */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Programming code on computer screen with colorful syntax highlighting" 
                  className="w-full h-24 sm:h-32 object-cover" 
                />
              </div>
              
              {/* Technology abstract background */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Abstract technology background with circuit patterns and blue lighting" 
                  className="w-full h-24 sm:h-32 object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
