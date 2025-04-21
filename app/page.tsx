'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import { messaging, onMessage } from "@/firebase/firebase";
import { getMessaging, getToken } from "firebase/messaging";


export default function Home() {
  const [email, setEmail] = useState("n.islam@cloudly.io");
  const [password, setPassword] = useState("123456");
  const [accessToken, setAccessToken] = useState("");
  const [deviceToken, setDeviceToken] = useState("");
  const [notification, setNotification] = useState({title: '', body: ''});


  const handleSendNotification = async () => {
    try {
      if(!deviceToken) {
        console.error("Device token is not available");
        return;
      }
      console.log("Sending notification to device token:", deviceToken);

      // Send notification to your server here
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SEND_NOTIFICATION_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify({
          title: "Push Notification: New Event, 2025.",
          body: "We are excited to share that the Annual Festival will be celebrated this month! A dedicated committee has been formed to manage the entire programme, and we are truly delighted to continue this cherished tradition each year. We look forward to your enthusiastic participation in making this event a grand success!",
          fcm_token: deviceToken,
        }),
      });
      if (!response.ok) {
        throw new Error("Notification sending failed");
      }
      const data = await response.json();
      console.log("Notification sent successfully:", data);
      // alert(`🔔 ${data.title}`);
    } catch (error) {
      console.error("Error sending notification:", error);
      // Show error message to user
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_SIGNIN_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed");
      }
  
      const data = await response.json();
      console.log("Login success:", data);

      // Store access token in state
      setAccessToken(data.data.access_token);

      // Store token in localStorage
      localStorage.setItem("access_token", data.data.access_token);

      
      await requestFCMPermission(); // Request FCM token on login
      // Redirect or show success
    } catch (error) {
      console.error("Error during login:", error);
      // Show error message to user
    }
  };

const requestFCMPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('[page.tsx] requestFCMPermission fcm permission', permission);

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      const messaging = getMessaging();
      
      const fcm_token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_APP_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      console.log("[page.tsx] FCM Token:", fcm_token);
      setDeviceToken(fcm_token);
      
      // Send token to your server here
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_FCM_TOKEN_STORE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // Assuming you store the token in localStorage
        },
        body: JSON.stringify({
          fcm_token,
        }),
      });
  
      if (!response.ok) {
        throw new Error("fcm token saved failed");
      }
  
      const data = await response.json();
      console.log("fcm token saved successfully:", data);

    }
  } catch (err) {
    console.error("[page.tsx] FCM Token error:", err);
  }
};



  useEffect(() => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("Foreground message:", payload);
        setNotification({
          title: `🔔 ${payload.notification?.title}`,
          body: `${payload.notification?.body}`
        });
        // alert(`🔔 ${payload.notification?.title}`);
      });
    }
  }, []);
  
  return (
    <div
      className="flex bg-indigo-50 min-h-screen bg-center bg-cover relative"
    >
  
      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row w-full">
        {/* Left Side */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between text-white top-4 left-4 text-sm bg-gray-700 rounded-sm">
          {/* Instruction Board */}
          <div className="text-gray-900 font-semibold text-base text-shadow-sm">
            <h2 className="text-3xl font-bold text-white mb-3 ml-3">My Apps</h2>
            <h3 className="text-sm font-bold  mb-3 ml-3 text-indigo-200">Firebase push notification testing application</h3>
          </div>
  
          {/* Monitor */}
          <div className="mt-6">
              <div className="bg-white bg-opacity-10 rounded-sm min-h-80 p-4 shadow-lg backdrop-blur-md text-gray-900">
                <h3 className="text-lg font-semibold mb-2">
                  Monitors
                </h3>
                <table className="w-full text-sm text-gray-900 ">
                  <thead>
                    <tr className="border-b border-blue-500">
                      <th className="text-center py-1">Key</th>
                      <th className="text-center py-1">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="">
                      <td className="py-1">access_token</td>
                      <td className="py-1 pl-3 break-words">{accessToken || <span className="italic text-gray-500">No token available</span>}</td>
                    </tr>
                    <tr>
                      <td className="py-1">device_token</td>
                      <td className="py-1 pl-3 break-words">{deviceToken || <span className="italic text-gray-500">No token available</span>}</td>
                    </tr>
                  </tbody>
                </table>
                { deviceToken && (
                <div className="fixed bottom-4 right-4">
                  <button type="button" onClick={handleSendNotification} className="btn btn-primary text-sm bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
                    Notify Me
                  </button>
                </div>
                )}
              </div>
          </div>
        </div>
  
        {/* Right Side */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center p-8 space-y-6">
          {/* Notification */}
          {notification.title && (
            <div className="fixed top-4 right-4 w-96 px-4 py-3 text-sm text-white bg-green-500 rounded-lg shadow-lg z-50">
              <button
                className="absolute top-2 right-2 text-white text-lg leading-none focus:outline-none"
                onClick={() => setNotification({ title: '', body: '' })}
              >
                &times;
              </button>
              <div className="font-semibold text-base">{notification.title}</div>
              <div className="mt-1 text-sm">{notification.body}</div>
            </div>
          )}
  
          {/* Login Form */}
          <div className="w-full max-w-sm p-8 space-y-6 bg-gray-700 bg-opacity-10 rounded-lg shadow-xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-center text-white">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-white">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-white/30 bg-white/10 text-white placeholder-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-white/30 bg-white/10 text-white placeholder-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}