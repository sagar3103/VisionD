import React from 'react';
import UploadImage from './components/UploadImage';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Object Detection App</h1>
      <UploadImage />
    </div>
  );
};

export default App;
