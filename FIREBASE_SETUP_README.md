# Firebase Firestore Database Setup Guide

This guide will help you set up Firebase Firestore for your Minecraft game platform using your existing Firebase project.

## 📱 Firestore Configuration Already Exists

Great news! Your Firebase Firestore is already configured in your app. You just need to:

1. **Deploy Firestore Rules to Firebase**
2. **Seed Initial Player Data**
3. **Verify Your Firebase Config**

---

## 🔥 Step 1: Deploy Firestore Security Rules

1. **Install Firebase CLI** (if not already installed):
```bash
npm install -g firebase-tools
```

2. **Login to Firebase** (in terminal):
```bash
firebase login
```

3. **Initialize Firebase project** (or select existing):
```bash
firebase use --add
# Select your Firebase project from the list
```

4. **Deploy Firestore Rules**:
```bash
firebase deploy --only firestore:rules
```

This deploys the `firestore.rules` file which already includes player tiers permissions!

---

## 🌱 Step 2: Seed Initial Player Tier Data

Run the seeder script to populate your Firestore with player rankings:

```bash
node src/lib/firestore-seeder.js
```

This will add the initial players including:
- **itzrealme** (S-Tier)
- **clownperice** (A-Tier)
- **marlowww** (S-Tier)
- **Refraction** (A-Tier)
- **Venetami** (B-Tier)
- **Punz** (S-Tier)
- **Technoblade** (S-Tier)

---

## ⚡ Step 3: Verify Firebase Configuration

**Check your `.env` file contains the correct Firebase config:**
```env
# Firebase already configured - verify these are correct
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

---

## ✅ Step 4: Test the Database Connection

```bash
npm run build
```

If build succeeds, Firebase is working! Visit `/rankings` to see your player tier list.

---

## 🏗️ Your Firestore Database Structure

### **Collections Available:**
- **`userTiers`** - Player skill rankings ⚔️
- **`users`** - User accounts and profiles 👥
- **`messages`** - Chat messages 💬
- **`privateChats`** - Private conversations 🔒
- **`socialPosts`** - Social feed posts 📱
- **`friendRequests`** - Friend system 👥
- **`gameScores`** - Leaderboards and high scores 🏆
- **`notifications`** - User notifications 🔔

### **Security Rules Applied:**
- **Public Read** for player tiers and public data
- **Authenticated Only** for writing user data
- **Moderator Only** for managing player tiers
- **User Ownership** for personal data

---

## 🎯 Key Features Now Available:

### **Player Tier Management:**
- **Real-time**: Live updates across all users
- **Moderated**: Admins and mods can add/edit players
- **Scalable**: No limit on player entries
- **Backup**: Automatic Firebase backups and redundancy

### **Authentication Integration:**
- **Firebase Auth**: Secure user accounts
- **Role-Based Access**: Users, mods, admins
- **Session Management**: Persistent logins
- **Security**: Built-in Firebase security

### **Cross-Platform Features:**
- **Real-time Sync**: Changes appear instantly everywhere
- **Offline Capable**: Works without internet connection
- **Scalable**: Auto-scales with your app growth
- **Multi-Device**: Works on web, mobile, desktop

---

## 🛠️ Firebase Console Management

### **Access Firebase Console:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. **Firestore Database** → View/edit your data
4. **Authentication** → Manage users and roles
5. **Rules** → Update security rules
6. **Storage** → Manage file uploads

### **Monitor & Debug:**
- **.firestore/rules** → Security rule testing
- **Console logs** → Real-time error monitoring
- **Performance** → Database usage stats

---

## 🔥 Advanced Firebase Features Available:

### **Authentication:**
- Email/password, Google, Microsoft sign-in
- Custom claims for user roles
- User profile management

### **Real-time Features:**
- Live player tier updates
- Real-time chat messaging
- Live leaderboard updates
- Support ticket notifications

### **Cloud Functions:**
- Server-side data processing
- Automated moderation tools
- Scheduled data cleanup

---

## 🚀 Ready for Production!

Your Moodle game platform is now powered by **Firebase Firestore** - enterprise-grade database with:

- ✅ **99.9% Uptime SLA**
- ✅ **GDPR Compliant**
- ✅ **Real-time Sync**
- ✅ **Auto-scaling**
- ✅ **Global CDN**
- ✅ **Built-in Security**

**Say goodbye to database administration headaches!** 🎉

---

## 🆘 Troubleshooting

**Build Fails:**
- Verify Firebase config in `.env`
- Check Firebase project permissions
- Ensure Firestore rules are deployed

**Auth Issues:**
- Check Firebase Authentication settings
- Verify user roles in Firestore
- Clear browser cache/tokens

**Data Not Saving:**
- Check Firestore security rules
- Verify user permissions
- Monitor Firebase console errors
