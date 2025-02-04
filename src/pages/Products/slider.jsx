import * as React from 'react';
import Slider from '@mui/material/Slider';
import PropTypes from 'prop-types';

function ValueLabelComponent(props) {
  const { children, value } = props;

  // Custom styling for label
  const labelStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{ position: 'relative' }}>
      {children}
      {/* This wrapper will place the dollar value label next to each handle */}
      <div style={{ position: 'absolute', top: '-35px', left: '50%', transform: 'translateX(-50%)' }}>
        <div style={labelStyles}>{`$${value}`}</div>
      </div>
    </div>
  );
}

// Handler for price range change
const handlePriceChange = (event, newValue) => {
  const minDistance = 8;
  if (newValue[1] - newValue[0] < minDistance) {
    return;
  }
  
};

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

export default function RangeSlider({
  value = [0, 100],
  onChange,
  min = 0,
  max = 1000,
}) {
  return (
    <Slider
      aria-label="Price range"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      components={{
        ValueLabel: ValueLabelComponent, // Use our custom ValueLabel
      }}
      disableSwap
    />
  );
}
