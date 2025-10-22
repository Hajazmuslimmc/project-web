# Web Games Marketplace

A modern Fiverr-like marketplace for software development services built with Next.js, featuring support for multiple programming languages including Python, Java, JavaScript, HTML, CSS, and C++.

## 🚀 Features

- **🏗️ Multi-Language Support**: Services for Python, Java, JavaScript, HTML, CSS, and C++
- **👥 Dual User Roles**: Creators post services, Members browse and purchase
- **🔐 Secure Authentication**: NextAuth.js with Google OAuth
- **💾 Firebase Backend**: Real-time database with Firestore
- **🎨 Modern UI**: Tailwind CSS styling
- **📱 Responsive Design**: Works on all devices
- **🔍 Advanced Filtering**: Filter services by programming language and type

## 🛠️ Tech Stack

- **Frontend**: Next.js 13 (Pages Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: Firebase Firestore
- **Icons**: Lucide React, React Icons
- **Forms**: Built-in HTML forms with validation

## 📋 Prerequisites

- Node.js 16+ and npm
- Firebase project with Firestore enabled
- Google Cloud Console account for OAuth

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/Hajazmuslimmc/project-web.git
cd project-web
npm install
```

### 2. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Go to Project Settings > General > Add App (Web)
4. Copy your Firebase config values

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

### 4. Environment Variables

Create `.env.local` file with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
web-games/
├── components/          # Reusable React components
│   └── Header.js       # Main navigation header
├── lib/                # Utility libraries
│   └── firebase.js     # Firebase configuration
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   │   └── auth/[...nextauth].js
│   ├── auth/          # Authentication pages
│   ├── index.js       # Homepage
│   ├── browse.js      # Services browse page
│   ├── create.js      # Service creation form
│   ├── profile.js     # User profile (coming soon)
│   ├── _app.js        # App wrapper
│   └── _document.js   # Document wrapper
└── styles/            
    └── globals.css    # Global styles
```

## 🎯 Supported Programming Languages

The platform supports services in these programming languages:

- **🐍 Python**: Data science, ML, web development, automation
- **☕ Java**: Enterprise apps, Android, backend services
- **💿 C++**: System programming, game dev, performance
- **⚛️ JavaScript**: Web apps, Node.js, frontend/backends
- **🌐 HTML & CSS**: Websites, responsive design, UI/UX
- **🎨 Design & Artwork**: Digital art, graphics, creative work

## 🤝 User Roles

### Creators
- Only creators can post services
- Choose programming language for each service
- Set custom pricing
- Offer different types: Services, Courses, Artwork

### Members
- Browse all available services
- Filter by programming language and service type
- Purchase services (payment integration coming soon)
- Leave reviews and ratings (coming soon)

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🔧 Firebase Firestore Schema

### Services Collection
```javascript
{
  title: String,
  description: String,
  type: "Service" | "Course" | "Artwork",
  category: String,
  programmingLanguage: "Python" | "Java" | "JavaScript" | "HTML" | "CSS" | "C++",
  price: Number,
  creatorId: String,
  creatorEmail: String,
  creatorName: String,
  createdAt: Timestamp,
  status: "active" | "inactive"
}
```

## 🌟 Roadmap

- [ ] User profile management
- [ ] Payment processing (Stripe integration)
- [ ] Reviews and ratings system
- [ ] Messaging system between buyers/sellers
- [ ] Advanced search and filters
- [ ] File upload for service attachments
- [ ] Admin dashboard
- [ ] Mobile app (React Native)

## 📦 Dependencies

Key packages:
- `next`: React framework
- `react`: UI library
- `next-auth`: Authentication
- `firebase`: Database and auth backend
- `tailwindcss`: Utility-first CSS
- `react-hot-toast`: Notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter issues:
1. Check the environment variables are set correctly
2. Ensure Firebase project is properly configured
3. Verify Google OAuth credentials
4. Check the browser console for error messages

For questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js and Firebase
