"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import JobCard from "./JobCard";

const ProcessTracker = ({ stages, jobs, setJobs }) => {
  // Handles the drag-and-drop logic
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const jobId = result.draggableId;
    const newStage = destination.droppableId; // New stage after dragging

    // Update job's stage in the state
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === parseInt(jobId) ? { ...job, stage: newStage } : job
      )
    );
  };

  // Function to handle stage change when moving a job manually
  const handleMoveJob = (jobId, newStage) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, stage: newStage } : job
      )
    );
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex space-x-8">
        {stages.map((stage) => (
          <Droppable droppableId={stage} key={stage}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold text-center mb-4">
                  {stage}
                </h3>
                <div className="space-y-4">
                  {/* Filter jobs by stage */}
                  {jobs
                    .filter((job) => job.stage === stage)
                    .map((job, index) => (
                      <Draggable
                        key={job.id}
                        draggableId={job.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 rounded-lg shadow-sm"
                          >
                            <JobCard job={job} onMoveJob={handleMoveJob} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default ProcessTracker;
