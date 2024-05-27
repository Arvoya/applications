import { useState, useCallback } from 'react';
import { LoadingOverlay } from '@mantine/core';
import { Table, TableScrollContainer, Select } from '@mantine/core';
import ApplicationModal from '../Modal';
import { useSelector } from 'react-redux';

export default function Lists() {
  const [sortField, setSortField] = useState('jobTitle');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const applications = useSelector(state => state.application.applications);
  const loading = useSelector(state => state.application.isLoading);
  const displayData = useSelector(state => state.displayData);
  const total = applications.length;

  const handleApplicationDeleted = (id) => {
    setApplications(applications.filter(application => application._id !== id));
  };

  const handleApplicationUpdated = (id, updatedStatus) => {
    setApplications(applications.map(application =>
      application._id === id ? { ...application, status: updatedStatus } : application
    ));
  };

  const handleRowClick = useCallback((application, event) => {
    event.stopPropagation();
    setSelectedApplication(application);
    setModalOpen(true);
  }, []);

  const handleModalClose = () => {
    setModalOpen(false);
  }



  const sortedApplications = [...applications].sort((a, b) => a[sortField].localeCompare(b[sortField]));

  const filteredApplications = sortedApplications.filter((application) => {
    return displayData.displayRejected || application.status !== 'Rejected';
  });

  const rows = filteredApplications.map((application) => {
    const date = new Date(application.dateApplied);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
      <Table.Tr key={application._id} style={{ cursor: 'pointer' }}
        onClick={(event) => handleRowClick(application, event)}>
        {displayData.jobTitle && <Table.Td>{application.jobTitle}</Table.Td>}
        {displayData.companyName && <Table.Td>{application.companyName}</Table.Td>}
        {displayData.dateApplied && <Table.Td>{formattedDate}</Table.Td>}
        {displayData.applicationLink && <Table.Td><a href={application.applicationLink} target="_blank" rel="noopener noreferrer">Link</a></Table.Td>}
        {displayData.status && <Table.Td>{application.status}</Table.Td>}
        {displayData.jobDescription && <Table.Td>{application.jobDescription}</Table.Td>}
        {displayData.location && <Table.Td>{application.location}</Table.Td>}
        {displayData.notes && <Table.Td>{application.notes}</Table.Td>}
        {displayData.salaryRange && <Table.Td>{application.salaryRange}</Table.Td>}
        {displayData.contactName && <Table.Td>{application.contactName}</Table.Td>}
        {displayData.contactEmail && <Table.Td>{application.contactEmail}</Table.Td>}
        {displayData.jobReferenceID && <Table.Td>{application.jobReferenceID}</Table.Td>}
      </Table.Tr>
    );
  });

  return (
    <div style={{ maxWidth: '800px', margin: '20px ', padding: '0 20px' }}>
      <ApplicationModal opened={modalOpen} onClose={handleModalClose} application={selectedApplication} onApplicationDeleted={handleApplicationDeleted} onApplicationUpdated={handleApplicationUpdated} />
      <div>
        <h1>Applications</h1>
        <h2>Total: {total}</h2>
        <Select
          label="Sort by"
          value={sortField}
          style={{ marginBottom: 20, maxWidth: 150 }}
          onChange={setSortField}
          data={[
            { value: 'jobTitle', label: 'Job Title' },
            { value: 'companyName', label: 'Company Name' },
            { value: 'dateApplied', label: 'Date Applied' },
            { value: 'status', label: 'Status' },
          ]}
          allowDeselect={false}
        />
        <TableScrollContainer h={550} minWidth={800} w={950} >
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'orange', type: 'dots' }}
          />
          <Table stickyHeader highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                {displayData.jobTitle && <Table.Th>Job Title</Table.Th>}
                {displayData.companyName && <Table.Th>Company Name</Table.Th>}
                {displayData.dateApplied && <Table.Th>Date Applied</Table.Th>}
                {displayData.applicationLink && <Table.Th>Application Link</Table.Th>}
                {displayData.status && <Table.Th>Status</Table.Th>}
                {displayData.jobDescription && <Table.Th>Job Description</Table.Th>}
                {displayData.location && <Table.Th>Location</Table.Th>}
                {displayData.notes && <Table.Th>Notes</Table.Th>}
                {displayData.salaryRange && <Table.Th>Salary Range</Table.Th>}
                {displayData.contactName && <Table.Th>Contact Name</Table.Th>}
                {displayData.contactEmail && <Table.Th>Contact Email</Table.Th>}
                {displayData.jobReferenceID && <Table.Th>Job Reference ID</Table.Th>}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </TableScrollContainer>
      </div>
    </div >


  )
}
