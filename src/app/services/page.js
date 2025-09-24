// app/services/page.js
export default function Services() {
  return (
    <section id="services" className="min-h-screen py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Academic Programs", desc: "Comprehensive curriculum from elementary to high school with advanced placement options.", icon: "📚" },
            { title: "Extracurricular Activities", desc: "Sports, arts, clubs, and organizations to develop well-rounded individuals.", icon: "⚽" },
            { title: "Student Support", desc: "Counseling, tutoring, and special education services for all students.", icon: "🤝" },
            { title: "College Preparation", desc: "Guidance and resources to prepare students for higher education.", icon: "🎓" },
            { title: "Technology Integration", desc: "Modern technology integrated into all aspects of learning.", icon: "💻" },
            { title: "Community Engagement", desc: "Partnerships with local organizations for real-world learning experiences.", icon: "🌍" }
          ].map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}