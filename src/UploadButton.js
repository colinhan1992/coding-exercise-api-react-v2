import React, { Fragment, useRef, useState } from 'react';
import { Button } from 'semantic-ui-react';
import Papa from 'papaparse';
import axios from 'axios';

const UploadButton = ({ loading, setLoading, loadData }) => {
    const peopleInputRef = useRef();

    let responseCount = 0;

    // Parse People CSV
    const parsePeopleCSV = () => {
        const file = document.getElementById('people-csv').files[0];
        Papa.parse(file, { complete: uploadPeopleCSV });
    };

    const uploadPeopleCSV = (results, file) => {
        setLoading(true);
        responseCount = 0;
        console.log('Parsing complete:', results, file);
        const expectedPersonStructure = [
            'id',
            'first_name',
            'last_name',
            'email_address',
            'status',
            'group_id'
        ];
        const expectedGroupStructure = ['id', 'group_name'];
        if (compareArray(expectedPersonStructure, results.data[0])) {
            // The CSV has People data
            const people = results.data.slice(1, results.data.length - 1);
            people.forEach(person => {
                // See if there is an existing person
                axios
                    .get(`http://localhost:8000/api/people/${person[0]}`)
                    .then(response => {
                        // Person exists so we update the person
                        updatePerson(person, people);
                    })
                    .catch(e => {
                        if (e.response.status === 404) {
                            // Person is not found so we create a new person
                            createPerson(person, people);
                        } else {
                            // Error
                        }
                    });
            });
        } else if (compareArray(expectedGroupStructure, results.data[0])) {
            // The CSV has Group data
            const groups = results.data.slice(1, results.data.length - 1);
            groups.forEach(group => {
                // See if there is an existing group
                axios
                    .get(`/api/groups/${group[0]}`)
                    .then(response => {
                        // Person exists so we update the group
                        updateGroup(group, groups);
                    })
                    .catch(e => {
                        if (e.response.status === 404) {
                            // Person is not found so we create a new group
                            createGroup(group, groups);
                        } else {
                            // Error
                        }
                    });
            });
        } else {
            // Invalid CSV
        }
    };

    const createPerson = (person, people) => {
        const personObj = {
            first_name: person[1],
            last_name: person[2],
            email_address: person[3],
            status: person[4],
            group_id: person[5]
        };
        axios
            .post('http://localhost:8000/api/people', personObj)
            .then(response => {
                checkResponseCount(people);
            })
            .catch(e => {
                checkResponseCount(people);
            });
    };

    const checkResponseCount = people => {
        if (responseCount === people.length - 1) {
            setLoading(false);
            responseCount = 0;
            loadData();
            console.log('here');
        } else {
            responseCount++;
            console.log(responseCount);
        }
    };

    const updatePerson = (person, people) => {
        const personObj = {
            first_name: person[1],
            last_name: person[2],
            email_address: person[3],
            status: person[4],
            group_id: person[5]
        };
        axios
            .put(`http://localhost:8000/api/people/${person[0]}`, personObj)
            .then(response => {
                checkResponseCount(people);
            })
            .catch(e => {
                checkResponseCount(people);
            });
    };

    const createGroup = (group, groups) => {};

    const updateGroup = (group, groups) => {};

    const compareArray = (array1, array2) => {
        var equal = array1.length === array2.length;
        // Check if the structure and indexes are the same
        for (let i in array1) {
            if (
                !array2.includes(array1[i]) &&
                array2.findIndex(array1[i]) === i
            )
                equal = false;
        }
        return equal;
    };

    return (
        <div>
            <Fragment>
                <Button
                    primary
                    content="Upload CSV"
                    loading={loading}
                    icon="user"
                    onClick={() => peopleInputRef.current.click()}
                ></Button>
                <input
                    id="people-csv"
                    accept=".csv"
                    ref={peopleInputRef}
                    type="file"
                    hidden
                    onChange={parsePeopleCSV}
                />
            </Fragment>
        </div>
    );
};

export default UploadButton;
