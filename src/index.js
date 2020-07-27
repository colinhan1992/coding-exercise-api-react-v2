import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Container, Header, Message } from 'semantic-ui-react';

import ResultsList from './components/ResultsList';
import UploadButton from './components/UploadButton';

const App = () => {
    const [people, setPeople] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // Load People and Groups on Startup
    useEffect(() => {
        setGroups([]);
        setPeople([]);
        loadData();
    }, []);

    const loadData = () => {
        fetch('http://localhost:8000/api/people')
            .then(response => response.json())
            .then(data => setPeople(data.data ? data.data : []));

        fetch('http://localhost:8000/api/groups')
            .then(response => response.json())
            .then(data => setGroups(data.data ? data.data : []));
    };

    const showAlert = msg => {
        setAlert(msg);
        setTimeout(() => {
            setAlert(null);
        }, 8000);
    };

    return (
        <Container style={{ margin: 20 }}>
            <Header as="h3">
                <span role="img" aria-label="logo">
                    ⛵️
                </span>{' '}
                Breeze Church Management{' '}
            </Header>
            <Message warning hidden={alert === null}>
                <p>{alert}</p>
            </Message>
            <UploadButton
                loading={loading}
                setLoading={setLoading}
                loadData={loadData}
                showAlert={showAlert}
            />
            <ResultsList key={groups.length} people={people} groups={groups} />
        </Container>
    );
};

const styleLink = document.createElement('link');
styleLink.rel = 'stylesheet';
styleLink.href =
    'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css';
document.head.appendChild(styleLink);

ReactDOM.render(<App></App>, document.getElementById('root'));
