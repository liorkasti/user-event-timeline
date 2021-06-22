import React, { useState, useEffect, createRef } from 'react';
import { Anchor, Checkbox, Button, Affix, Switch, Timeline, Radio, Row, Col } from 'antd';
import * as moment from 'moment';
import 'moment/locale/pt-br';

import './App.css';
import Event from './components/Event';
import { COLORS, UserID } from './utils/constants';

const { Link } = Anchor;

function App() {

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [mode, setMode] = useState('right');
  const [currentEvent] = Event();

  // const [targetOffset, setTargetOffset] = useState(undefined);
  // const [onSelect, setOnSelect] = useState('#event0');
  // const [currentAnchor, setCurrentAnchor] = useState('');

  const getData = () => {
    const events = [];

    fetch('data/data-set.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let time = moment(data[0].timestamp).format("hh:mm:ss:SSS");
        let date = moment(data[0].timestamp).format("DD-MM-YYYY");


        data.forEach((event, i) => {
          // for (let i = 0; i < data.length; i++) { 
          //TODO: sort the data accordingly  
          events.push({ //TODO: filter date with timestamp hierarchy
              id: event.id, timestamp: event.timestamp,
              method: event.method, endpoint_path: event.endpoint_path,
              user_id: event.user_id, eventID: `event${i}`,
              date: moment(event.timestamp).format("DD-MM-YYYY"),
              time: moment(event.timestamp).format("hh:mm:ss:SSS"),
              dateFlag: false, timeFlag: false
            })
            //TODO: second loop that turn on the date and time flag accordingly
            if (moment(event.timestamp).format("DD-MM-YYYY") !== date) {
              date = moment(event.timestamp).format("DD-MM-YYYY");
              console.log('date: ' + date);
              // events[i].push({ date: date })
            }
            if (moment(event.timestamp).format("hh:mm:ss") !== moment(time).format("hh:mm:ss")) {
              time = moment(event.timestamp).format("hh:mm:ss:SSS");
              console.log('time: ' + time);
              // events[i].push({ time: time })
            }
          // if(myJson[i].method)// TODO: pare timestamp to a moment.time and to moment.time,
          // if(myJson[i].method)// TODO: to filter moment.date and to moment.time,

          // console.log(event);
        })
        setLoaded(true)
        setData(events)
      }).catch(function () {
        console.log("JSON loading attempt has failed!");
      });

  }
  useEffect(() => {
    getData();
    console.log('events: ', data)
  }, [])

  const onChange = link => {
    // slice and setTime
    // slice and setDate
    // Set method color
    // console.log('Anchor:OnChange: ', link);
    // setCurrentAnchor(link)
  };

  const handleClick = (e, link) => {
    e.target.scrollIntoView();
  };

  const getCurrentAnchor = () => '#components-anchor-demo-static'; // TODO: Design row on focus

  const showEvent = (event, index) => {
    // { setDate(timestamp) }
    console.log(event + 'index: ' + index)
    return (
      currentEvent(event, index)
      // < Event
      //   event={event}
      //   index={index}
      // />
    );
  };

  const onClick = () => {
    // Alert / Toggle something    
    getData();
  };

  return (
    // TODO: Move out all styles to css file 
    < div className = "App" style = {{
    width: window.innerWidth * .7, height: window.innerHeight,
      padding: 30, justifyContent: 'center', alignItems: 'center'
  }
}>
      <header className='User Events Log {UserID}' title='User Events Log'>
        <div style={{ width: window.innerWidth * .8, justifyContent: 'center', alignItems: 'center', fontSize: 22, color: '#4a6bc7', fontWeight: '500', paddingBottom: 30 }}>
          {UserID}
        </div>
      </header>
      <div style={{
        fontWeight: 'bold', fontSize: 20, color: '#5b5f75', paddingBottom: 20,
        marginRight: window.innerWidth * .8 - 100
      }}>Timeline</div>
      <hr style={{ width: window.innerWidth * .8, borderWidth: .5, color: '#5b5f75' }} />
{/* TODO: Missing condition requirement */ }
<span style={{ marginLeft: window.innerWidth * .7 - 50, }} >
  <Switch size="small"
    onClick={onClick}
  />
</span>
{/* TODO: Add a filter function with some logic here */ }
<p style={{ width: 60, marginLeft: window.innerWidth * .7, marginTop: -20, }}>
  Alert only
</p>

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