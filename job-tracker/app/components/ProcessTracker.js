// components/ProcessTracker.js
import JobCard from "./JobCard";

const ProcessTracker = ({ stages, jobs, setJobs }) => {
  const handleMoveJob = (jobId, newStage) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, stage: newStage } : job
    );
    setJobs(updatedJobs);

    /*
    const updateJobStage = async () => {
      const { error } = await supabase
        .from("jobs")
        .update({ stage: newStage })
        .eq("id", jobId);

      if (error) {
        console.error("Error updating job stage:", error);
      }
            updateJobStage();
    };*/
  };

  return (
    <div className="grid grid-cols-3 gap-6  h-[600px] text-black">
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
        </div>
      ))}
    </div>
  );
};

export default ProcessTracker;
