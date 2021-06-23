import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

export default () => {
    const data = useState([]);
    const [json, setJson] = useState([]);
    const [events, setEvents] = useState([]);

    async function fetchData() {

        const response = await fetch('data/data-set.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }
        )
        setJson(response)
        console.log('json: ' + json)

    }


    async function getData() {
        await fetchData();
        const data = await json.json();
        console.log('data: ' + data)
        const result = [];

        await data.forEach((item, i) => {
            // for (let i = 0; i < data.length; i++) { 
            //TODO: sort the data accordingly  
            result.push({ //TODO: filter date with timestamp hierarchy
                id: item.id, timestamp: item.timestamp,
                method: item.method, endpoint_path: item.endpoint_path,
                user_id: item.user_id, eventID: `event${i}`,
                date: moment(item.timestamp).format("DD-MM-YYYY"),
                time: moment(item.timestamp).format("hh:mm:ss:SSS"),
                dateFlag: false, timeFlag: false
            })

            setEvents(dataSet(result));
            // TODO: to filter moment.date and to moment.time
            //if(myJson[i].method)

            console.log('events: ' + events)
            return events;
        })

        async function dataSet(result) {

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let time = moment(result[0].timestamp).format("hh:mm:ss");
                    let date = moment(result[0].timestamp).format("DD-MM-YYYY");

                    result.forEach((item, i) => {
                        // TODO: Set method color
                        //TODO: second loop that turn on the date and time flag accordingly
                        if (moment(item.timestamp).format("DD-MM-YYYY") !== date) {
                            date = moment(item.timestamp).format("DD-MM-YYYY");
                            result[i].dateFlag = true;
                            console.log(result[i].dateFlag);
                            console.log('date: ' + date);
                        }
                        if (moment(item.time).format("hh:mm") !== time) {
                            time = moment(item.time).format("hh:mm");
                            result[i].timeFlag = true;
                            console.log(result[i].timeFlag);
                            console.log('time: ' + time);
                        }
                        console.log('event.time: ' + item.time);
                    });

                    return result;

                }).catch(function () {
                    console.log("JSON loading attempt has failed!");
                });

                const error = false;

                if (!error) {
                    resolve();
                } else {
                    reject('JSON loading attempt has failed!');
                }
            }, 500);
        };

        async function init() {
            await createEvent(event);

            getData();
        }

        function createEvent(event) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    data.push(event);

                    const error = false;

                    if (!error) {
                        resolve();
                    } else {
                        reject('JSON loading attempt has failed!');
                    }
                }, 500);
            });
        }

        // createEvent(event).then(getData).catch(error => console.log(error))
    }

    return [getData];
}