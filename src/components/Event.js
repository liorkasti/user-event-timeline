import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import './Event.css';

import { Anchor, Checkbox, Button, Timeline, Radio } from 'antd';

const { Link } = Anchor;

export default () => {

  const [mode, setMode] = useState('left');

  const onChange = e => {
    setMode(e.target.value);
  };

  const handleClick = (e, link) => {
    e.target.scrollIntoView();
  };

  const currentEvent = (item, index) => {
    return (
      <>
        <Timeline mode={mode} onClick={handleClick}        >

          {//show date
            item.dateFlag &&
            <button
              className='date'
              disabled
              style={{ marginBottom: 16 }}
            >{item.date}</button>
          }

          <Timeline.Item label={item.time}
          >
            <Anchor
              showInkInFixed={true}
              onClick={handleClick}
              id={`#${item.timestamp}`}
              className='anchor-row'
            >
              {/* TODO: Missing condition requirement */}
              {/* <Checkbox /> */}

              <div className='event'>
                <Button
                  className='method-button'
                  onClick={handleClick}
                  style={{
                    color: item.theme, backgroundColor: 'white', height: 20, 
                    fontWeight: 700, fontSize: 12, borderWidth: 2, borderColor: item.theme
                  }}
                >
                  {item.method}
                </Button>

                <Link
                  onClick={handleClick}
                  title={`${item.endpoint_path}`}
                  href={`#${item.timestamp}`}
                />
              </div>
            </Anchor>

          </Timeline.Item>

        </Timeline>
      </>
    );
  };

  return [currentEvent];
}
