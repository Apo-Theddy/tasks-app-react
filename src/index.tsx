import React from 'react';
import IndexTask from './tasks/index.task';
import ReactDOM from 'react-dom/client';
import "./tasks/style.task.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <IndexTask />
  </React.StrictMode>
);