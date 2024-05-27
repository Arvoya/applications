import { useState, useEffect } from 'react';
import { Modal, Button, Select } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { updateExistingApplication, deleteExistingApplication } from '../../store/applications';


export default function ApplicationModal({ opened, onClose, application, }) {
  const [selectedApp, setApplication] = useState(application);
  const dispatch = useDispatch();


  useEffect(() => {
    setApplication(application);
  }, [application]);

  const onUpdatedClicked = () => {
    updateExistingApplication(selectedApp);
  }

  const onDeletedClicked = () => {
    deleteExistingApplication(selectedApp);
  }


  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };


  return (
    <Modal opened={opened} onClose={handleClose} title="Application Details" centered>
      {selectedApp ? (
        <form>
          <p><strong>Job Title:</strong> {selectedApp.jobTitle}</p>
          <p><strong>Company Name:</strong> {application.companyName}</p>
          <p><strong>Date Applied:</strong> {new Date(application.dateApplied).toLocaleDateString()}</p>
          <p><strong>Application Link:</strong> <a href={application.applicationLink} target="_blank" rel="noopener noreferrer">View Application</a></p>
          <p><strong>Status:</strong></p>
          <Select
            label="Update Status"
            value={selectedApp.status}
            data={['Applied', 'Interviewing', 'Offered', 'Rejected', 'Getting Cold', 'Frozen']}
            allowDeselect={false}
          />
          <p><strong>Location:</strong> {application.location}</p>
          <p><strong>Salary Range:</strong> {application.salaryRange}</p>
          <p><strong>Contact Name:</strong> {application.contactName}</p>
          <p><strong>Contact Email:</strong> {application.contactEmail}</p>
          <p><strong>Job Reference ID:</strong> {application.jobReferenceID}</p>
          <p><strong>Job Description:</strong> {application.jobDescription}</p>
          <p><strong>Notes:</strong> {application.notes}</p>
          <Button color='cyan' onClick={() => onUpdatedClicked()}>Update</Button>
          <Button color="orange" onClick={() => onDeletedClicked()}>Delete</Button>
        </form>

      ) : (
        null
      )}
    </Modal>
  );
}
