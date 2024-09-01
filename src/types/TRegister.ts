// Define a type for form data
export type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  
  // Define a type for errors
  export type FormErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  };