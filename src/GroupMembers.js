import React, { Component, Fragment } from 'react';
import { Table } from 'semantic-ui-react';
import _ from 'lodash';

export class GroupMembers extends Component {
    state = {
        column: null,
        data: this.props.members,
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

    render() {
        const { group, getGroupName, members } = this.props;
        const { column, data, direction } = this.state;
        return (
            <Fragment>
                <h3>{group.group_name}</h3>
                <Table sortable celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                singleLine
                                sorted={
                                    column === 'first_name' ? direction : null
                                }
                                onClick={this.handleSort('first_name')}
                            >
                                First Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={
                                    column === 'last_name' ? direction : null
                                }
                                onClick={this.handleSort('last_name')}
                            >
                                Last Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={
                                    column === 'email_address'
                                        ? direction
                                        : null
                                }
                                onClick={this.handleSort('email_address')}
                            >
                                Email
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'status' ? direction : null}
                                onClick={this.handleSort('status')}
                            >
                                Status
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((person, index) => {
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
