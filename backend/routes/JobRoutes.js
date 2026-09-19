const express = require('express');
const Job = require('../models/Job');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  try {
    const { company, role, status, jobUrl, notes } = req.body;

    const newJob = new Job({
      user: req.user.id,
      company,
      role,
      status,
      jobUrl,
      notes,
    });

    await newJob.save();

    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
module.exports = router;