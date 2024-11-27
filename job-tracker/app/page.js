"use client";
import { useState } from "react";
import JobForm from "./components/JobForm";
import ProcessTracker from "./components/ProcessTracker";

const HomePage = () => {
  const [jobs, setJobs] = useState([]); // Holds the list of jobs
  const [stages, setStages] = useState(["Applied", "Interview", "Offer"]); // The stages of the job

  // Add a new job to the list
  const handleAddJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  return (
    <div>
      <h1>Job Application Tracker</h1>
      <JobForm onSubmit={handleAddJob} />
      <ProcessTracker stages={stages} jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default HomePage;
