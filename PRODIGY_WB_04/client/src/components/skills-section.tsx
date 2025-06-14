import { Card, CardContent } from "@/components/ui/card";
import { Code, TrendingUp, Brain, Users } from "lucide-react";

export default function SkillsSection() {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      color: "from-blue-500 to-purple-600",
      skills: [
        { name: "Python", level: 85 },
        { name: "C++/C", level: 80 },
        { name: "OOP Concepts", level: 90 }
      ]
    },
    {
      icon: TrendingUp,
      title: "Data & Analytics",
      color: "from-green-500 to-teal-600",
      skills: [
        { name: "SQL & DBMS", level: 85 },
        { name: "EDA", level: 80 },
        { name: "Power BI", level: 75 }
      ]
    },
    {
      icon: Brain,
      title: "Emerging Tech",
      color: "from-purple-500 to-pink-600",
      skills: [
        { name: "GenAI & ML", level: 70 },
        { name: "DSA", level: 75 },
        { name: "DevOps", level: 60 }
      ]
    }
  ];

  const softSkills = [
    {
      icon: "📢",
      title: "Leadership",
      description: "Team motivation and guidance"
    },
    {
      icon: "💬",
      title: "Communication", 
      description: "Clear and effective interaction"
    },
    {
      icon: "🤝",
      title: "Team Building",
      description: "Collaborative environment creation"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across programming, 
            data analytics, and emerging technologies.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-white shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700 font-medium">{skill.name}</span>
                        <span className="text-slate-500 text-sm">{skill.level}%</span>
                      </div>
                      <div className="bg-slate-200 rounded-full h-2">
                        <div 
                          className="skill-bar rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${0.5 + (index * 0.2) + (skillIndex * 0.2)}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Soft Skills */}
          <Card className="bg-white shadow-lg hover-lift md:col-span-2 lg:col-span-3">
            <CardContent className="p-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Soft Skills & Leadership</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {softSkills.map((skill, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-2xl mb-3">{skill.icon}</div>
                    <h4 className="font-semibold text-slate-900 mb-2">{skill.title}</h4>
                    <p className="text-sm text-slate-600">{skill.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
