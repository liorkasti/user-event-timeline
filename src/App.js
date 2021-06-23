import React, { useState, useEffect } from 'react';
import { Anchor, Switch } from 'antd';

import './App.css';
import useFetch from './services/useFetch';
import Event from './components/Event';
import { UserID } from './utils/constants';

const { Link } = Anchor;

function App() {

  const [loaded, events, getData] = useFetch([]);
  const [data, setData] = useState([]);
  const [currentEvent] = Event();

  useEffect(() => {
    getData();
    if (loaded) {
      setData(events)
    };
  }, [])

  const showEvent = (event, index) => {
    return (currentEvent(event, index));
  };

  const onClick = () => {
    // Alert / Toggle something    
    getData();
  };

  return (
    < div className="App">
      <p className='h1' title='User Events Log'>
        {UserID}
      </p>

      <div className='row-query'>
        <div className='timeline' title='Timeline'>Timeline</div>
        <button className='query-button' title='Go to Query'>Go to Query</button>
      </div>

      <hr />
      <div className='alert-row'>
        {/* TODO: Add a filter function with some logic here (Missing condition requirement) */}
        <Switch size="small" onClick={onClick} />
        <p className='alert-text'>Alert only</p>
      </div>

      {
        loaded && events.map((item, i) =>
          <>
            {showEvent(item, i)}
          </>
        )
      }
    </div >
  )
}

export default App;