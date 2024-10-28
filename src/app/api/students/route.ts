import { db, Students } from "@/db/schema/schema"; // Ensure correct path to schema
import { NextResponse } from "next/server";

// Helper function to format Date to 'YYYY-MM-DD'
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// POST: Add a new student
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newStudent = await db.insert(Students).values({
      admissionNo: data.admissionNo,
      name: data.name,
      contact: data.contact,
      enrollmentDate: formatDate(new Date(data.enrollmentDate)), // Format the date to 'YYYY-MM-DD'
      classId: data.classId,
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json({ error: "Failed to add student" }, { status: 500 });
  }
}
