// components/JobForm.js
import { useState } from "react";

const JobForm = ({ onSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [cv, setCv] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(), // Generates a unique ID based on time (you might want a more robust solution in production)
      job_title: jobTitle,
      company_name: companyName,
      stage: "Applied", // You can set the initial stage here
      application_date: applicationDate,
      cv: cv,
    };

    onSubmit(newJob); // Sending the job data back to the parent component
    setJobTitle("");
    setCompanyName("");
    setApplicationDate("");
    setCv(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        value={applicationDate}
        onChange={(e) => setApplicationDate(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        onChange={(e) => setCv(e.target.files[0])}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
