import { useState } from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Avatar,
} from "@material-ui/core";
import { gql, useQuery, useMutation } from "@apollo/client";

type User = {
  id: Number;
  first_name: String;
  last_name: String;
  email: String;
  manager_id: Number;
};

const UserAvatar = ({ id, first_name, last_name }: User) => {
  const firstLetter = first_name[0].toUpperCase();
  const lastLetter = last_name[0].toUpperCase();

  const CREATE_REPORT = gql`
    mutation createReport($userId: Int) {
      createReport(userId: $userId)
    }
  `;

  const [createReport] = useMutation(CREATE_REPORT, {
    onCompleted: ({ createReport: id }) => {
      window.location.assign(`/reports/${id}`);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleCreateReport = () => {
    createReport({
      variables: {
        userId: id,
      },
    });
  };

  return (
    <div onClick={handleCreateReport}>
      <Avatar>
        {firstLetter}
        {lastLetter}
      </Avatar>
    </div>
  );
};

const Users = () => {
  type UserData = {
    getUsers: User[];
  };

  const GET_USERS = gql`
    query getUsers($managerId: Int) {
      getUsers(managerId: $managerId) {
        id
        first_name
        last_name
        email
        manager_id
      }
    }
  `;

  const { loading, error, data } = useQuery<UserData>(GET_USERS, {
    variables: { managerId: 1 },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <p>`Error! ${error}`</p>;

  return (
    <div>
      {data && data.getUsers.map((user: User) => <UserAvatar {...user} />)}
    </div>
  );
};

const GenerateNewReportDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Generate New Report</Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Generate New Report</DialogTitle>
        <DialogContent>
          <DialogContentText>Generate New Report For:</DialogContentText>
          <Users />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <Typography variant="h4">
        Hello! Welcome to the Competency Matrix Rater.
      </Typography>
      <GenerateNewReportDialog />
    </div>
  );
};

export default HomePage;
