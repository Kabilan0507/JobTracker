import toast from 'react-hot-toast';
import { useState } from 'react';
import axios from 'axios';
import './JobFormModal.css';

function JobFormModal({ onClose, onJobAdded }) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: new Date().toISOString().split('T')[0],
    jobUrl: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Application added');
      onJobAdded(res.data);
      onClose();
    }  catch (err) {
  toast.error('Failed to add application');
}
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Add application</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Company</label>
            <input name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="modal-field">
            <label>Role</label>
            <input name="role" value={formData.role} onChange={handleChange} required />
          </div>
          <div className="modal-field">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Assessment</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
              <option>Withdrawn</option>
            </select>
          </div>
          <div className="modal-field">
            <label>Applied date</label>
            <input type="date" name="appliedDate" value={formData.appliedDate} onChange={handleChange} />
          </div>
          <div className="modal-field">
            <label>Job URL (optional)</label>
            <input name="jobUrl" value={formData.jobUrl} onChange={handleChange} />
          </div>
          <div className="modal-field">
            <label>Notes (optional)</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} />
          </div>
          <div className="modal-actions">
            <button type="button" className="modal-btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobFormModal;