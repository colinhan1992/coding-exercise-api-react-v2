import React, { Fragment, Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import GroupMembers from './GroupMembers';

class ResultsList extends Component {
    static propTypes = {
        groups: PropTypes.array,
        people: PropTypes.array
    };

    state = {
        column: null,
        data: this.props.groups.map(group => {
            return {
                id: group.id,
                group_name: group.group_name,
                members: this.getGroupMembers(group.id)
            };
        }),
        direction: null
    };

    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending'
            });

            return;
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending'
        });
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
        const { data, column, direction } = this.state;

        const groupsWithMembers = groups.filter(function(group) {
            return people.find(p => p.group_id === group.id) !== undefined;
        });

        return (
            <Fragment>
                <h3>Groups</h3>
                <Table sortable celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={
                                    column === 'group_name' ? direction : null
                                }
                                onClick={this.handleSort('group_name')}
                            >
                                Group Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'members' ? direction : null}
                                onClick={this.handleSort('members')}
                            >
                                Members
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((group, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell singleLine>
                                        {group.group_name}
                                    </Table.Cell>
                                    <Table.Cell singleLine>
                                        {group.members}
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
                        />
                    );
                })}
            </Fragment>
        );
    }
}

export default ResultsList;
