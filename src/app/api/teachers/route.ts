import { db, Teachers } from "../../../db/schema/schema"; // Ensure correct path to schema
import { NextResponse } from "next/server";

// GET: Fetch all teachers
export async function GET() {
  try {
    const teachers = await db.select().from(Teachers);
    return NextResponse.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}

// POST: Add a new teacher
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const newTeacher = await db.insert(Teachers).values({
      registerNo: data.registerNo,
      name: data.name,
      contact: data.contact,
      subjectId: data.subjectId,
    });

    return NextResponse.json(newTeacher, { status: 201 });
  } catch (error) {
    console.error("Error adding teacher:", error);
    return NextResponse.json({ error: "Failed to add teacher" }, { status: 500 });
  }
}
