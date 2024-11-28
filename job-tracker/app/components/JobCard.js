// JobCard.js
import React from "react";
import Button from "./Button";

const JobCard = ({ job, onMoveJob }) => {
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

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md  bg-white text-black text-left  w-100 mt-4  ">
      <h3 className="text-lg font-semibold">{job.company_name}</h3>
      <p>
        <strong>Job Title:</strong> {job.job_title}
      </p>
      {job.company_link && (
        <p>
          <strong>Company Website:</strong>{" "}
          <a
            href={job.company_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {job.company_link}
          </a>
        </p>
      )}
      <p>
        <strong>Stage:</strong> {job.stage}
      </p>
      <p>
        <strong>Application Date:</strong> {job.application_date}
      </p>
      {formattedDate && (
        <div className="mt-2 ">
          <strong>Interview Date:</strong> {formattedDate}
        </div>
      )}
      <p>
        {job.cv ? (
          <div>
            <p>Cv</p>
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
      </p>

      <Button primary onClick={() => onMoveJob(job.id, "Applied")}>
        Applied
      </Button>

      <Button secondary onClick={() => onMoveJob(job.id, "Interview")}>
        Interview
      </Button>
      <Button test onClick={() => onMoveJob(job.id, "Test")}>
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
