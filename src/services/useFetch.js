import { useState } from 'react';
import * as moment from 'moment';

import jsonServer from './api/jsonServer';

export default function useReducer(state, action) {
    const [loaded, setLoaded] = useState(false);
    const [events, setEvents] = useState([]);

    function getEvents() {
        return async () => {
            const response = await jsonServer.get('data-set');

            await response.data.forEach((event, i) => {
                //TODO: sort the data accordingly  

                const methodTheme = getMethodTheme(event.method);

                events.push({
                    id: event.id, timestamp: event.timestamp,
                    method: event.method, endpoint_path: event.endpoint_path,
                    user_id: event.user_id, eventID: `event${i}`,
                    date: moment(event.timestamp).format("DD-MM-YYYY"),
                    time: moment(event.timestamp).format("hh:mm:ss:SSS"),
                    dateFlag: false, theme: methodTheme, userID: event.user_id
                })
                let date = moment().format("DD-MM-YYYY");
                events.forEach((event, i) => {
                    if (moment(event.timestamp).format("DD-MM-YYYY") !== date) {
                        date = moment(event.timestamp).format("DD-MM-YYYY");
                        events[i].dateFlag = true;
                    }
                });
            })
            console.log("response: " + response);
            setLoaded(true)
            setEvents(events);
        };
    }

    /*     async function init() {
            const res = await fetch('../data/data-set.json'
                , {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
            );
    
            const data = await res.json();
    
            await data.forEach((event, i) => {
                //TODO: sort the data accordingly  
    
                const methodTheme = getMethodTheme(event.method);
    
                events.push({
                    id: event.id, timestamp: event.timestamp,
                    method: event.method, endpoint_path: event.endpoint_path,
                    user_id: event.user_id, eventID: `event${i}`,
                    date: moment(event.timestamp).format("DD-MM-YYYY"),
                    time: moment(event.timestamp).format("hh:mm:ss:SSS"),
                    dateFlag: false, theme: methodTheme, userID: event.user_id
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
            // console.log("init: " + JSON.stringify(events));
        }
     */

    function getData() {
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
                        dateFlag: false, theme: methodTheme, userID: event.user_id
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
    //TODO: use init function instead of getData and wrap it with Provider
    return [loaded, events, getData, getEvents, /* init */];
}