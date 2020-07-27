import React, { Component, Fragment } from 'react';
import { Table } from 'semantic-ui-react';

export class GroupMembers extends Component {
    render() {
        const { group, people, getGroupName } = this.props;
        return (
            <Fragment>
                <h3>{group.group_name}</h3>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>
                                First Name
                            </Table.HeaderCell>
                            <Table.HeaderCell>Last Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Group</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {people
                            .filter(p => p.group_id === group.id)
                            .map((person, index) => {
                                return (
                                    <Table.Row key={index}>
                                        <Table.Cell singleLine>
                                            {person.first_name}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {person.last_name}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {person.email_address}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {person.status}
                                        </Table.Cell>
                                        <Table.Cell singleLine>
                                            {person.group_id != null
                                                ? getGroupName(person.group_id)
                                                : 'N/A'}
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                    </Table.Body>
                </Table>
            </Fragment>
        );
    }
}

export default GroupMembers;
