import { useState, useEffect } from 'react';
import { Modal, Button, Select } from '@mantine/core';
import axios from 'axios';

export default function ApplicationModal({ opened, onClose, application, onApplicationDeleted, onApplicationUpdated }) {
  const [status, setStatus] = useState();

  useEffect(() => {
    if (application) {
      setStatus(application.status);
    }
  }, [application]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/applications/${id}`);
      onClose();
      if (onApplicationDeleted) {
        onApplicationDeleted(id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:3000/applications/${id}`, { status });
      onClose();
      if (onApplicationUpdated) {
        onApplicationUpdated(id, status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal opened={opened} onClose={handleClose} title="Application Details" centered>
      {application ? (
        <form>
          <p><strong>Job Title:</strong> {application.jobTitle}</p>
          <p><strong>Company Name:</strong> {application.companyName}</p>
          <p><strong>Date Applied:</strong> {new Date(application.dateApplied).toLocaleDateString()}</p>
          <p><strong>Application Link:</strong> <a href={application.applicationLink} target="_blank" rel="noopener noreferrer">View Application</a></p>
          <p><strong>Status:</strong></p>
          <Select
            label="Update Status"
            value={status}
            data={['Applied', 'Interviewing', 'Offered', 'Rejected']}
            onChange={setStatus}
          />
          <p><strong>Location:</strong> {application.location}</p>
          <p><strong>Salary Range:</strong> {application.salaryRange}</p>
          <p><strong>Contact Name:</strong> {application.contactName}</p>
          <p><strong>Contact Email:</strong> {application.contactEmail}</p>
          <p><strong>Job Reference ID:</strong> {application.jobReferenceID}</p>
          <p><strong>Job Description:</strong> {application.jobDescription}</p>
          <p><strong>Notes:</strong> {application.notes}</p>
          <Button onClick={() => handleUpdate(application._id)}>Update</Button>
          <Button color="red" onClick={() => handleDelete(application._id)}>Delete</Button>
        </form>

      ) : (
        <p>No application selected</p>
      )}
    </Modal>
  );
}
