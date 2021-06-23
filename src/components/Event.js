import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
import './Event.css';

import { Anchor, Checkbox, Button, Timeline, Radio } from 'antd';

const { Link } = Anchor;

export default () => {

  const [mode, setMode] = useState('left');

  useEffect(() => {
    // console.log(JSON.stringify(item))
    // console.log('event: ', item + 'index: ' + index)
  }, [])

  const onChange = e => {
    setMode(e.target.value);
  };

  const handleClick = (e, link) => {
    e.target.scrollIntoView();
  };

  const currentEvent = (item, index) => {
    return (
      <div className='Events'>
        <Radio.Group
          onChange={onChange}
          value={mode}
        >
        </Radio.Group>
        <Timeline mode={mode}
          onClick={handleClick}
        >

          {//show date
            item.dateFlag &&
            <button
              label={item.date}
              className='date'
            >{item.date}</button>

          }

          <Timeline.Item label={item.time}>
            <Anchor
              showInkInFixed={true}
              onClick={handleClick}
              id={`#${item.timestamp}`}
              className='anchor'
            >
              {/* {item.eventID} */}
              {/* <Checkbox style={{ marginRight: 10 }}></Checkbox> //TODO: Missing condition requirement */}
              <div className='event'>

                <Button className='method-button' onClick={handleClick}> {/* TODO: Switch ui button method condition */}
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
      </div>
    );
  };

  return [currentEvent];
}
