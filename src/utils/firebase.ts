import { initializeApp } from "firebase/app";
import {
  getDatabase,
  connectDatabaseEmulator,
  Database,
  ref,
  get,
  set,
  update,
} from "firebase/database";
import * as dotenv from "dotenv";

dotenv.config();

const DATABASE_NAME = process.env.DATABASE_NAME || "";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  databaseURL: `https://${DATABASE_NAME}.firebaseio.com`, // Replace with your database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
let db: Database;

// Check if we're in a development environment
const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  // Connect to the Realtime Database emulator
  db = getDatabase(app);
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
  console.log("Connected to Realtime Database emulator");
} else {
  // Connect to the actual Realtime Database
  db = getDatabase(app);
  console.log("Connected to Realtime Database");
}

// Helper function to construct the correct path
function getPath(key: string): string {
  return `data/${key}`; // Example: data/myKey
}

export async function getStoredJson(key: string): Promise<any> {
  try {
    const dbRef = ref(db, getPath(key));
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function storeJson(data: any, key: string): Promise<boolean> {
  try {
    const dbRef = ref(db, getPath(key));
    await set(dbRef, data);
    return true;
  } catch (error) {
    console.error("Error storing data:", error);
    return false;
  }
}

export async function updateStoredJson(
  key: string,
  data: any
): Promise<boolean> {
  try {
    const dbRef = ref(db, getPath(key));
    await update(dbRef, data);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

export { db };
