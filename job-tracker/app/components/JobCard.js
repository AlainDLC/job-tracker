import Link from "next/link";
import Button from "./Button";
import { useState } from "react";
import { supabase } from "../supabase";

const JobCard = ({
  job,
  onMoveJob,
  onDeleteJob,
  selectedDate,
  techTestNotes = {},
}) => {
  const [downloadLink, setDownloadLink] = useState(null); // För att hålla den genererade URL:en

  const generateDownloadLink = async (filePath) => {
    try {
      const { data, error } = await supabase.storage
        .from("cvs")
        .createSignedUrl(filePath, 3600);

      if (error) {
        console.error("Error generating signed URL:", error);
      } else {
        setDownloadLink(data.signedUrl);
      }
    } catch (err) {
      console.error("Error generating download link:", err);
    }
  };

  const formattedDate = job.interview_date
    ? new Date(job.interview_date).toLocaleDateString()
    : null;
  const formattedTechTestDate = job.interview_tech
    ? new Date(job.interview_tech).toLocaleDateString()
    : null;

  const techTestNote = techTestNotes[job.id];

  const handleDelete = () => {
    onDeleteJob(job.id); // Anropa onDeleteJob och skicka jobbets ID
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white text-black text-left w-100 mt-4">
      <h3 className="text-lg font-semibold">
        <strong>Company: </strong>
        {job.company_name}
      </h3>
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
        <div className="mt-2">
          <strong>Interview Date:</strong> {formattedDate}
        </div>
      )}
      {job.stage === "Tech Test" && formattedTechTestDate && (
        <div className="mt-2">
          <strong>Tech Test Interview Date:</strong> {formattedTechTestDate}
        </div>
      )}
      {job.cv ? (
        <div className="flex items-center space-x-2">
          <span>Cv:</span>
          <button
            onClick={() => generateDownloadLink(job.cv)}
            className="text-black-500 ml-2 no-underline"
          >
            {job.cv}
          </button>
          {downloadLink && (
            <a
              href={downloadLink}
              download
              className="text-blue-500 ml-2 underline"
            >
              Open
            </a>
          )}
        </div>
      ) : (
        "No CV: uploaded"
      )}
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
      <Button
        primary
        onClick={() => onMoveJob(job.id, "Applied")}
        className="text-sm py-1 px-2 sm:text-base sm:py-2 sm:px-4"
      >
        Applied
      </Button>

      <Button
        secondary
        onClick={() => onMoveJob(job.id, "Interview")}
        disabled={!selectedDate}
      >
        Interview
      </Button>

      <Button test onClick={() => onMoveJob(job.id, "Tech Test")}>
        Test
      </Button>

      <Button success onClick={() => onMoveJob(job.id, "Offer")}>
        Offer
      </Button>

      <Button danger onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default JobCard;
