import { useEffect } from 'react';
import JobApplicationForm from './Components/Form'
import Lists from './Components/Lists'
import { Tabs, rem } from '@mantine/core';
import { IconForms, IconListDetails, IconSettings } from '@tabler/icons-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApplications } from './store/applications';


function App() {
  const iconStyle = { width: rem(12), height: rem(12) };
  const loading = useSelector(state => state.application.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchApplications());
  }, []);
  console.log('loading', loading);

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
          <Tabs.Tab value='settings' leftSection={<IconSettings style={iconStyle} />} >
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="forms">
          <JobApplicationForm />
        </Tabs.Panel>
        <Tabs.Panel value="applications">
          <Lists />
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <h1>Settings</h1>
        </Tabs.Panel>
      </Tabs >
    </>
  )
}


export default App
