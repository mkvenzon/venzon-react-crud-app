import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser, User } from "../utils/helpers";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, IconButton, Typography, CircularProgress, Container, 
  Paper, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Button, Modal, Box 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "../pages/UserForm";

interface UsersListProps {
  onUserSelect: (id: number) => void;
  onUserDelete: (id: number) => void;
}

const UsersList: React.FC<UsersListProps> = ({ onUserSelect, onUserDelete }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleOpenDialog = (id: number) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const handleDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await deleteUser(selectedUserId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserId));
        onUserDelete(selectedUserId);
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h5" gutterBottom>
          USER LIST
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }} >Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    hover
                    onClick={() => onUserSelect(user.id)}
                    style={{ cursor: 'pointer' }} 
                  >
                    <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="right">
                      <IconButton edge="end" onClick={(e) => { e.stopPropagation(); handleOpenDialog(user.id); }}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginTop: "20px" }} 
          onClick={() => setOpenForm(true)}
        >
          Create New User
        </Button>
      </Paper>

     
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

   
      <Modal open={openForm} onClose={() => setOpenForm(false)}>
        <Box 
          sx={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)", 
            width: 400, 
            bgcolor: "background.paper", 
            boxShadow: 24, 
            p: 4, 
            borderRadius: 2
          }}
        >
          <UserForm />
          <Button 
            variant="contained" 
            color="error" 
            fullWidth 
            style={{ marginTop: "10px" }} 
            onClick={() => setOpenForm(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default UsersList;
