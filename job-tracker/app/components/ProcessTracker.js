import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JobCard from "./JobCard";

const ProcessTracker = ({ stages, jobs, setJobs }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleMoveJob = (jobId, newStage) => {
    if (newStage === "Interview") {
      setShowCalendar(true); // Visa kalender när jobbet flyttas till "Interview"
    } else {
      setShowCalendar(false); // Dölja kalender om jobbet flyttas bort från "Interview"
    }

    // Uppdatera jobbinformationen när jobbet flyttas och när intervjudatum har valts
    const updatedJobs = jobs.map((job) =>
      job.id === jobId
        ? {
            ...job,
            stage: newStage,
            interview_date: newStage === "Interview" ? selectedDate : null,
          }
        : job
    );
    setJobs(updatedJobs);
  };

  return (
    <div className="grid grid-cols-3 gap-6 h-[600px] text-black">
      {stages.map((stage) => (
        <div key={stage} className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">{stage}</h2>
          <div className="mt-4">
            {jobs
              .filter((job) => job.stage === stage)
              .map((job) => (
                <JobCard key={job.id} job={job} onMoveJob={handleMoveJob} />
              ))}
          </div>

          {stage === "Interview" && showCalendar && (
            <div className="mt-4">
              <h3 className="font-semibold">Select Interview Date:</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessTracker;
