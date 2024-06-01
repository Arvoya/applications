import { useEffect } from 'react';
import { useState, useCallback } from 'react';
import { Grid, LoadingOverlay } from '@mantine/core';
import { Table, TableScrollContainer, Select, Input, TextInput } from '@mantine/core';
import ApplicationModal from '../Modal';
import { useSelector } from 'react-redux';
import Fuse from 'fuse.js';

export default function Lists() {
  const [sortField, setSortField] = useState('jobTitle');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const applications = useSelector(state => state.application.applications);
  const loading = useSelector(state => state.application.isLoading);
  const displayData = useSelector(state => state.displayData);
  const total = applications.length;
  const rejected = applications.filter(application => application.status === 'Rejected').length;
  const gettingCold = applications.filter(application => application.status === 'Getting Cold').length;
  const frozen = applications.filter(application => application.status === 'Frozen').length;

  useEffect(() => {

  }, [applications]);

  const fuse = new Fuse(applications, {
    threshold: 0.4,
    keys: ['jobTitle', 'companyName', 'status', 'jobDescription', 'location', 'notes', 'salaryRange', 'contactName', 'contactEmail', 'jobReferenceID'],
    includeScore: true,
  });


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


  let rows;

  if (searchTerm.trim() !== '') {
    let results = fuse.search(searchTerm);
    if (!displayData.displayRejected) {
      results = results.filter(({ item: application }) => application.status !== 'Rejected');
    }
    rows = results.map(({ item: application }) => createRow(application));
  } else {
    rows = filteredApplications.map((application) => createRow(application));
  }

  function createRow(application) {
    const date = new Date(application.dateApplied);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

    return (
      <Table.Tr key={application._id} style={{ cursor: 'pointer' }}
        onClick={(event) => handleRowClick(application, event)}>
        {displayData.jobTitle && <Table.Td>{application.jobTitle}</Table.Td>}
        {displayData.companyName && <Table.Td>{application.companyName}</Table.Td>}
        {displayData.dateApplied && <Table.Td>{formattedDate}</Table.Td>}
        {displayData.applicationLink && <Table.Td>
          {application.applicationLink !== ''
            ? <a href={application.applicationLink} target="_blank" rel="noopener noreferrer">Link</a>
            : <span>No Link Provided</span>
          }
        </Table.Td>}
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
  }


  return (
    <div style={{ maxWidth: '800px', margin: '20px ', padding: '0 20px' }}>
      <ApplicationModal opened={modalOpen} onClose={handleModalClose} application={selectedApplication} />
      <div>
        <h1>Applications</h1>
        <Grid>
          <Grid.Col span={3}>
            <h3>Total: {total}</h3>
          </Grid.Col>
          <Grid.Col span={3}>
            <h3>Getting Cold: {gettingCold}</h3>
          </Grid.Col>
          {displayData.displayFrozen &&
            <Grid.Col span={3}>
              <h3>Frozen: {frozen}</h3>
            </Grid.Col>
          }
          {displayData.displayRejected && <Grid.Col span={3}>
            <h3>Rejected: {rejected}</h3>
          </Grid.Col>}
        </Grid>
        <Grid>

          <Grid.Col span={3}>
            <Select
              label="Sort by"
              value={sortField}
              onChange={setSortField}
              data={[
                { value: 'jobTitle', label: 'Job Title' },
                { value: 'companyName', label: 'Company Name' },
                { value: 'dateApplied', label: 'Date Applied' },
                { value: 'status', label: 'Status' },
              ]}
              allowDeselect={false}
            />
          </Grid.Col>
          <Grid.Col span={5}>
            <Input.Wrapper label="Search" >
              <TextInput
                placeholder="Google"
                onChange={() => { setSearchTerm(event.target.value) }}
              />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>
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
