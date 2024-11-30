import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JobCard from "./JobCard";
import Button from "./Button";

const ProcessTracker = ({ stages, jobs, setJobs }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [techTestNotes, setTechTestNotes] = useState({});

  const handleMoveJob = (jobId, newStage) => {
    if (newStage === "Interview") {
      setShowCalendar(true);
    } else {
      setShowCalendar(false);
    }

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

  const handleTechTestNoteChange = (jobId, note) => {
    setTechTestNotes({ ...techTestNotes, [jobId]: note });
  };

  const saveTechTestNote = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, tech_test_notes: techTestNotes[jobId] } : job
    );
    setJobs(updatedJobs);
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[600px] text-black w-auto">
      {stages.map((stage) => (
        <div key={stage} className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">{stage}</h2>
          <div className="mt-4">
            {jobs
              .filter((job) => job.stage === stage)
              .map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onMoveJob={handleMoveJob}
                  selectedDate={selectedDate}
                  techTestNotes={techTestNotes}
                />
              ))}
          </div>

          {stage === "Interview" && showCalendar && (
            <div className="mt-4 text-left">
              <h3 className="font-semibold">Select Interview Date:</h3>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Calender 😎"
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>
          )}

          {stage === "Tech Test" &&
            jobs
              .filter((job) => job.stage === "Tech Test")
              .map((job) => (
                <div key={job.id} className="mt-4 text-left   ">
                  <textarea
                    rows="4"
                    cols="50"
                    type="text"
                    value={techTestNotes[job.id] || ""}
                    onChange={(e) =>
                      handleTechTestNoteChange(job.id, e.target.value)
                    }
                    placeholder="Enter notes for this job"
                    className="flex w-full h-full p-2 border border-gray-300 rounded "
                  />
                  <Button primary onClick={() => saveTechTestNote(job.id)}>
                    Save Notes
                  </Button>
                </div>
              ))}

          {stage === "Offer" && jobs.some((job) => job.stage === "Offer") && (
            <div className="mt-4 text-left">
              <h1>
                Förhandling erbjudanden Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industry&#39;s standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries,
              </h1>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProcessTracker;
