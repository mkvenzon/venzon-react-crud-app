export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }
  
  export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const data = await response.json();
    return data.data;
  };
  
  export const fetchUserById = async (id: number): Promise<User> => {
    const response = await fetch(`https://reqres.in/api/users/${id}`);
    const data = await response.json();
    return data.data;
  };
  
  export const createUser = async (name: string, job: string) => {
    const response = await fetch("https://reqres.in/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, job }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  
    return await response.json();
  };
  
  
  export const updateUser = async (id: number, name: string, job: string) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, job }),
    });
    return response.json();
  };
  
  export const deleteUser = async (id: number) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  };
  



  