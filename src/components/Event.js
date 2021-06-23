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
      <>
        <Radio.Group
          onChange={onChange}
          value={mode}
          className='Events'
        >
        </Radio.Group>
        <Timeline mode={mode}
          onClick={handleClick}
          className='Events'
        >

          {//show date
            item.dateFlag &&
            <Timeline.Item
              label={item.date}
              className='date'
            />

          }
          {//show date
            item.timeFlag ?
              <Timeline.Item label={item.time} className='timeline-item'>
                <Anchor
                  showInkInFixed={true}
                  onClick={handleClick}
                  id={`#${item.timestamp}`}
                  className='anchor'
                >
                  {/* {item.eventID} */}
                  {/* <Checkbox style={{ marginRight: 10 }}></Checkbox> //TODO: Missing condition requirement */}
                  <Link
                    title={`${item.endpoint_path}`}
                    href={`#${item.timestamp}`}
                  />

                  <Button style={{ marginRight: 10 }}> {/* TODO: Switch ui button method condition */}
                    {item.method}
                  </Button>

                </Anchor>

              </Timeline.Item>
              :
              <Timeline.Item label={' '}>

                <Anchor
                  showInkInFixed={true}
                  onClick={handleClick}
                  id={`#${item.timestamp}`}
                >
                  {/* {item.eventID} */}
                  {/* <Checkbox style={{ marginRight: 10 }}></Checkbox> //TODO: Missing condition requirement */}
                  <Link
                    title={`${item.endpoint_path}`}
                    href={`#${item.timestamp}`}
                    style={{ marginRight: 10 }}
                  />

                  <Button style={{ marginRight: 10 }}> {/* TODO: Switch ui button method condition */}
                    {item.method}
                  </Button>

                </Anchor>

              </Timeline.Item>
          }
        </Timeline>
      </>
    );
  };

  return [currentEvent];
}
