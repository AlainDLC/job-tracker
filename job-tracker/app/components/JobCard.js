const JobCard = ({ job, onMoveJob }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white  text-black">
      <h3 className="text-lg font-semibold">{job.company_name}</h3>
      <p>
        <strong>Job Title:</strong> {job.job_title}
      </p>
      <p>
        <strong>Stage:</strong> {job.stage}
      </p>
      <p>
        <strong>Application Date:</strong> {job.application_date}
      </p>
      <p>
        <strong>CV:</strong> {job.cv ? job.cv.name : "No CV uploaded"}
      </p>

      <div className="mt-4 space-x-2">
        <button
          onClick={() => onMoveJob(job.id, "Applied")}
          className="bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-700"
        >
          Move to Applied
        </button>
        <button
          onClick={() => onMoveJob(job.id, "Interview")}
          className="bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-700"
        >
          Move to Interview
        </button>
        <button
          onClick={() => onMoveJob(job.id, "Offer")}
          className="bg-green-500 text-black py-2 px-4 rounded hover:bg-green-700"
        >
          Move to Offer
        </button>
      </div>
    </div>
  );
};

export default JobCard;
