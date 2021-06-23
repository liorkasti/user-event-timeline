import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";
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
          style={{
            marginBottom: 20, color: '#5b5f75',
            // type= 'dashed'
          }}
        >
        </Radio.Group>
        <Timeline mode={mode}
          onClick={handleClick}
          style={{
            color: '#5b5f75',
            // type= 'dashed'
          }}>

          {//show date
            item.dateFlag &&
            <Timeline.Item
              label={item.date}
              style={{
                fontWeight: 700, padding: 2, justifyContent: 'center', alignItems: 'center',
                height: 40, width: 120, backgroundColor: '#f1f1f1'
              }}
            />

          }
          {//show date
            item.dateFlag ?
              <Timeline.Item label={item.time}>
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
