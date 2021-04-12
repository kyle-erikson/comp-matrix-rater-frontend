import React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useParams,
  RouteComponentProps,
} from "react-router-dom";

type UserData = {
  getUsers: User[];
};

type User = {
  id: Number;
  name: String;
  email: String;
  manager_id: Number;
};

type UserComponentProps = {
  name: String;
  email: String;
  id: Number;
};

const GET_USERS = gql`
  query getUsers($managerId: Int) {
    getUsers(managerId: $managerId) {
      id
      name
      email
      manager_id
    }
  }
`;

const Users = () => {
  const { loading, error, data } = useQuery<UserData>(GET_USERS, {
    variables: { managerId: 1 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>`Error! ${error}`</p>;

  return (
    <div>
      {data && data.getUsers.map((user: User) => <UserComponent {...user} />)}
    </div>
  );
};

const UserComponent = ({ name, email, id }: UserComponentProps) => {
  return (
    <Link to={`/users/${id}`}>
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </Link>
  );
};

export default Users;
