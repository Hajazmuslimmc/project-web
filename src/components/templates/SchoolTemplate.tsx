'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Phone, Mail, MapPin, BookOpen, Users, Award, Calendar } from 'lucide-react';

interface SchoolTemplateProps {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  programs: string[];
  facilities: string[];
}

export function SchoolTemplate({
  name,
  tagline,
  description,
  phone,
  email,
  address,
  programs,
  facilities
}: SchoolTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md border-b border-white/20"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-yellow-400" />
            <h1 className="text-xl font-bold">{name}</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
            <a href="#programs" className="hover:text-yellow-400 transition-colors">Programs</a>
            <a href="#facilities" className="hover:text-yellow-400 transition-colors">Facilities</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 text-center"
      >
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
          >
            {name}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-blue-100"
          >
            {tagline}
          </motion.p>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg max-w-2xl mx-auto text-blue-200"
          >
            {description}
          </motion.p>
        </div>
      </motion.section>

      {/* Programs Section */}
      <section id="programs" className="py-16 bg-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
            <BookOpen className="mr-3 text-yellow-400" />
            Academic Programs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all"
              >
                <Award className="h-8 w-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold">{program}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center">
            <Users className="mr-3 text-yellow-400" />
            School Facilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-lg p-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold text-yellow-400">{facility}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="max-w-2xl mx-auto grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <Phone className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-blue-200">{phone}</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <Mail className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-blue-200">{email}</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            >
              <MapPin className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-blue-200">{address}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 py-8 text-center">
        <div className="container mx-auto px-6">
          <p className="text-blue-200">© 2024 {name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}