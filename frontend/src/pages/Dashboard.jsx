import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Your applications</h1>
      </div>

      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="empty-state">No applications yet. Add your first one!</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-card-main">
                <h3>{job.role}</h3>
                <p>{job.company}</p>
              </div>
              <span className="job-status">{job.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;