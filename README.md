
## Firebase Fcm Integration (Frontend)
**FCM Notification System** is a well-known push notification service developed by Google. It enables you to send free notifications to user devices, ensuring users are promptly informed about updates or alerts you trigger from your server.

This particular application is built with the **Next.js** framework, leveraging a **JavaScript-based client-side** implementation. It serves as a **testing interface** for your server-side Firebase Cloud Messaging (FCM) setup, allowing you to easily verify and debug your push notification integrations.

### Configuration
First, clone the project:
```bash

  git clone https://github.com/nazmulcs42/firebase-push-notification-frondend-app.git
  
  or,
  git clone git@github.com:nazmulcs42/firebase-push-notification-frondend-app.git
```
Second, install the project dependencies:
```bash

  npm install
```
Third, config the environment file:
```bash

  cp .env.example .env
```
Fourth, set values for: 
```bash

  # .env
  NEXT_PUBLIC_APP_ENV=local
  NEXT_PUBLIC_APP_DEBUG=true
  NEXT_PUBLIC_API_URL="http://localhost:8000"
  NEXT_PUBLIC_APP_SIGNIN_URL="${NEXT_PUBLIC_API_URL}/api/auth/login"
  NEXT_PUBLIC_APP_SIGNOUT_URL="${NEXT_PUBLIC_API_URL}/api/auth/logout"
  NEXT_PUBLIC_APP_FCM_TOKEN_STORE_URL="${NEXT_PUBLIC_API_URL}/api/auth/fcm-token"
  NEXT_PUBLIC_APP_FCM_TOKEN_DELETE_URL="${NEXT_PUBLIC_API_URL}/api/auth/fcm-token/delete"
  NEXT_PUBLIC_APP_SEND_NOTIFICATION_URL="${NEXT_PUBLIC_API_URL}/api/auth/send-notification"
  
  # Firebase configuration
  NEXT_PUBLIC_APP_FIREBASE_API_KEY=
  NEXT_PUBLIC_APP_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_APP_FIREBASE_DATABASE_URL=
  NEXT_PUBLIC_APP_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_APP_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_APP_FIREBASE_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_APP_FIREBASE_APP_ID=
  NEXT_PUBLIC_APP_FIREBASE_MEASUREMENT_ID=
  NEXT_PUBLIC_APP_FIREBASE_VAPID_KEY=

```


Finally, run the development server:
```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Contact Information
```bash
  Developed By
  Md. Nazmul Islam
  Software Engineer
  nazmul.islam.lotif@gmail.com
```

