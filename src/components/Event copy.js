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
            marginBottom: 20,
            // type= 'dashed'
          }}
        >
        </Radio.Group>
        <Timeline
          mode={mode}
        >
          <Timeline.Item label={item.timestamp.slice(11, 24)}>
            {item.eventID}

            <Anchor
              showInkInFixed={true}
              onClick={handleClick}
              affix={true}
              mode={mode}
              id={`#${item.timestamp}`}
            // style={{
            //   marginTop: -26, marginLeft: 100,
            //   height: 100, width: window.innerWidth,
            //   fontWeight: 500, color: '#5b5f75'
            // }}
            >
              {/* <Checkbox style={{ marginRight: 10 }}></Checkbox> //TODO: Missing condition requirement */}
              <Link
                title={`${item.endpoint_path}`}
                href={`#${item.timestamp}`}
                id={`#${item.timestamp}`}
                style={{ marginRight: 10 }}
              />

              <Button style={{ marginRight: 10 }}> {/* TODO: Switch ui button method condition */}
                {item.method}
              </Button>
            </Anchor>

          </Timeline.Item>
          {
      /*               
      {
        showDate(item.timestamp[i], item.timestamp[i - 1]) &&
        <Timeline.Item
          label={(item.timestamp[i].slice(0, 11))}>
          DATE
        </Timeline.Item>
      } 
    */}

        </Timeline>
      </>
    );
  };

  return [currentEvent];
}
