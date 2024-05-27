import { useSelector, useDispatch } from 'react-redux';
import { updateDisplayData } from '../../store/settings';
import { Checkbox } from '@mantine/core';

export default function Settings() {
  const displayData = useSelector(state => state.displayData); const dispatch = useDispatch();

  return (
    <div style={{ maxWidth: '900px', margin: '20px', padding: '0 20px' }}>
      <h1>Settings</h1>
      {Object.keys(displayData).map((key) => (
        <div key={key}>
          <Checkbox
            label={key}
            checked={displayData[key]}
            onChange={() => dispatch(updateDisplayData(key))}
          />
        </div>
      ))}
    </div>
  );
}
