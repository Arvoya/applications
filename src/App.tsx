import React from 'react'
import './App.css'
import JobApplicationForm from './Components/Form'
import Lists from './Components/Lists'
import { Tabs, rem } from '@mantine/core';
import { IconForms, IconListDetails } from '@tabler/icons-react';


function App() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const [updated, setUpdated] = React.useState(false);

  return (
    <>
      <Tabs color="orange" orientation="vertical" defaultValue="forms">
        <Tabs.List>
          <Tabs.Tab value="forms" leftSection={<IconForms style={iconStyle} />}>
            Form
          </Tabs.Tab>
          <Tabs.Tab value="applications" leftSection={<IconListDetails style={iconStyle} />}>
            Applications
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="forms">
          <JobApplicationForm updated={setUpdated} />
        </Tabs.Panel>
        <Tabs.Panel value="applications">
          <Lists updatedValue={updated} updatedFunc={setUpdated} />
        </Tabs.Panel>

      </Tabs>
    </>
  )
}


export default App

