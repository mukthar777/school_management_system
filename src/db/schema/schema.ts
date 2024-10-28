// src/db/schema/schema.ts
import { pgTable, serial, varchar, integer, date, char } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { Pool } from "pg";

// Connect to PostgreSQL using Vercel's pooler
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
export const db = drizzle(pool); // Make sure the pool is passed correctly

// Define the database tables
export const Students = pgTable("students", {
  admissionNo: varchar("admission_no", { length: 20 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  contact: varchar("contact", { length: 15 }),
  enrollmentDate: date("enrollment_date"),
  classId: integer("class_id").references(() => Classes.classId),
});

export const Teachers = pgTable("teachers", {
  registerNo: varchar("register_no", { length: 20 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  contact: varchar("contact", { length: 15 }),
  subjectId: integer("subject_id").references(() => Subjects.subjectId),
});

export const Subjects = pgTable("subjects", {
  subjectId: integer("subject_id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const Classes = pgTable("classes", {
  classId: integer("class_id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const Grades = pgTable("grades", {
  gradeId: integer("grade_id").primaryKey(),
  grade: char("grade", { length: 1 }).notNull(),
  admissionNo: varchar("admission_no", { length: 20 }).references(() => Students.admissionNo),
  subjectId: integer("subject_id").references(() => Subjects.subjectId),
});
