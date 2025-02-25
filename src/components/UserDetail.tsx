import React, { useState, useEffect } from "react";
import { fetchUserById, User } from "../utils/helpers";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

interface UserDetailProps {
  userId: number;
}

const UserDetail: React.FC<UserDetailProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true); 
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        const data = await fetchUserById(userId);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false); 
      }
    };

    loadUser();
  }, [userId]);

  return (
    <Box 
      sx={{ 
        maxWidth: 400, 
        margin: "20px auto", 
        padding: 2, 
        boxShadow: 3, 
        borderRadius: 2, 
        bgcolor: "background.paper",
        height: 500, 
        minHeight: 400, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center"
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : user ? (
        <Card sx={{ textAlign: "center", boxShadow: "none", width: "100%" }}>
          <CardMedia component="img" height="300" image={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <CardContent>
            <Typography variant="h5" component="div">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6">User not found</Typography>
      )}
    </Box>
  );
};

export default UserDetail;
