import React from 'react';

export default function JobCard({ job }) {
  return (
    <div className="border border-pink-300 rounded p-4 shadow-md mb-4 bg-white">
      <h3 className="text-lg font-bold text-pink-700">{job.title}</h3>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Experience:</strong> {job.experience}</p>
      <p><strong>Skills:</strong> {job.skills}</p>
      <a
        href={job.apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 bg-pink-500 hover:bg-pink-600 text-white py-1 px-4 rounded"
      >
        Apply
      </a>
    </div>
  );
}
