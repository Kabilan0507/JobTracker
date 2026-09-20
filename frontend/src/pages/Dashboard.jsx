import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import JobFormModal from '../components/JobFormModal';
import './Dashboard.css';

const STATUS_FILTERS = ['All', 'Applied', 'Assessment', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs', authHeader);
        setJobs(res.data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/jobs/${id}`,
        { status: newStatus },
        authHeader
      );
      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
    } catch (err) {
  toast.error('Failed to update status');
}
  };
  const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/');
};

 const handleDelete = async (id) => {
  if (!window.confirm('Delete this application?')) return;
  try {
    await axios.delete(`http://localhost:5000/api/jobs/${id}`, authHeader);
    setJobs(jobs.filter((job) => job._id !== id));
    toast.success('Application deleted');
  } catch (err) {
    toast.error('Failed to delete application');
  }
};

  const filteredJobs =
    activeFilter === 'All' ? jobs : jobs.filter((job) => job.status === activeFilter);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Your applications</h1>
          <p className="job-count">{jobs.length} total</p>
        </div>
        <div className="header-actions">
  <button className="add-job-btn" onClick={() => setShowModal(true)}>
    + Add application
  </button>
  <button className="logout-btn" onClick={handleLogout}>
    Logout
  </button>
</div>
      </div>

      <div className="filter-tabs">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            className={`filter-tab ${activeFilter === status ? 'active' : ''}`}
            onClick={() => setActiveFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="empty-state">Loading...</p>
      ) : filteredJobs.length === 0 ? (
        <p className="empty-state">
          {jobs.length === 0 ? 'No applications yet. Add your first one!' : 'No applications match this filter.'}
        </p>
      ) : (
        <div className="job-list">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-card-main">
                <h3>{job.role}</h3>
                <p>{job.company}</p>
                {job.appliedDate && (
                  <p className="job-date">
                    Applied {new Date(job.appliedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="job-card-actions">
                <select
                  className="job-status"
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Assessment</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                  <option>Withdrawn</option>
                </select>
                <button className="delete-btn" onClick={() => handleDelete(job._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <JobFormModal onClose={() => setShowModal(false)} onJobAdded={handleJobAdded} />
      )}
    </div>
  );
}

export default Dashboard;