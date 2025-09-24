// app/mission/page.js
export default function Mission() {
  return (
    <section id="mission" className="min-h-screen py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100 ">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">Our Mission & Vision</h2>
        
        <div className="mb-16 animate-fade-in-left">
          <h3 className="text-2xl font-semibold mb-6">Mission</h3>
          <p className="text-xl">
            To provide a rigorous and inclusive educational experience that empowers students to become 
            critical thinkers, compassionate leaders, and engaged global citizens.
          </p>
        </div>
        
        <div className="animate-fade-in-right">
          <h3 className="text-2xl font-semibold mb-6">Vision</h3>
          <p className="text-xl">
            We envision a learning community where every student achieves their highest potential, 
            embraces diversity, and contributes positively to an ever-changing world.
          </p>
        </div>
      </div>
    </section>
  );
}