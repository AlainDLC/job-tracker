// JobCard.js
import React from "react";
import Button from "./Button";
import Link from "next/link";

const JobCard = ({
  job,
  onMoveJob,
  selectedDate = { selectedDate },
  techTestNotes = {},
}) => {
  const handleDownload = (file) => {
    const fileURL = URL.createObjectURL(file); // Create a URL for the file
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name; // Suggest file name when downloading
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const formattedDate = job.interview_date
    ? new Date(job.interview_date).toLocaleDateString()
    : null;
  const formattedTechTestDate = job.interview_tech
    ? new Date(job.interview_tech).toLocaleDateString()
    : null;

  const techTestNote = techTestNotes[job.id];

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md  bg-white text-black text-left  w-100 mt-4  ">
      <h3 className="text-lg font-semibold">{job.company_name}</h3>
      <div>
        <strong>Job Title:</strong> {job.job_title}
      </div>
      {job.company_link && (
        <div>
          <strong>Company Website:</strong>{" "}
          <Link
            href={job.company_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {job.company_link}
          </Link>
        </div>
      )}
      <div>
        <strong>Stage:</strong> {job.stage}
      </div>
      <div>
        <strong>Application Date:</strong> {job.application_date}
      </div>
      {formattedDate && (
        <div className="mt-2 ">
          <strong>Interview Date:</strong> {formattedDate}
        </div>
      )}
      {job.stage === "Tech Test" && formattedTechTestDate && (
        <div className="mt-2">
          <strong>Interview Date:</strong> {formattedTechTestDate}
        </div>
      )}
      {job.stage === "Offer" && formattedTechTestDate && (
        <div className="mt-2">
          <strong>Interview Date:</strong> {formattedTechTestDate}
        </div>
      )}
      <div>
        {job.cv ? (
          <div>
            <div>Cv</div>
            <button
              onClick={() => handleDownload(job.cv)}
              className="text-blue-500 underline ml-2"
            >
              Open <span>{job.cv.name}</span>
            </button>
          </div>
        ) : (
          "No CV uploaded"
        )}
      </div>
      <div>
        {job.stage === "Tech Test" && techTestNote && (
          <div className="mt-2">
            <strong>Tech Test Notes:</strong> {techTestNote}
          </div>
        )}
        {job.stage === "Offer" && job.tech_test_notes && (
          <div className="mt-2">
            <strong>Tech Test Notes:</strong> {job.tech_test_notes}
          </div>
        )}
        {job.stage === "Offer" &&
          (!job.tech_offer ? (
            <div className="mt-2">No tech offer available</div>
          ) : (
            <div className="mt-2">
              <strong>Tech Test Offer:</strong> {job.tech_offer}
            </div>
          ))}
      </div>
      <Button primary onClick={() => onMoveJob(job.id, "Applied")}>
        Applied
      </Button>

      <Button
        secondary
        onClick={() => onMoveJob(job.id, "Interview")}
        disabled={!selectedDate} // Knappen är inaktiv om inget datum är valt
        className={`${
          !selectedDate
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        } text-white px-4 py-2 rounded`}
      >
        Interview
      </Button>
      <Button test onClick={() => onMoveJob(job.id, "Tech Test")}>
        Test
      </Button>
      <Button success onClick={() => onMoveJob(job.id, "Offer")}>
        Offer
      </Button>
      <Button danger onClick={() => onMoveJob(job.id, "")}>
        Delete
      </Button>
    </div>
  );
};

export default JobCard;
