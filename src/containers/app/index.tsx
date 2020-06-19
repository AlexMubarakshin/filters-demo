import React from 'react';

import './styles.scss';

import FilterScene from '../../components/filter-scene';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="app_decoration__header">
        <path
          fill="#086972"
          fillOpacity="0.3"
          d="M0,128L48,122.7C96,117,192,107,288,112C384,117,480,139,576,128C672,117,768,75,864,53.3C960,32,1056,32,1152,58.7C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <div className="app-body">
        <FilterScene />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="app_decoration__footer">
        <path
          fill="#086972"
          fillOpacity="0.3"
          d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,186.7C672,213,768,203,864,218.7C960,235,1056,277,1152,266.7C1248,256,1344,192,1392,160L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default App;
