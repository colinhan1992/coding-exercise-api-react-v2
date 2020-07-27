import React, { Fragment, Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ResultsList extends Component {
    static propTypes = {
        groups: PropTypes.array.isRequired,
        people: PropTypes.array.isRequired
    };

    getGroupName(groupID) {
        const group = this.props.groups.find(e => e.id === groupID);
        return group ? group.group_name : 'N/A';
    }

    getGroupMembers(groupID) {
        const members = this.props.people.filter(e => e.group_id === groupID);
        return members.length;
    }

    render() {
        const { groups, people } = this.props;

        const groupsWithMembers = groups.filter(function(group) {
            return people.find(p => p.group_id === group.id) !== undefined;
        });

        return (
            <Fragment>
                <h3>Groups</h3>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell singleLine>
                                First Name
                            </Table.HeaderCell>
                            <Table.HeaderCell>Members</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {groups.map((group, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell singleLine>
                                        {group.group_name}
                                    </Table.Cell>
                                    <Table.Cell singleLine>
                                        {this.getGroupMembers(group.id)}
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                {groupsWithMembers.map((group, index) => {
                    return (
                        <Fragment key={index}>
                            <h3>{group.group_name}</h3>
                            <Table celled padded>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell singleLine>
                                            First Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Last Name
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Email
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Status
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            Group
                                        </Table.HeaderCell>
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
                                                            ? this.getGroupName(
                                                                  person.group_id
                                                              )
                                                            : 'N/A'}
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                </Table.Body>
                            </Table>
                        </Fragment>
                    );
                })}
            </Fragment>
        );
    }
}

export default ResultsList;
