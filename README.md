# Coding Exercise

Hello, I'm Colin Han!

Below is a my completed coding exercise that I believe adequately shows off my development skills.

## The Exercise _(Modified)_

This is a simplified version of a piece of functionality we have in Breeze ChMS. Many of the churches we work with import their data from an existing system or a homegrown spreadsheet into Breeze. We provide tools for bulk importing of people, contribution, group and attendance records.
In this problem we're only going to consider two data types: People and Groups. A Person can be part of one Group.

For the People data type, each person can have a state of either 'active' or ‘archived’. The `id` for each data type is globally unique. As a result, if the id does not exist, create a new record, otherwise, update the existing record.

_Note: A foreign key `group_id` has been added to the `people` table_

People columns:
`id, first_name, last_name, email_address, status, group_id`

Group columns:
`id, group_name`

Here’s an example:

```
id, first_name, last_name, email_address, status, group_id
1, "Alex", "Ortiz-Rosado", "alex@breezechms.com", active, 1
2, "Jon", "VerLee", "jon@breezechms.com", "archived", 2
3, "Fred", "Flintstone", "fredflintstone@example.com", "active", 1
4, "Marie", "Bourne", "mbourne@example.com", "active", 2
5, "Wilma", "Flintstone", "wilmaflinstone@example.com", "active", 1
```

```
id, group_name
1, "Volunteers"
2, "Elders"
3, "Bible Study"
```

### Instructions for deployment

**Prerequisites**

-   Git, Composer, Laravel
-   Node >= 8, Yarn
-   Command Line PHP 7
-   MySql 5.x installed locally, accessible via 127.0.0.1

*   Clone the repository
    -   `https://github.com/colinhan1992/coding-exercise-api-react-v2.git && cd coding-exercise-api-react-v2`
*   Setup Laravel
    -   `cp .env.example .env`
    -   Edit .env with your mysql connection information
    -   Install dependencies `composer install`
    -   `php artisan key:generate && php artisan migrate`
*   Setup React
    -   Install dependencies `yarn`
*   Start the Laravel API in one Terminal Window: `php artisan serve`
*   Start the React/Node.js server in another Terminal Window: `yarn start`

### Importing Data

The project files include two mock CSV files which can be used to test the application.

-   `MOCK_DATA_GROUPS`
-   `MOCK_DATA_PEOPLE`

### Instructions for testing

-   Laravel Testing w/PHPUnit
    -   Run the API tests using the Laravel test runner `php artisan test`
-   React Testing w/Enzyme and Jest
    -   Run the React unit tests `yarn test`

Caveat: I will say that I don't have much experiece with testing using Jest/Enzyme so those tests are rather limited

### Exercise Changes

A new API endpoint has been added for `/groups` which supports all CRUD operations

The ReactJS app has been updated to allow a user to upload a CSV file and import the data.

-   The application validates the CSV's structure based on the first line of headers and if it matches a the expected structure of a group or people CSV it imports the data
-   The Application first checks if a user or group exists of the given id and if so, updates that user. Otherwise it creates a new record using the API endpoints

The ReactJS app's UI has been updated to display a list(sortable) of groups and for each group that has active members, a table(sortable) of those members.

## Finally

Overall, this took me longer than I anticipated. Especially the parts with REACT since I'm currently in the process of getting to know it better. But, I viewed it as a valuable learning experience and really tried to give it my best.

Earlier, I had a really inspiring conversation with Janet about BreezeCMS and I think that my skills and attitude would be a great fit.

I look forward to hearing back!

```

```
