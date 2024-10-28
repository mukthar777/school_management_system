//src/types.ts
export interface Teacher {
  registerNo: string;
  name: string;
  contact: string;
}

export interface Student {
  admissionNo: string;
  name: string;
  contact: string;
  enrollmentDate: Date;
  classId: number;
}
interface Subject {
  id: number;
  name: string;
}

interface Class {
  id: number;
  name: string;
}