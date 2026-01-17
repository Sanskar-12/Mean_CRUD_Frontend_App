export type getAllStudentsResponse = {
  success: boolean;
  message: string;
  data: Student[];
};

export type Student = {
  _id: string;
  name: string;
  age: number;
  email: string;
  studentClass: string;
  address: string;
  phone: number;
};
