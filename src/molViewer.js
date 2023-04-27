import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
}

const MolViewer = () => {
  return (
    <Card>
      <iframe
        title="NGL Viewer"
        src="http://nglviewer.org/ngl/"
        style={{ marginTop: 30, width: '100%', height: '600px', border: 'none' }}
      />
    </Card>
  );
}

export default MolViewer;