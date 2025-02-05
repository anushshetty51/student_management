import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllStudents, deleteStudent, updateStudentMarks } from "../services/studentService";
import { useNavigate } from "@tanstack/react-router";
import Loading from "../components/Loading";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import {
  containerStyles,
  typographyTitleStyles,
  cardStyles,
  cardContentStyles,
  cardActionsStyles,
  buttonStyles,
  dialogStyles,
  textFieldStyles,
  logoutButtonStyles,
} from "../css/studentpage"; 


interface Student {
  id: number;
  name: string;
  mathMarks: number;
  scienceMarks: number;
  englishMarks: number;
}


const StudentsPage = () => {
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [marks, setMarks] = useState({ mathMarks: 0, scienceMarks: 0, englishMarks: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const { data: students, isLoading, isError,refetch } = useQuery(["students"], getAllStudents, {
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    onError: (err) => console.error("Error fetching students:", err),
  });

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    } }, [isLoggedIn]);

  const deleteMutation = useMutation(deleteStudent, {
    onSuccess: () => queryClient.invalidateQueries(["students"]),
    onError: (err) => console.error("Error deleting student", err),
  });
  const updateMutation = useMutation(
    (data: { id: number; marks: { mathMarks: number; scienceMarks: number; englishMarks: number } }) =>
      updateStudentMarks(data.id, data.marks),
    {
      onMutate: async (updatedData) => {
        await queryClient.cancelQueries(["students"]); // Cancel ongoing queries
        
        const previousStudents = queryClient.getQueryData<Student[]>(["students"]); // Get previous data
        
        queryClient.setQueryData(["students"], (oldStudents?: Student[]) => {
          return oldStudents?.map((student) =>
            student.id === updatedData.id ? { ...student, ...updatedData.marks } : student
          );
        });
  
        return { previousStudents }; // Store previous data in case of rollback
      },
      onError: (err, _, context) => {
        if (context?.previousStudents) {
          queryClient.setQueryData(["students"], context.previousStudents);
        }
        console.error("Error updating marks", err);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["students"]); // Refetch to ensure the backend is in sync
      },
    }
  );
  

  const handleDelete = (id: number) => deleteMutation.mutate(id);

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setMarks({
      mathMarks: student.mathMarks,
      scienceMarks: student.scienceMarks,
      englishMarks: student.englishMarks,
    });
  };

  const handleUpdate = () => {
    if (!editStudent) return;
    updateMutation.mutate({ id: editStudent.id, marks }, {
      onSuccess: () => {
        setEditStudent(null); // Close dialog after update
      }
    });  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate({ to: "/" });
  };

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={containerStyles}>
        <Typography variant="h6">Please login to access the student page.</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate({ to: "/" })} sx={{ mt: 2 }}>
          Login
        </Button>
      </Container>
    );
  }

  if (isLoading) return <Loading />;
  if (isError) return <Typography color="error">Error fetching students. Please try again later.</Typography>;

  return (
    <Container maxWidth="lg" sx={containerStyles}>
      <Typography variant="h3" sx={typographyTitleStyles}>
        Student Management
      </Typography>

      <Grid container spacing={3}>
        {students?.map((student: Student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card sx={cardStyles}>
              <CardContent sx={cardContentStyles}>
                <Typography variant="h5" fontWeight="bold" sx={{ fontSize: "1.2rem", color: "primary.main" }}>
                  {student.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Math: {student.mathMarks}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Science: {student.scienceMarks}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  English: {student.englishMarks}
                </Typography>

                {/* Buttons */}
                <Box sx={cardActionsStyles}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate({ to: `/students/${student.id}` })}
                    sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.9rem" }}
                  >
                    View
                  </Button>

                  <Box>
                    <IconButton color="primary" onClick={() => handleEdit(student)} sx={{ transition: "transform 0.2s" }}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(student.id)}
                      sx={{ transition: "transform 0.2s", "&:hover": { transform: "scale(1.2)" } }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => navigate({ to: "/students/create" })} sx={buttonStyles}>
          Add New Student
        </Button>

        <Button variant="outlined" color="secondary" onClick={handleLogout} sx={logoutButtonStyles}>
          Logout
        </Button>
      </Box>

      {/* Edit Dialog */}
      <Dialog
      open={!!editStudent}
      onClose={() => setEditStudent(null)}
      sx={dialogStyles} // Apply dialog styles
      TransitionProps={{
        onEntered: () => console.log("Dialog has entered"),
      }}
    >
      <DialogTitle>Edit Marks for {editStudent?.name}</DialogTitle>
      <DialogContent>
        <TextField
          label="Math Marks"
          type="number"
          value={marks.mathMarks}
          onChange={(e) => setMarks({ ...marks, mathMarks: +e.target.value })}
          sx={textFieldStyles} // Apply text field styles
        />
        <TextField
          label="Science Marks"
          type="number"
          value={marks.scienceMarks}
          onChange={(e) =>
            setMarks({ ...marks, scienceMarks: +e.target.value })
          }
          sx={textFieldStyles} // Apply text field styles
        />
        <TextField
          label="English Marks"
          type="number"
          value={marks.englishMarks}
          onChange={(e) =>
            setMarks({ ...marks, englishMarks: +e.target.value })
          }
          sx={textFieldStyles} // Apply text field styles
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setEditStudent(null)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          color="primary"
          disabled={false} // Add your loading state condition here
        >
          Update Marks
        </Button>
      </DialogActions>
    </Dialog>
    </Container>
  );
};

export default StudentsPage;
