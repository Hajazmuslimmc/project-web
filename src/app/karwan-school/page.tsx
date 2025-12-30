'use client';

import { SchoolTemplate } from '@/components/templates/SchoolTemplate';

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

  return <SchoolTemplate {...schoolData} />;
}