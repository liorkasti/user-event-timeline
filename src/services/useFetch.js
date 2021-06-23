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
                })

                setLoaded(true)
                setEvents(events);
            }).catch(function () {
                console.log("JSON loading attempt has failed!");
            });

    }

    return [loaded, events, getData];
}