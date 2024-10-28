// import { NextApiRequest, NextApiResponse } from 'next';
// import { db } from '@/db/schema/schema'; // Adjust the path if necessary

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const result = await db.query('SELECT NOW()'); // Simple test query
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error('Database connection failed', error);
//     res.status(500).json({ error: 'Database connection failed' });
//   }
// }
