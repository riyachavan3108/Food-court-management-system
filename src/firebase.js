import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD74xzI0dy2LvsaV2jQ5X-C9CcunP41b20",
  authDomain: "food-court-management-b1e28.firebaseapp.com",
  projectId: "food-court-management-b1e28",
  storageBucket: "food-court-management-b1e28.firebasestorage.app",
  messagingSenderId: "138430879995",
  appId: "1:138430879995:web:fe77452e18c14f63f8385e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
