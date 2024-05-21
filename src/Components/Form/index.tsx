import { useState } from 'react';
import { Stepper, Button, Group, TextInput, Code, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import axios from 'axios';

function JobApplicationForm(props) {
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState(false);



  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      jobTitle: '',
      companyName: '',
      dateApplied: null,
      applicationLink: '',
      status: 'Applied',
      jobDescription: '',
      location: '',
      notes: '',
      salaryRange: '',
      contactName: '',
      contactEmail: '',
      jobReferenceID: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          jobTitle: values.jobTitle.trim().length < 2 ? 'Job title must include at least 2 characters' : null,
          companyName: values.companyName.trim().length < 2 ? 'Company name must include at least 2 characters' : null,
        };
      }

      if (active === 1) {
        return {
          dateApplied: values.dateApplied ? null : 'Date applied is required',
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async (values) => {
    try {
      await axios.post('http://localhost:3000/applications', values);
      setSubmitted(true);
      props.updated(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const onSubmit = () => {
    const values = form.getValues();
    handleSubmit(values);
  };

  const startNewApplication = () => {
    form.reset();
    setActive(0);
    setSubmitted(false);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px', padding: '0 20px' }}>
      <h1>Job Application Form</h1>
      <Stepper color='cyan' active={active}>
        <Stepper.Step label="First step" description="Title, Company, Description, Location">
          <TextInput
            label="Job Title"
            placeholder="Job Title"
            key={form.key('jobTitle')}
            {...form.getInputProps('jobTitle')}
          />
          <TextInput
            mt="md"
            label="Company Name"
            placeholder="Company Name"
            key={form.key('companyName')}
            {...form.getInputProps('companyName')}
          />
          <Textarea
            mt="md"
            label="Job Description"
            placeholder="Job Description"
            key={form.key('jobDescription')}
            {...form.getInputProps('jobDescription')}
          />
          <TextInput
            mt="md"
            label="Location"
            placeholder="Location"
            key={form.key('location')}
            {...form.getInputProps('location')}
          />
        </Stepper.Step>

        <Stepper.Step label="Second step" description="Date, Link, Salary">
          <DatePicker
            key={form.key('dateApplied')}
            {...form.getInputProps('dateApplied')}
          />
          <TextInput
            mt="md"
            label="Application Link"
            placeholder="Application Link"
            key={form.key('applicationLink')}
            {...form.getInputProps('applicationLink')}
          />
          <TextInput
            mt="md"
            label="Salary Range"
            placeholder="Salary Range"
            key={form.key('salaryRange')}
            {...form.getInputProps('salaryRange')}
          />
        </Stepper.Step>

        <Stepper.Step label="Final step" description="Contacts, Reference ID, Notes">
          <TextInput
            label="Contact Name"
            placeholder="Contact Name"
            key={form.key('contactName')}
            {...form.getInputProps('contactName')}
          />
          <TextInput
            mt="md"
            label="Contact Email"
            placeholder="Contact Email"
            key={form.key('contactEmail')}
            {...form.getInputProps('contactEmail')}
          />
          <TextInput
            mt="md"
            label="Job Reference ID"
            placeholder="Job Reference ID"
            key={form.key('jobReferenceID')}
            {...form.getInputProps('jobReferenceID')}
          />
          <Textarea
            mt="md"
            label="Notes"
            placeholder="Notes"
            key={form.key('notes')}
            {...form.getInputProps('notes')}
          />
        </Stepper.Step>

        <Stepper.Completed>
          {submitted ? (
            <>
              <div>Saved!</div>
              <Button onClick={startNewApplication} mt="md">
                Add Another
              </Button>
            </>
          ) : (
            <>
              Completed! Form values:
              <Code block mt="xl">
                {JSON.stringify(form.getValues(), null, 2)}
              </Code>
            </>
          )}
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {!submitted && active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {!submitted && active !== 3 ? (
          <Button color='orange' onClick={nextStep}>Next step</Button>
        ) : (
          !submitted && <Button onClick={onSubmit}>Submit</Button>
        )}
      </Group>
    </div>
  );
}

export default JobApplicationForm;
