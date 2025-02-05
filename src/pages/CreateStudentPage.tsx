import { useState } from 'react';
import { createStudent } from '../services/studentService';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import Loading from '../components/Loading';
import "../css/createstudent.css";

const CreateStudentPage = () => {
  const [name, setName] = useState('');
  const [scienceMarks, setScienceMarks] = useState<number | string>('');
  const [englishMarks, setEnglishMarks] = useState<number | string>('');
  const [mathMarks, setMathMarks] = useState<number | string>('');
  const navigate = useNavigate();

  // TanStack Query Mutation
  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: async () => {
      const studentData = {
        name,
        scienceMarks: scienceMarks === '' ? 0 : parseInt(scienceMarks as string, 10),
        englishMarks: englishMarks === '' ? 0 : parseInt(englishMarks as string, 10),
        mathMarks: mathMarks === '' ? 0 : parseInt(mathMarks as string, 10),
      };
      return createStudent(studentData);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync(); // Executes the mutation
      navigate({ to: '/students' });
    } catch (err) {
      console.error("Failed to create student:", err);
    }
  };

  return (
    <div className="create-student-container">
      <h1>Create Student</h1>
      {error instanceof Error  && <p className="error-message">Failed to create student</p>}
      {isLoading ? <Loading /> : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Science Marks:
            <input
              type="number"
              value={scienceMarks}
              onChange={(e) => setScienceMarks(e.target.value)}
              required
              min="0"
            />
          </label>
          <label>
            English Marks:
            <input
              type="number"
              value={englishMarks}
              onChange={(e) => setEnglishMarks(e.target.value)}
              required
              min="0"
            />
          </label>
          <label>
            Math Marks:
            <input
              type="number"
              value={mathMarks}
              onChange={(e) => setMathMarks(e.target.value)}
              required
              min="0"
            />
          </label>
          <button type="submit">Create</button>
        </form>
      )}
      <button onClick={() => navigate({ to: '/students' })}>Cancel</button>
    </div>
  );
};

export default CreateStudentPage;
