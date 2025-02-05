import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getStudentById } from '../services/studentService';
import Loading from '../components/Loading'; // Import the loading component

const StudentDetailsPage = () => {
  const { id } = useParams({ strict: false });

  // Use TanStack Query to fetch student data
  const { data: student, isLoading, isError, error } = useQuery(
    ['student', id], // Query key with id to uniquely identify the data
    () => getStudentById(id), // Function to fetch the student data
    {
      enabled: !!id, // Only fetch if id is available
    }
  );

  // Display loading spinner while fetching data
  if (isLoading) return <Loading />;

  // Handle error during data fetch
  if (isError) return <p>{(error as Error).message}</p>;

  // Handle case when student data is not found
  if (!student) return <p>No student found</p>;

  return (
    <div>
      <h1>Student Details</h1>
      <p><strong>ID:</strong> {student.id}</p>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Science Marks:</strong> {student.scienceMarks}</p>
      <p><strong>English Marks:</strong> {student.englishMarks}</p>
      <p><strong>Math Marks:</strong> {student.mathMarks}</p>
    </div>
  );
};

export default StudentDetailsPage;
