import { useState, useEffect } from 'react';
import { Modal, Button, Select } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { updateExistingApplication, deleteExistingApplication } from '../../store/applications';
import { TextInput } from '@mantine/core';

export default function ApplicationModal({ opened, onClose, application }) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(application);

  useEffect(() => {
    setFormState(application);
  }, [application]);

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateExistingApplication(formState));
    if (onClose) {
      onClose();
    }
  };

  const onDeletedClicked = () => {
    dispatch(deleteExistingApplication(application));
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Application Details" centered>
      {formState ? (
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Job Title"
            name="jobTitle"
            value={formState.jobTitle}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Company Name"
            name="companyName"
            value={formState.companyName}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Date Applied"
            name="dateApplied"
            value={formState.dateApplied}
            onChange={handleChange}
            required
          />
          <Select
            label="Status"
            data={['Applied', 'Interviewing', 'Offer Received', 'Rejected']}
            value={formState.status}
            onChange={(value) => setFormState({ ...formState, status: value })}
          />
          <TextInput
            label="Location"
            name="location"
            value={formState.location}
            onChange={handleChange}
          />
          <TextInput
            label="Job Description"
            name="jobDescription"
            value={formState.jobDescription}
            onChange={handleChange}
          />
          <TextInput
            label="Application Link"
            name="applicationLink"
            value={formState.applicationLink}
            onChange={handleChange}
          />
          <TextInput
            label="Salary Range"
            name="salaryRange"
            value={formState.salaryRange}
            onChange={handleChange}
          />
          <TextInput
            label="Contact Name"
            name="contactName"
            value={formState.contactName}
            onChange={handleChange}
          />
          <TextInput
            label="Contact Email"
            name="contactEmail"
            value={formState.contactEmail}
            onChange={handleChange}
          />
          <TextInput
            label="Job Reference ID"
            name="jobReferenceID"
            value={formState.jobReferenceID}
            onChange={handleChange}
          />
          <TextInput
            label="Notes"
            name="notes"
            value={formState.notes}
            onChange={handleChange}
          />
          <Button color='cyan' type="submit">Update</Button>
          <Button color="orange" onClick={onDeletedClicked}>Delete</Button>
        </form>
      ) : null}
    </Modal>
  );
}
