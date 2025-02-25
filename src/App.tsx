import React, { useState } from "react";
import UsersList from "./components/UsersList";
import UserDetail from "./components/UserDetail";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserDelete = (id: number) => {
    if (selectedUserId === id) {
      setSelectedUserId(null);
    }
  };

  return (
    <Container 
      sx={{  minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", py: 4 }}
    >
      <Card sx={{ maxWidth: 1000, width: "100%", p: 3, boxShadow: 3, bgcolor: "#F5F5F5", color: "black"}}>  
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            React CRUD Operation Exam
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <UsersList onUserSelect={setSelectedUserId} onUserDelete={handleUserDelete} />
            </Grid>
            <Grid item xs={12} md={6}>
              {selectedUserId && <UserDetail userId={selectedUserId} />}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
