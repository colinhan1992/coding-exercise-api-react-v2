import React, { Fragment, useRef } from 'react';
import { Button } from 'semantic-ui-react';
import Papa from 'papaparse';
import axios from 'axios';

/**
 * The upload is implemented so that the application first checks if each group or user exists in the database
 * If so, the it hits the API's "update" endpoint otherwise it hits the "create" endpoint
 *
 * This makes it so that even if a few of the csv rows are invalid for some reason the whole thing doesn't fail.
 *  (If we wanted the whole thing to rollback on any failure this would need to be done on the API using a transaction)

 * The downside of this is that the app makes two requests for each row of data in the CSV file so it takes quite a bit of network traffic to do for big files. 
 * An alternative would be to POST all the parsed CSV data to a new API route and have the API handle all of the "create"/"update" logic
 *
 */

const UploadButton = ({ loading, setLoading, loadData, showAlert }) => {
    const peopleInputRef = useRef();

    let responseCount = 0;
    let errors = [];

    // Parse People CSV
    const parseCSV = () => {
        const file = document.getElementById('people-csv').files[0];
        Papa.parse(file, { complete: uploadCSV });
    };

    const uploadCSV = (results, file) => {
        document.getElementById('people-csv').value = null;
        setLoading(true);
        responseCount = 0;
        errors = [];
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
                            errors.push(person);
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
                            errors.push(group);
                        }
                    });
            });
        } else {
            // Invalid CSV
            setLoading(false);
            showAlert('The CSV file has an invalid structure.');
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
                errors.push(person);
            });
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

    const createGroup = (group, groups) => {
        const groupObj = {
            group_name: group[1]
        };
        axios
            .post('http://localhost:8000/api/groups', groupObj)
            .then(response => {
                checkResponseCount(groups);
            })
            .catch(e => {
                checkResponseCount(groups);
            });
    };

    const updateGroup = (group, groups) => {
        const groupObj = {
            group_name: group[1]
        };
        axios
            .put(`http://localhost:8000/api/groups/${group[0]}`, groupObj)
            .then(response => {
                checkResponseCount(groups);
            })
            .catch(e => {
                checkResponseCount(groups);
            });
    };

    const checkResponseCount = people => {
        if (responseCount === people.length - 1) {
            setLoading(false);
            responseCount = 0;
            if (errors.length > 0) {
                showAlert('One or more of the CSV rows could not be added');
                console.log(errors); // with more time we could display errors to the user so they can see which people/groups failed to be stored
            }
            errors = [];
            loadData();
        } else {
            responseCount++;
        }
    };

    const compareArray = (array1, array2) => {
        var equal = array1.length === array2.length;
        // Check if the structure and indexes are the same
        for (let i in array1) {
            if (
                !array2.includes(array1[i]) ||
                array2.findIndex(e => e === array1[i]) != i
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
                    onChange={parseCSV}
                />
            </Fragment>
        </div>
    );
};

export default UploadButton;
