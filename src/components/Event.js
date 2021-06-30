import React, { useState } from 'react';
import "antd/dist/antd.css";
import './Event.css';

import { Button, Timeline } from 'antd';

export default function Event() {

  const [target, setTarget] = useState(undefined);

  const mode = 'left';

  const handleClick = (e, link) => {
    setTarget(e.target);
    e.target.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  };

  const currentEvent = (item) => {
    return (
      <a id={`#${item.timestamp}`} href={`#${item.eventID}/${item.date}/${item.time}`}>

        <Timeline
          mode={mode}
          onClick={handleClick}
          color='#4a6bc7'
        >

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
                style={{ color: item.theme, borderColor: item.theme }}
              >
                {item.method}
              </Button>

              <p id={`#${item.endpoint_path}`} className='end-point'>{item.endpoint_path}</p>

            </div>

          </Timeline.Item>

        </Timeline>

      </a>
    );
  };

  return [currentEvent, target];
}