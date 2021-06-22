import React, { useState, useEffect } from 'react';

import './App.css';
import { Anchor, Checkbox, Button } from 'antd';
import { Row, Col } from 'antd';
import AnchorRow from './components/Event';
import { COLORS, UserID } from './utils/constants';

const { Link } = Anchor;

function App() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [targetOffset, setTargetOffset] = useState(undefined);
  const [isTarget, setIsTarget] = useState(false);
  const [currentAnchor, setCurrentAnchor] = useState(undefined);
  const [date, setDate] = useState("");

  const dummy =
    [{ id: "7390e294-cd17-4b25-b132-6e3d4c61911c", timestamp: "2021-01-14 14:51:15.540", method: "GET", endpoint_path: "/v1/events" }
      , { id: "2aad03f8-ce99-4000-8cb1-71d99429cb6a", timestamp: "2021-01-13 23:44:21.509", method: "GET", endpoint_path: "/v1/events" }
      , { id: "9868953a-7acc-41dd-8ab6-3b0813812d66", timestamp: "2021-01-13 22:22:54.046", method: "GET", endpoint_path: "/v1/events" }
      , { id: "85009409-e57e-454f-a10e-5e93769831e1", timestamp: "2021-01-13 22:22:24.649", method: "GET", endpoint_path: "/v1/user/profile" }
      , { id: "bf674053-019b-4ad4-94e2-ae80bf5fc876", timestamp: "2021-01-13 22:22:24.523", method: "POST", endpoint_path: "/v1/user/picture" }
      , { id: "2fc43bff-8137-410e-8dd7-2296cf435a57", timestamp: "2021-01-13 22:21:42.064", method: "GET", endpoint_path: "/v1/user/profile" }
      , { id: "397da298-b2ea-40bd-bd79-f4b67b8a3e35", timestamp: "2021-01-13 22:21:41.935", method: "DELETE", endpoint_path: "/v1/user/picture" }
      , { id: "1544976e-1535-41fd-b2d9-9459080701e8", timestamp: "2021-01-13 22:21:09.714", method: "GET", endpoint_path: "/v1/user/profile" }
      , { id: "e02e3011-3189-4405-8841-f0b75245c24c", timestamp: "2021-01-13 22:21:09.641", method: "POST", endpoint_path: "/v1/user/picture" }
      , { id: "5f2fd2ca-a339-420a-9263-a72c85cb4fce", timestamp: "2021-01-13 22:20:54.653", method: "GET", endpoint_path: "/v1/user/profile" }
      , { id: "22e197ca-8473-4d0b-bff3-978449e9aed2", timestamp: "2021-01-13 22:20:54.582", method: "DELETE", endpoint_path: "/v1/user/picture" }
      , { id: "b25c18f7-0ce7-45fa-bae7-e3de1ce74970", timestamp: "2021-01-13 22:20:45.830", method: "GET", endpoint_path: "/v1/events" }]


  const getData = async () => {
    await fetch('data/data-set.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function (response) {
        // console.log('response: ', response)
        return response.json();
      })
      .then(function (myJson) {
        for (let i = 0; i < myJson.length; i++) {
          data.push({
            id: myJson[i].id, timestamp: myJson[i].timestamp,
            method: myJson[i].method, endpoint_path: myJson[i].endpoint_path,
            user_id: myJson[i].user_id, eventID: `event${i}`
          })
          // console.log('`event${i}`: ', `event${i}`)
        }
        setLoaded(true);
        console.log('database: ', data)
      });
  }
  useEffect(() => {
    getData();
    setTargetOffset(window.innerHeight / 2);
    console.log('getCurrentAnchor: ', getCurrentAnchor)
  }, [])

  const onChange = (link) => {
    console.log('Anchor:OnChange', link);
    setCurrentAnchor('#'+{link})
  };

  const getCurrentAnchor = (event) => {
    console.log('event: ', event)
    // setCurrentAnchor('#'+{event})
  };

  return (
    <div className="App" style={{
      display: 'block', padding: 30,
      height: '100%', width: '100%',
      justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{ fontSize: 22, color: '#4a6bc7', fontWeight: '500', paddingBottom: 30 }}>{UserID}</div>
      <div style={{ fontSize: 20, color: '#5b5f75', fontWeight: 'bold', textAlign: 'left', paddingBottom: 10 }}>Timeline</div>
      <hr style={{ color: '#5b5f75', border: 2 }} />
      {
        loaded &&
        data.map((item, i) =>
          <div key={item.id} style={{ display: 'block', color: '#5b5f75', width: 500, fontWeight: '500', }}>
            <Row >
              <Col style={{ marginBottom: -25, }}>{/* DOTO: fix align row better */}
                <div>{item.timestamp.substring(11, 24)}</div>{/* DOTO: group and break down date format */}
              </Col>
              {/* {
                item.timestamp.substring(0, 11) !== date
                && setDate(item.timestamp.substring(0, 11))
                && <div>{item.timestamp.substring(0, 11)}</div>
              } */}
              <Col style={{ marginRight: 10 }}>
                <Anchor
                  affix={true}
                  targetOffset={targetOffset}
                  // getCurrentAnchor={(eventID) => {getCurrentAnchor(item.eventID); console.log(eventID)}}
                  bounds={10}
                  // showInkInFixed={true}
                  // offsetTop={10}
                  // getContainer={onPress}
                  // onChange={(currentActiveLink) => item.eventID}
                  // onClick={() => function(e: event, link: "#")}
                  // type={dashed} // TODO:
                  style={{ height: '100%', width: '100%', marginLeft: 50, }}
                >
                  <Checkbox style={{ marginRight: 10 }}></Checkbox>
                  <Button style={{ height: 30, marginRight: 10, marginBottom: 10, }}>
                  <Link id="{item.eventID}" href='#{item.eventID}' title={item.method} />
                  </Button>
                  <Button style={{ border: 0, height: 20, marginRight: 10 }}>
                  <Link id="{item.eventID}" href='#{item.eventID}' title={item.endpoint_path} />
                  </Button>
                </Anchor>
              </Col>
            </Row>
          </div>
        )
      }
    </div >
  );
}

export default App;