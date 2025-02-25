import React, { useState } from "react";
import { updateUser } from "../utils/helpers";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

interface UpdateFormProps {
  userId: number;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ userId }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userId, name, job);
      setMessage("User Updated Successfully!");
      setName("");
      setJob("");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Failed to update user.");
    }
  };

  return (
    <Box component="form" onSubmit={handleUpdate} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Update User</Typography>
      {message && <Alert severity="info">{message}</Alert>}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required fullWidth />
      <TextField label="Job" value={job} onChange={(e) => setJob(e.target.value)} required fullWidth />
      <Button type="submit" variant="contained" color="secondary" fullWidth>
        Update User
      </Button>
    </Box>
  );
};

export default UpdateForm;
