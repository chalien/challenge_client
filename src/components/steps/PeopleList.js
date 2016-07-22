import React, { PropTypes } from 'react';

const PeopleList= (props) => {
  var removePerson = function(event) {
    var id = event.target.dataset.id;
    props.removePerson(id)
  };

  return (
    <div className="overflow table-container">
      <table className="table ">
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
                <td> <a href="javascript: void(0)" data-id={person.id}  onClick = { removePerson } >Delete</a></td>
            </tr>);
          })
          }
        </tbody>
      </table>
    </div>
  );
};

export default PeopleList;

