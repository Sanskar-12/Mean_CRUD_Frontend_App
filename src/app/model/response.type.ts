export type getAllStudentsResponse = {
  success: boolean;
  message: string;
  data: Student[];
};

export type createStudentResponse = {
  success: boolean;
  message: string;
  data: Student;
};

export type deleteStudentResponse = {
  success: boolean;
  message: string;
  data: null;
};

export type addStudentRequest = Omit<Student, '_id'>;

export type Student = {
  _id: string;
  name: string;
  age: number;
  email: string;
  studentClass: string;
  address: string;
  phone: number;
};
