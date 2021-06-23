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

                    const methodTheme = getMethodTheme(event.method);

                    events.push({
                        id: event.id, timestamp: event.timestamp,
                        method: event.method, endpoint_path: event.endpoint_path,
                        user_id: event.user_id, eventID: `event${i}`,
                        date: moment(event.timestamp).format("DD-MM-YYYY"),
                        time: moment(event.timestamp).format("hh:mm:ss:SSS"),
                        dateFlag: false, theme: methodTheme
                    })
                    let date = moment().format("DD-MM-YYYY");
                    events.forEach((event, i) => {
                        if (moment(event.timestamp).format("DD-MM-YYYY") !== date) {
                            date = moment(event.timestamp).format("DD-MM-YYYY");
                            events[i].dateFlag = true;
                        }
                    });
                })

                setLoaded(true)
                setEvents(events);
            }).catch(function () {
                console.log("JSON loading attempt has failed!");
            });

    }

    function getMethodTheme(method) {
        switch (method) {
            case 'GET':
                return '#50aedb';
            case 'AUTH':
                return '#736bc2';
            case 'POST':
                return '#70c895';
            case 'PUT':
                return '#f4b463';
            default:
                return '#50aedb';
        };
    }

    return [loaded, events, getData];
}