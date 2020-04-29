import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders(props) {
  const classes = useStyles();
  let {title, list} = props;
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
        {list
          ?
          <TableRow>
            <TableCell className="red-color">Project Name</TableCell>
            <TableCell className="red-color">Project Creator</TableCell>
          </TableRow>
          : ''
        }
        </TableHead>
        <TableBody>
         {list
            ? list.map((item, idx) => (
              <TableRow key={idx}>
                  <TableCell>{item.basicInput.projectName}</TableCell>
                  <TableCell>{item.creator.username}</TableCell>
                </TableRow>
              ))
            : <TableRow>
                <TableCell>No Data</TableCell>
              </TableRow>
         }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}