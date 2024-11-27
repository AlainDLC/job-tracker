// components/JobForm.js
import { useState } from "react";

const JobForm = ({ onSubmit }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyLink, setCompanyLink] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [cv, setCv] = useState(null);

  /*
      const { data, error } = await supabase
      .from("jobs") // Namnet på din tabell
      .insert([newJob]);

    if (error) {
      console.error("Error inserting job:", error);
      return;
    }

    // Lägg till jobb i state efter att det lagts till i Supabase
    onSubmit(data[0]);

    // Rensa formuläret
    setJobTitle("");
    setCompanyName("");
    setApplicationDate("");
    setCv(null);
  };
*/

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(), // Generates a unique ID based on time (you might want a more robust solution in production)
      job_title: jobTitle,
      company_name: companyName,
      company_link: companyLink,
      stage: "Applied", // You can set the initial stage here
      application_date: applicationDate,
      cv: cv,
    };

    onSubmit(newJob); // Sending the job data back to the parent component
    setJobTitle("");
    setCompanyName("");
    setCompanyLink("");
    setApplicationDate("");
    setCv(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can implement logic here to upload to a server or storage and get the URL
      const fileUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded file
      setCv(file);
      setCvUrl(fileUrl); // Save the file URL
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg">
        <input
          type="text"
          placeholder="Job Title "
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded  text-black"
        />
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded  text-black"
        />
        <input
          type="url"
          placeholder="Company Website URL"
          value={companyLink}
          onChange={(e) => setCompanyLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded  text-black"
        />
        <input
          type="date"
          value={applicationDate}
          onChange={(e) => setApplicationDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded  text-black"
        />
        <input
          type="file"
          onChange={(e) => setCv(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded  text-black"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 rounded hover:bg-blue-700  text-black"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
