import React, { useState } from "react";
import { createUser, updateUser } from "../utils/helpers";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

const UserForm: React.FC = () => {
  const [id, setId] = useState<number | null>(null); 
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isUpdateMode && id !== null) {        
        const response = await updateUser(id, name, job);
        console.log("Update Response:", response);
        setMessage(`User ID ${id} updated successfully!`);
      } else {      
        const response = await createUser(name, job);
        console.log("Create Response:", response);
        setMessage("New User Created Successfully!");
        setId(response.id); 
        setIsUpdateMode(true); 
      }

      setName("");
      setJob("");
    } catch (error) {
      console.error("Error:", error);
      setMessage("Operation failed.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">{isUpdateMode ? "Update User" : "Create New User"}</Typography>
      {isUpdateMode && <TextField label="User ID" value={id || ""} disabled fullWidth />} 
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
      <TextField label="Job" value={job} onChange={(e) => setJob(e.target.value)} required fullWidth />
      
      {message && <Alert severity="success">{message}</Alert>}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isUpdateMode ? "Update User" : "Create User"}
      </Button>
    </Box>
  );
};

export default UserForm;
