import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getSubjectAverage, getPercentage } from '../services/statsService';
import Loading from '../components/Loading';
import "../css/statspage.css";

const StatsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState('maths');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const subjects = ['maths', 'science', 'english'];

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // UseQuery with enabled set to false, so no automatic fetch
  const {
    data: subjectAverage,
    isLoading: isLoadingSubject,
    error: subjectError,
    refetch: refetchSubject, // Get the refetch function
  } = useQuery(
    ['subjectAverage', selectedSubject],
    () => getSubjectAverage(selectedSubject),
    { enabled: false } // Disable automatic fetching
  );

  const {
    data: percentages,
    isLoading: isLoadingPercentages,
    error: percentagesError,
    refetch: refetchPercentages, // Get the refetch function
  } = useQuery(
    ['percentages'],
    getPercentage,
    { enabled: false } // Disable automatic fetching
  );
  // const [isFetching, setIsFetching] = useState(false);

  // Manually trigger the query when needed (e.g., when a user logs in)
  useEffect(() => {
    if (isLoggedIn) {
      // setIsFetching(true)
      setTimeout(() => {
        refetchSubject()
        // .finally(()=> setIsFetching(false));
        refetchPercentages();
      }, 1000); // Delay of 500ms
    }
  }, [selectedSubject, isLoggedIn]);
  

  if (!isLoggedIn) {
    return (
      <div>
        <p>Please login to access stats.</p>
        <button onClick={() => navigate({to:'/'})}>Login</button>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <h1>Subject Stats</h1>

      <div className="select-container">
        <label htmlFor="subject" style={{ marginRight: '10px', color: "black" }}>Choose a subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        {(isLoadingSubject || isLoadingPercentages) ? (
          <Loading />
        ) : (
          <>
            {(subjectError || percentagesError) && <p className="error-message">Failed to fetch stats</p>}
            {subjectAverage !== null && (
              <p className="stat-heading">Average for {selectedSubject}: {subjectAverage}</p>
            )}
            {percentages && percentages.length > 0 && (
              <div>
                <h3 style={{ color: "black" }}>Percentages:</h3>
                {percentages.map((percentage:string, index:number) => (
                  <p key={index} className="stat-heading">{percentage}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <button onClick={() => { localStorage.removeItem('authToken'); setIsLoggedIn(false); }}>Logout</button>
    </div>
  );
};

export default StatsPage;
