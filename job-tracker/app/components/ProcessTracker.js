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

  const updateInterviewDate = async (jobId, selectedDate) => {
    try {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("jobs")
        .update({ interview_date: formattedDate })
        .eq("id", jobId);

      if (error) throw error;

      console.log("Interview date updated successfully", data);
    } catch (error) {
      console.error("Error updating interview date:", error);
    }
  };

  const saveTechTestNote = async (jobId) => {
    const note = techTestNotes[jobId];

    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({ tech_test_notes: note })
        .eq("id", jobId);

      if (error) throw error;

      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, tech_test_notes: note } : job
      );
      setJobs(updatedJobs);

      console.log("Tech test note saved successfully", data);
    } catch (error) {
      console.error("Error saving tech test note:", error);
    }
  };

  const saveTechOffer = async (jobId) => {
    const offer = techOffer[jobId];

    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({ tech_offer: offer })
        .eq("id", jobId);

      if (error) throw error;

      const updatedJobs = jobs.map((job) =>
        job.id === jobId ? { ...job, tech_offer: offer } : job
      );
      setJobs(updatedJobs);

      console.log("Tech offer saved successfully", data);
    } catch (error) {
      console.error("Error saving tech offer:", error);
    }
  };

  const handleMoveJob = async (jobId, newStage) => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .update({ stage: newStage })
        .eq("id", jobId);

      if (error) throw error;

      const updatedJobs = jobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              stage: newStage,
              interview_date:
                newStage === "Interview" ? selectedDate : job.interview_date,
              interview_tech:
                newStage === "Tech Test" ? selectedDate : job.interview_tech,
              tech_test_notes:
                newStage === "Offer"
                  ? techTestNotes[jobId]
                  : job.tech_test_notes,
              tech_offer:
                newStage === "Offer" ? techOffer[jobId] : job.tech_offer,
            }
          : job
      );

      setJobs(updatedJobs);

      console.log("Job stage updated successfully", data);
    } catch (error) {
      console.error("Error updating job stage:", error);
    }
  };

  const handleTechTestNoteChange = (jobId, note) => {
    setTechTestNotes({ ...techTestNotes, [jobId]: note });
  };

  const handleTechOfferNoteChange = (jobId, offer) => {
    setTechOffer({ ...techOffer, [jobId]: offer });
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
