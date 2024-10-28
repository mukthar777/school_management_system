// src/db/index.ts
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/vercel-postgres";

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Use the desired connection string
});

export const db = drizzle(pool);

// Test the connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

testConnection(); // Call the test function to check the connection
