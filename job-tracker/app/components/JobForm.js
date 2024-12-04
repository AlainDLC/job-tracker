import { useState } from "react";
import { supabase } from "../supabase";

const JobForm = ({ onSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLink, setCompanyLink] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [cv, setCv] = useState(null);
  const [uploading, setUploading] = useState(false);

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanera filnamnet innan uppladdning
    const sanitizedFileName = cv
      ? sanitizeFileName(`cv_${Date.now()}_${cv.name}`)
      : null;

    const newJob = {
      job_title: jobTitle,
      company_name: companyName,
      company_link: companyLink,
      stage: "Applied",
      application_date: applicationDate,
      cv: sanitizedFileName,
    };

    try {
      setUploading(true);

      // Först lägg till jobbet till Supabase 'jobs' tabell
      const { data, error } = await supabase
        .from("jobs")
        .insert([newJob])
        .select();

      if (error) {
        console.error("Error inserting job:", error);
        return;
      }

      // Om ett CV finns, ladda upp det till Supabase Storage
      if (cv) {
        const bucket = "cvs"; // Se till att du har rätt bucket-namn
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(sanitizedFileName, cv);

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          alert("Error uploading file.");
          return;
        }
        // Uppdatera jobbets CV-fält med den uppladdade filens URL
        const { data: updatedJob, error: updateError } = await supabase
          .from("jobs")
          .update({ cv: uploadData?.Key })
          .eq("id", data[0].id);

        if (updateError) {
          console.error("Error updating job with file URL:", updateError);
          alert("Error updating job with file URL.");
          return;
        }
      }

      if (data && data.length > 0) {
        // Skicka tillbaka jobbinformationen till föräldern
        onSubmit(data[0]);
      }

      // Rensa formuläret
      setJobTitle("");
      setCompanyName("");
      setCompanyLink("");
      setApplicationDate("");
      setCv(null);
    } catch (error) {
      console.error("Error inserting job:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 max-w-lg text-black"
      >
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="text"
          placeholder="Company Website URL"
          value={companyLink}
          onChange={(e) => setCompanyLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="file"
          onChange={(e) => setCv(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded text-white"
        />
        <button
          type="submit"
          className={`w-full py-2 rounded text-white ${
            jobTitle && applicationDate
              ? "bg-blue-400 hover:bg-blue-500"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!jobTitle || !applicationDate}
        >
          {uploading ? "Uploading..." : "Add Job"}
        </button>
      </form>

      <div className="mt-6"></div>
    </div>
  );
};

export default JobForm;
