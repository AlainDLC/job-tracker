import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import JobCard from "./JobCard";
import Button from "./Button";
import { supabase } from "../supabase";

const ProcessTracker = ({ stages, jobs, setJobs, onDeleteJob }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [techTestNotes, setTechTestNotes] = useState({});
  const [techOffer, setTechOffer] = useState({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase.from("jobs").select();
        if (error) throw error;
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [setJobs]);

  // måste köra en insert spara datumet i array

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
            interview_tech:
              newStage === "Tech Test" ? selectedDate : job.interview_tech,
            tech_test_notes:
              newStage === "Offer" ? techTestNotes[jobId] : job.tech_test_notes,
            tech_offer:
              newStage === "Offer" ? techOffer[jobId] : job.tech_offer,
          }
        : job
    );
    setJobs(updatedJobs);
  };

  const handleTechTestNoteChange = (jobId, note) => {
    setTechTestNotes({ ...techTestNotes, [jobId]: note });
  };

  const handleTechOfferNoteChange = (jobId, offer) => {
    setTechOffer({ ...techOffer, [jobId]: offer });
  };

  const saveTechTestNote = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, tech_test_notes: techTestNotes[jobId] } : job
    );
    setJobs(updatedJobs);
  };

  const saveTechOffer = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, tech_offer: techOffer[jobId] } : job
    );
    setJobs(updatedJobs);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { error } = await supabase.from("jobs").delete().eq("id", jobId);

      if (error) {
        console.error("Error deleting job:", error);
        return;
      }

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[600px] text-black w-auto">
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
                  onDeleteJob={handleDeleteJob}
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
                placeholderText="Calendar 😎"
                className="w-full p-2 border border-gray-300 rounded text-black"
              />
            </div>
          )}

          {stage === "Tech Test" &&
            jobs
              .filter((job) => job.stage === "Tech Test")
              .map((job) => (
                <div key={job.id} className="mt-4 text-left">
                  <textarea
                    rows="4"
                    cols="50"
                    value={techTestNotes[job.id] || ""}
                    onChange={(e) =>
                      handleTechTestNoteChange(job.id, e.target.value)
                    }
                    placeholder="Enter notes for this job"
                    className="flex w-full h-full p-2 border border-gray-300 rounded"
                  />
                  <Button primary onClick={() => saveTechTestNote(job.id)}>
                    Save Notes
                  </Button>
                </div>
              ))}

          {stage === "Offer" &&
            jobs
              .filter((job) => job.stage === "Offer")
              .map((job) => (
                <div key={job.id} className="mt-4 text-left">
                  <input
                    type="text"
                    value={techOffer[job.id] || ""}
                    onChange={(e) =>
                      handleTechOfferNoteChange(job.id, e.target.value)
                    }
                    placeholder="Enter offer details"
                    className="flex w-full p-2 border border-gray-300 rounded"
                  />
                  <Button primary onClick={() => saveTechOffer(job.id)}>
                    Save Offer
                  </Button>
                </div>
              ))}
        </div>
      ))}
    </div>
  );
};

export default ProcessTracker;
