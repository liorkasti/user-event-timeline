import React, { useState } from 'react';
import "antd/dist/antd.css";
import './Event.css';

import { Button, Timeline } from 'antd';

export default function Event() {

  const [target, setTarget] = useState();

  const mode = 'left';

  /*   const onChange = e => {
      e.target.scrollIntoView();
    };
   */

  const handleClick = (e, link) => {
    setTarget(e)
    // console.log("target: " + e.target)
    e.target.scrollIntoView();
  };

  const currentEvent = (item) => {
    return (
      <a href={`#${item.eventID}/${item.date}/${item.time}`}>
        <Timeline mode={mode} onClick={handleClick} color='#4a6bc7'>

          {//show date
            item.dateFlag &&
            <button id={`#${item.date}`} className='date-button' disabled >
              {item.date}
            </button>
          }

          <Timeline.Item label={item.time} color='#4a6bc7'>

            {/* TODO: Missing condition requirement */}
            {/* <Checkbox /> */}

            <div className='event'>
              <Button
                id={`#${item.method}`}
                className='method-button'
                onClick={handleClick}
                style={{
                  backgroundColor: 'white', color: item.theme, borderColor: item.theme,
                  height: 20, fontWeight: 700, fontSize: 12, borderWidth: 2
                }}
              >
                {item.method}
              </Button>

              <p id={`#${item.timestamp}`} className='end-point'>{item.timestamp}</p>

            </div>

          </Timeline.Item>

        </Timeline>

      </a>
    );
  };

  return [currentEvent, target];
}