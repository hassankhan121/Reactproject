import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import InventoryManagementSystem from './InventoryManagementSystem';

ReactDOM.render(
  <Router>
    <InventoryManagementSystem />
  </Router>,
  document.getElementById('root')
);
