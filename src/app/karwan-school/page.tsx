'use client';

export default function KarwanSchoolPage() {
  const schoolData = {
    name: "Karwan Private High School",
    tagline: "Excellence in Education, Character in Life",
    description: "Providing quality education and nurturing future leaders since 1995",
    phone: "+964 750 123 4567",
    email: "info@karwanschool.edu",
    address: "Karwan District, Erbil, Kurdistan Region, Iraq",
    programs: [
      "Scientific Branch",
      "Literary Branch", 
      "English Language Program",
      "Computer Science Track"
    ],
    facilities: [
      "Modern Classrooms",
      "Science Laboratories",
      "Computer Lab",
      "Library",
      "Sports Hall",
      "Cafeteria"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          {schoolData.name}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          {schoolData.tagline}
        </p>
        <p className="text-lg max-w-2xl mx-auto text-blue-200 mb-12">
          {schoolData.description}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {schoolData.programs.map((program) => (
            <div key={program} className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold">{program}</h3>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-blue-200">Contact: {schoolData.email}</p>
          <p className="text-blue-200">{schoolData.address}</p>
        </div>
      </div>
    </div>
  );
}