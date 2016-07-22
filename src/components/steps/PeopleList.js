import React, { PropTypes } from 'react';

const PeopleList= (props) => {
  return (
    <div className="margin-top-14">
      <table className="table person-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          { props.people.map(function(person) {
            return (<tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.email}</td>
                <td>{person.age}</td>
                <td>{person.gender}</td>
            </tr>);
          })
          }
        </tbody>
      </table>
    </div>
  );
};

export default PeopleList;

