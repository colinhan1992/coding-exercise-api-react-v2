import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Header } from 'semantic-ui-react';

import ResultsList from './ResultsList';
import UploadButton from './UploadButton';

const App = () => {
    const [people, setPeople] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load People and Groups on Startup
    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        fetch('http://localhost:8000/api/people')
            .then(response => response.json())
            .then(data => setPeople(data.data));

        fetch('http://localhost:8000/api/groups')
            .then(response => response.json())
            .then(data => setGroups(data.data));
    };

    return (
        <Container style={{ margin: 20 }}>
            <Header as="h3">
                <span role="img" aria-label="logo">
                    ⛵️
                </span>{' '}
                Breeze Church Management{' '}
            </Header>
            <UploadButton
                loading={loading}
                setLoading={setLoading}
                loadData={loadData}
            />
            <ResultsList people={people} groups={groups} />
        </Container>
    );
};

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
    'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

ReactDOM.render(<App></App>, document.getElementById('root'));
