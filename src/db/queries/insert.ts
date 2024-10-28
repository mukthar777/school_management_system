import { db } from "../schema/schema";
import { Students, Teachers, Subjects, Classes } from "../schema/schema";

// Insert a student
export async function addStudent(student: any) {
  try {
    await db.insert(Students).values(student);
    console.log("Student added successfully:", student);
  } catch (error) {
    console.error("Error adding student:", error);
  }
}

// Insert a teacher
export async function addTeacher(teacher: any) {
  try {
    await db.insert(Teachers).values(teacher);
    console.log("Teacher added successfully:", teacher);
  } catch (error) {
    console.error("Error adding teacher:", error);
  }
}

// Insert a subject
export async function addSubject(subject: any) {
  try {
    await db.insert(Subjects).values(subject);
    console.log("Subject added successfully:", subject);
  } catch (error) {
    console.error("Error adding subject:", error);
  }
}

// Insert a class
export async function addClass(classInfo: any) {
  try {
    await db.insert(Classes).values(classInfo);
    console.log("Class added successfully:", classInfo);
  } catch (error) {
    console.error("Error adding class:", error);
  }
}
