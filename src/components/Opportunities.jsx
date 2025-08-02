import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';

export default function Opportunities() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(() => setJobs([]));
  }, []);

  return (
    <div className="min-h-screen bg-rose-50 pt-10 pb-20">
      <div className="max-w-3xl mx-auto p-6 bg-pink-50 rounded-xl shadow border border-pink-200">
        <h2 className="text-2xl font-bold mb-4 text-pink-700 text-center">🌸 Women's Job Opportunities</h2>
        {jobs.length === 0 ? (
          <p className="text-center text-pink-600">No opportunities available right now.</p>
        ) : (
          jobs.map((job, idx) => <JobCard key={idx} job={job} />)
        )}
      </div>
    </div>
  );
}

