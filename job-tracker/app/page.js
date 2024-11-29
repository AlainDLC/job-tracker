"use client";
import { useState } from "react";
import JobForm from "./components/JobForm";
import ProcessTracker from "./components/ProcessTracker";

const HomePage = () => {
  const [jobs, setJobs] = useState([]); // Holds the list of jobs
  const stages = ["Applied", "Interview", "Tech Test", "Offer"]; // The stages of the job

  // Add a new job to the list
  const handleAddJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]);
  };

  /* // Fetch jobs from Supabase
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*");

      if (error) {
        console.error("Error fetching jobs:", error);
        return;
      }

      setJobs(data); // Set jobs state with the fetched data
    };

    fetchJobs();
  }, []);

  // Add a new job to the list (and update Supabase)
  const handleAddJob = (job) => {
    setJobs((prevJobs) => [...prevJobs, job]); // Update local state

    // Optionally, you can sync this change with Supabase here if you prefer
  }; */

  return (
    <div className="text-center">
      <h1>Job Application Tracker</h1>
      <JobForm onSubmit={handleAddJob} />
      <ProcessTracker stages={stages} jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default HomePage;
