import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Table, TableScrollContainer, Select } from '@mantine/core';
import ApplicationModal from './Modal/index.tsx';

export default function Lists(props) {
  const [applications, setApplications] = useState([]);
  const [sortField, setSortField] = useState('jobTitle');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/applications');
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  }


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

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (props.updatedValue) {
      fetchApplications();
      props.updatedFunc(false);
    }
  }, [props]);

  const sortedApplications = [...applications].sort((a, b) => a[sortField].localeCompare(b[sortField]));

  const rows = sortedApplications.map((application) => {
    const date = new Date(application.dateApplied);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
      <Table.Tr key={application._id} style={{ cursor: 'pointer' }}
        onClick={(event) => handleRowClick(application, event)}>
        <Table.Td>{application.jobTitle}</Table.Td>
        <Table.Td>{application.companyName}</Table.Td>
        <Table.Td>{formattedDate}</Table.Td>
        <Table.Td><a href={application.applicationLink} target="_blank" rel="noopener noreferrer">Link</a></Table.Td>
        <Table.Td>{application.status}</Table.Td>
        <Table.Td>{application.location}</Table.Td>
        <Table.Td>{application.salaryRange}</Table.Td>
        <Table.Td>{application.jobReferenceID}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div style={{ maxWidth: '800px', margin: '20px ', padding: '0 20px' }}>
      <ApplicationModal opened={modalOpen} onClose={handleModalClose} application={selectedApplication} onApplicationDeleted={handleApplicationDeleted} onApplicationUpdated={handleApplicationUpdated} />
      <div>
        <h1>Applications</h1>
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
        />
        <TableScrollContainer h={550} minWidth={800} w={950} >
          <Table stickyHeader highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Job Title</Table.Th>
                <Table.Th>Company Name</Table.Th>
                <Table.Th>Date Applied</Table.Th>
                <Table.Th>Application Link</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Location</Table.Th>
                <Table.Th>Salary Range</Table.Th>
                <Table.Th>Job Reference ID</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </TableScrollContainer>
      </div>
    </div>


  )
}
