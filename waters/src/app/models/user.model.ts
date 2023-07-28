export interface User {
  _id: string;
  username: string;
  password: string;
  userRole: string | null;
  isAdmin?: boolean;
}