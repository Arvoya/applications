import { useSelector, useDispatch } from 'react-redux';
import { updateDisplayData } from '../../store/settings';
import { Table, TableScrollContainer } from '@mantine/core';
import { Checkbox } from '@mantine/core';

export default function Settings() {
  const displayData = useSelector(state => state.displayData);
  const dispatch = useDispatch();

  const mockData = {
    jobTitle: 'Example Job',
    companyName: 'Tech Corp',
    dateApplied: '01/01/2022',
    applicationLink: 'http://example.com',
    status: 'Pending',
    jobDescription: 'Develop and maintain software',
    location: 'Remote',
    notes: 'First round interview scheduled',
    salaryRange: '$80,000 - $100,000',
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    jobReferenceID: '12345'
  };

  return (
    <div style={{ maxWidth: '900px', margin: '20px', padding: '0 20px' }}>
      <h1>Settings</h1>
      <h3>Display Data</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {Object.keys(displayData).map((key) => (
          <div key={key}>
            <Checkbox
              radius="xl"
              color="cyan"
              label={key}
              checked={displayData[key]}
              onChange={() => dispatch(updateDisplayData(key))}
            />
          </div>
        ))}
      </div>
      <h3>Example Table</h3>
      <TableScrollContainer h={550} minWidth={800} w={950} style={{ marginTop: '20px' }} >
        <Table>
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
          <Table.Tbody>
            <Table.Tr>
              {displayData.jobTitle && <Table.Td>{mockData.jobTitle}</Table.Td>}
              {displayData.companyName && <Table.Td>{mockData.companyName}</Table.Td>}
              {displayData.dateApplied && <Table.Td>{mockData.dateApplied}</Table.Td>}
              {displayData.applicationLink && <Table.Td><a href={mockData.applicationLink} target="_blank" rel="noopener noreferrer">Link</a></Table.Td>}
              {displayData.status && <Table.Td>{mockData.status}</Table.Td>}
              {displayData.jobDescription && <Table.Td>{mockData.jobDescription}</Table.Td>}
              {displayData.location && <Table.Td>{mockData.location}</Table.Td>}
              {displayData.notes && <Table.Td>{mockData.notes}</Table.Td>}
              {displayData.salaryRange && <Table.Td>{mockData.salaryRange}</Table.Td>}
              {displayData.contactName && <Table.Td>{mockData.contactName}</Table.Td>}
              {displayData.contactEmail && <Table.Td>{mockData.contactEmail}</Table.Td>}
              {displayData.jobReferenceID && <Table.Td>{mockData.jobReferenceID}</Table.Td>}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </TableScrollContainer>
    </div>
  );
}
