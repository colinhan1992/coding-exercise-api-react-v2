import React, { Fragment, Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import GroupMembers from './GroupMembers';

class ResultsList extends Component {
    static propTypes = {
        groups: PropTypes.array.isRequired,
        people: PropTypes.array.isRequired
    };

    getGroupName = groupID => {
        const group = this.props.groups.find(e => e.id === groupID);
        return group ? group.group_name : 'N/A';
    };

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
                <Table sortable celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Group Name</Table.HeaderCell>
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
                        <GroupMembers
                            key={index}
                            group={group}
                            members={people.filter(
                                p => p.group_id === group.id
                            )}
                            getGroupName={this.getGroupName}
                        />
                    );
                })}
            </Fragment>
        );
    }
}

export default ResultsList;
