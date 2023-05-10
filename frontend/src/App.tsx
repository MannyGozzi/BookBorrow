import React from 'react';
import Nav from './components/Nav';

import './App.css';

function App() {
  return (
    <>
      <section className='page-content-wrapper'>
        <Nav />
      </section>
      <section className='page-content-wrapper'>
        <div className='page-content'>
          <h1>Welcome to Boobo</h1>
        </div>
      </section>
    </>
  );
}

export default App;
