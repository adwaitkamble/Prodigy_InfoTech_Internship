import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, TrendingUp, Bot, Database, Award, Book, BarChart3 } from "lucide-react";

export default function CertificationsSection() {
  const certifications = [
    {
      icon: Trophy,
      title: "JEE Advanced",
      category: "Academic Excellence",
      description: "Successfully qualified for JEE Advanced, demonstrating strong foundation in mathematics, physics, and chemistry.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: Users,
      title: "Smart India Hackathon",
      category: "Team Leadership",
      description: "Participated and led our team in SIH, showcasing innovation, problem-solving, and leadership capabilities.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "SEBI Investor Certification",
      category: "Financial Knowledge",
      description: "Comprehensive understanding of investment principles, market dynamics, and regulatory frameworks.",
      color: "from-green-500 to-teal-600"
    },
    {
      icon: Bot,
      title: "Microsoft Career Essentials",
      category: "Generative AI",
      description: "Expertise in generative AI applications, machine learning concepts, and Microsoft AI technologies.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      icon: Database,
      title: "GFG Data Analytics",
      category: "Currently Completing",
      description: "Advanced data analytics certification covering statistical analysis, visualization, and insights generation.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Award,
      title: "Bootcamp Certifications",
      category: "5-6 Completed",
      description: "Diverse range of technical bootcamps covering various programming languages, frameworks, and development methodologies.",
      color: "from-red-500 to-pink-600"
    }
  ];

  const interests = [
    {
      icon: Book,
      title: "Reading & Learning",
      description: "Passionate about reading books related to finance, self-help, and personal development to continuously expand knowledge and perspectives."
    },
    {
      icon: BarChart3,
      title: "Market Analysis",
      description: "Actively engaged in stock market analysis and exploring new financial concepts, combining technical skills with financial acumen."
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Certifications & Accomplishments</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Recognition of continuous learning and professional development across various domains.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card key={index} className="bg-white shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                    <cert.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{cert.title}</h3>
                  <p className="text-slate-600 text-sm">{cert.category}</p>
                </div>
                <p className="text-slate-700 text-center text-sm">
                  {cert.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Interests Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-slate-900 text-center mb-8">Personal Interests</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {interests.map((interest, index) => (
              <Card key={index} className="bg-white shadow-lg hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mr-4 flex items-center justify-center">
                      <interest.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">{interest.title}</h4>
                  </div>
                  <p className="text-slate-600">
                    {interest.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
