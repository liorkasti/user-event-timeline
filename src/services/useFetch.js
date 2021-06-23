import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

export default () => {
    const [loaded, setLoaded] = useState(false);
    const [events, setEvents] = useState([]);

    const getData = () => {
        const events = [];

        fetch('../data/data-set.json'
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
                data.forEach((event, i) => {
                    //TODO: sort the data accordingly  
                    events.push({ //TODO: filter date with timestamp hierarchy
                        id: event.id, timestamp: event.timestamp,
                        method: event.method, endpoint_path: event.endpoint_path,
                        user_id: event.user_id, eventID: `event${i}`,
                        date: moment(event.timestamp).format("DD-MM-YYYY"),
                        time: moment(event.timestamp).format("hh:mm:ss:SSS"),
                        dateFlag: false, timeFlag: false
                    })
                    // TODO: to filter moment.date and to moment.time
                    //if(myJson[i].method)
                    let time = moment(events[0].timestamp).format("hh:mm:ss");
                    let date = moment(events[0].timestamp).format("DD-MM-YYYY");
                    events.forEach((event, i) => {
                        // TODO: Set method color
                        //TODO: second loop that turn on the date and time flag accordingly
                        if (moment(event.timestamp).format("DD-MM-YYYY") !== date) {
                            date = moment(event.timestamp).format("DD-MM-YYYY");
                            events[i].dateFlag = true;
                            // console.log(events[i].dateFlag);
                            // console.log('date: ' + date);
                        }
                        if (moment(event.time).format("hh:mm") !== time) {
                            time = moment(event.time).format("hh:mm");
                            events[i].timeFlag = true;
                            // console.log(events[i].timeFlag);
                            // console.log('time: ' + time);
                        }
                        // console.log('event.time: ' + event.time);
                    });
                })

                setLoaded(true)
                setEvents(events);
            }).catch(function () {
                console.log("JSON loading attempt has failed!");
            });

    }

    return [loaded, events, getData];
}