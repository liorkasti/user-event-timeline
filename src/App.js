import React, { useState, useEffect } from 'react';
import { Anchor, Switch } from 'antd';
import * as moment from 'moment';

import './App.css';
import useFetch from './services/useFetch';
import Event from './components/Event';
import { UserID } from './utils/constants';

const { Link } = Anchor;

function App() {

  const [getData] = useFetch([]);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentEvent] = Event();

  // const getData = () => {
  //   const events = [];

  //   fetch('data/data-set.json'
  //     , {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //       }
  //     }
  //   )
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       data.forEach((event, i) => {
  //         // for (let i = 0; i < data.length; i++) { 
  //         //TODO: sort the data accordingly  
  //         events.push({ //TODO: filter date with timestamp hierarchy
  //           id: event.id, timestamp: event.timestamp,
  //           method: event.method, endpoint_path: event.endpoint_path,
  //           user_id: event.user_id, eventID: `event${i}`,
  //           date: moment(event.timestamp).format("DD-MM-YYYY"),
  //           time: moment(event.timestamp).format("hh:mm:ss:SSS"),
  //           dateFlag: false, timeFlag: false
  //         })
  //         // TODO: to filter moment.date and to moment.time
  //         //if(myJson[i].method)
  //       })

  //       let time = moment(data[0].timestamp).format("hh:mm:ss");
  //       let date = moment(data[0].timestamp).format("DD-MM-YYYY");
  //       events.forEach((event, i) => {
  //         // TODO: Set method color
  //         //TODO: second loop that turn on the date and time flag accordingly
  //         if (moment(event.timestamp).format("DD-MM-YYYY") !== date) {
  //           date = moment(event.timestamp).format("DD-MM-YYYY");
  //           events[i].dateFlag = true;
  //           console.log(events[i].dateFlag);
  //           console.log('date: ' + date);
  //         }
  //         if (moment(event.time).format("hh:mm") !== time) {
  //           time = moment(event.time).format("hh:mm");
  //           events[i].timeFlag = true;
  //           console.log(events[i].timeFlag);
  //           console.log('time: ' + time);
  //         }
  //         console.log('event.time: ' + event.time);
  //       });

  //       setLoaded(true)
  //       setData(events)

  //     }).catch(function () {
  //       console.log("JSON loading attempt has failed!");
  //     });

  // }

  const dataSet = () => {
    setData(getData());
    console.log('database: ', data)
  }

  useEffect(() => {
    dataSet()
    // setData(getData());
    // getData()
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
    // { setDate(timestamp) }
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
        loaded && data.map((item, i) =>
          <>
            {showEvent(item, i)}
          </>
        )
      }
    </div >
  )
}

export default App;