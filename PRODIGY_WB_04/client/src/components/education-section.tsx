import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, School, Award } from "lucide-react";

export default function EducationSection() {
  const educationData = [
    {
      icon: GraduationCap,
      title: "Bachelor of Technology - Computer Engineering",
      institution: "Pimpri Chinchwad College of Engineering, Pune",
      period: "2023 - 2027 (Expected)",
      status: "In Progress",
      statusColor: "bg-green-100 text-green-800",
      side: "left"
    },
    {
      icon: School,
      title: "Higher Secondary School",
      institution: "Nowrosjee Wadia College, Pune",
      period: "2021 - 2023",
      status: "60%",
      statusColor: "bg-blue-100 text-blue-800",
      side: "right"
    },
    {
      icon: Award,
      title: "10th Board CBSE",
      institution: "Dr Kalmadi Shamrao High School, Pune",
      period: "2011 - 2021",
      status: "91%",
      statusColor: "bg-green-100 text-green-800",
      side: "left"
    }
  ];

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            My academic journey showcasing consistent growth and achievement.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent transform md:-translate-x-0.5"></div>
          
          <div className="space-y-12">
            {educationData.map((edu, index) => (
              <div key={index} className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-6 md:absolute md:left-1/2 md:transform md:-translate-x-4 md:mr-0">
                    <edu.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div className={`${edu.side === 'right' ? 'hidden md:block' : 'md:text-right md:pr-8'}`}>
                    {edu.side === 'left' && (
                      <Card className="bg-slate-50 shadow-md hover-lift">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            {edu.title}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {edu.institution}
                          </p>
                          <p className="text-slate-600 mb-3">{edu.period}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              {edu.title.includes('Bachelor') ? 'Current Status' : 
                               edu.title.includes('Higher') ? '12th Board Score' : '10th Board Score'}
                            </span>
                            <Badge className={edu.statusColor}>
                              {edu.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className={`${edu.side === 'left' ? 'hidden md:block' : 'md:pl-8'}`}>
                    {edu.side === 'right' && (
                      <Card className="bg-slate-50 shadow-md hover-lift">
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            {edu.title}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {edu.institution}
                          </p>
                          <p className="text-slate-600 mb-3">{edu.period}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-500">
                              {edu.title.includes('Higher') ? '12th Board Score' : '10th Board Score'}
                            </span>
                            <Badge className={edu.statusColor}>
                              {edu.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  
                  {/* Mobile view - show all cards */}
                  <div className="md:hidden">
                    <Card className="bg-slate-50 shadow-md hover-lift">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {edu.title}
                        </h3>
                        <p className="text-primary font-medium mb-2">
                          {edu.institution}
                        </p>
                        <p className="text-slate-600 mb-3">{edu.period}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">
                            {edu.title.includes('Bachelor') ? 'Current Status' : 
                             edu.title.includes('Higher') ? '12th Board Score' : '10th Board Score'}
                          </span>
                          <Badge className={edu.statusColor}>
                            {edu.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
