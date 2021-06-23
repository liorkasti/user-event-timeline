import React, { useState, useEffect } from 'react';
import { Anchor, Switch } from 'antd';
import * as moment from 'moment';

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
      console.log('data: ', data)
    };
  }, [])

  const onChange = link => {
    // console.log('Anchor:OnChange: ', link);
    // setCurrentAnchor(link)
  };

  const handleClick = (e, link) => {
    e.target.scrollIntoView();
  };

  const getCurrentAnchor = () => '#components-anchor-demo-static'; // TODO: Design row on focus

  const showEvent = (event, index) => {
    return (currentEvent(event, index));
  };

  const onClick = () => {
    // Alert / Toggle something    
    getData();
  };

  return (
    // TODO: Move out all styles to css file 
    < div className="App">
      <p className='h1' title='User Events Log'>
        {UserID}
      </p>

      <div className='row-query'>
        <div className='timeline' title='Timeline'>Timeline</div>
        <button className='query-button' title='Go to Query'>Go to Query</button>
      </div>

      <hr />
      <div className='row-alert'>
        {/* TODO: Missing condition requirement */}
        <Switch size="small" onClick={onClick} />
        {/* TODO: Add a filter function with some logic here */}
        <p className='text-alert'>Alert only</p>
      </div>

      {
        loaded && data && data.map((item, i) =>
          <>
            {showEvent(item, i)}
          </>
        )
      }
    </div >
  )
}

export default App;