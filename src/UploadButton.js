import React, { Fragment, useRef } from 'react';
import { Button } from 'semantic-ui-react';
import Papa from 'papaparse';
import axios from 'axios';

const UploadButton = ({
    people,
    groups,
    setPeople,
    setGroups,
    loading,
    setLoading
}) => {
    const peopleInputRef = useRef();

    // Parse People CSV
    const parsePeopleCSV = () => {
        const file = document.getElementById('people-csv').files[0];
        Papa.parse(file, { complete: uploadPeopleCSV });
    };

    const uploadPeopleCSV = (results, file) => {
        setLoading(true);
        console.log('Parsing complete:', results, file);
        const expectedPersonStructure = [
            'id',
            'first_name',
            'last_name',
            'email',
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
                    .get(`/api/people/${person[0]}`)
                    .then(response => {
                        // Person exists so we update the person
                        updatePerson(person);
                    })
                    .catch(e => {
                        if (e.status === 404) {
                            // Person is not found so we create a new person
                            createPerson(person);
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
                        updatePerson(group);
                    })
                    .catch(e => {
                        if (e.status === 404) {
                            // Person is not found so we create a new group
                            createPerson(group);
                        } else {
                            // Error
                        }
                    });
            });
        } else {
            // Invalid CSV
        }
    };

    const createPerson = personArray => {};

    const updatePerson = personArray => {};

    const createGroup = personArray => {};

    const updateGroup = personArray => {};

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
