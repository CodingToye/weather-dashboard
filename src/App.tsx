import React from 'react';
import SearchLocation from './features/SearchLocation';
import DashboardPanels from './features/DashboardPanels';
import './App.css';

function App() {
    return (
        <div className='App' data-testid='app-test'>
            <SearchLocation location='New York' />
            <DashboardPanels />
        </div>
    );
}

export default App;
