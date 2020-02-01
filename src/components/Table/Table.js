import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import Dialog from 'components/Dialog';
import Ask from 'components/YesOrNot';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="primera página"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="página anterior">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="página siguiente"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="última página"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, editable } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState(tableData.slice(page, rowsPerPage));
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    console.log(newPage, rowsPerPage);
    console.log(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage);
    setRows(tableData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
  };

  const handleChangeRowsPerPage = event => {
    let value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
    setRows(tableData.slice(0, value));
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop.name}
                  </TableCell>
                );
              })}
              {editable &&
                <TableCell className={classes.tableCell} />}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {rows.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {tableHead.map((head, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop[head.id]}
                    </TableCell>
                  );
                })}
                {editable &&
                  <TableCell className={classes.tableCell}>
                    <IconButton
                      aria-label="delete"
                      className={classes.margin}
                      onClick={() => setOpenDialog(true)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <Dialog
                      open={openDialog}
                      onClose={() => setOpenDialog(false)}
                      ChildComponent={Ask}
                      
                    />
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      className={classes.margin}
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <Dialog
                      open={openDeleteDialog}
                      onClose={() => setOpenDeleteDialog(false)}
                      title={`Eliminar ${prop[tableHead[0].id]}`}
                      ChildComponent={Ask}
                      childProps={{
                        onYesClick: ()=> setOpenDeleteDialog(false),
                        onNoClick: ()=> setOpenDeleteDialog(false)
                      }}
                    />
                  </TableCell>}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'filas por página' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.array,
  tableData: PropTypes.array,
  editable: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onAddRow: PropTypes.func
};

CustomTable.defaultProps = {
  editable: false
}
