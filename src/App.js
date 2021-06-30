import React, { useEffect } from 'react';
import { Switch } from 'antd';

import './App.css';
import useFetch from './services/useFetch';
import Event from './components/Event';
import { UserID } from './utils/constants';

function App() {

  const [loaded, events, getData, /* init */] = useFetch();
  const [currentEvent, target] = Event();

  useEffect(() => {
    getData();
  })

  // TODO: set scrolling position beck to target when re-render
  useEffect(() => {
    const hashtag = window.location.hash
    if (hashtag) {
      const currentURL = window.location.href
      const newURL = currentURL.split("#")[0]
      console.log("currentURL: ", currentURL)
      window.history.replaceState("", "Lunch", newURL)
    }
  }, [target])

  const onClick = () => {
    // Alert / Toggle something    
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
        loaded && events.map((item) =>
          <>
            <div className='vertical-line' />
            <div className='container'>
              {currentEvent(item)}
            </div>
          </>
        )
      }
    </div >
  )
}

export default App;