# Free Client Setup Instructions

## Overview
This is a complete Minecraft ecosystem with Java launcher, Fabric client, Firebase backend, and web interface.

## Firebase Setup
1. Create a Firebase project.
2. Enable Firestore and Storage.
3. Download serviceAccountKey.json and place in firebase-config/.
4. Deploy Firestore rules and storage rules.
5. Update API URLs with your Firebase project details.

## Backend API
1. cd firebase-config
2. npm install
3. node index.js (run locally or deploy to Cloud Functions)

## Java Launcher
1. cd java-launcher
2. mvn clean install
3. java -jar target/launcher-1.0.0.jar

## Fabric Client
1. cd fabric-client
2. ./gradlew build
3. Place jar in mods folder.

## Web Interface
1. Already in Next.js project.
2. Add API routes as above.
3. Run npm run dev

## Test Flow
1. Register user via API.
2. Login in launcher.
3. Watch ads to unlock Caper.
4. Create cape on web.
5. Approve as owner.
6. Sync in client.

## Security Notes
- Hash passwords with BCrypt.
- Verify ranks server-side.
- No hardcoded credentials.