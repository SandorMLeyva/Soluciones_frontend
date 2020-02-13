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

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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
  const { tableHead, tableData, tableHeaderColor, editable, editForm, add, onAddRow, onEditRow, onDeleteRow, addForm } = props;
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [update, setUpdate] = React.useState({});
  const [rows, setRows] = React.useState([]);

  React.useEffect(
    () => {
      setRows(tableData.slice(page, rowsPerPage))
    },
    [tableData],
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setRows(tableData.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage));
  };
  const handleChangeRowsPerPage = event => {
    let value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
    setRows(tableData.slice(0, value));
  };
  const handleOpenDialog = (object) => {
    setOpenDialog(true);
    setUpdate(object);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDeleteDialog = (object) => {
    setOpenDeleteDialog(true);
    setUpdate(object);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleYesClick = () => {
    onDeleteRow({
      variables: {
        id: update.id
      }
    });
    setOpenDeleteDialog(false);

  }
  const handleNoClick = () => {
    setOpenDeleteDialog(false);
  }
  const handleUpdateSave = (object) => {
    setOpenDialog(false);
    onEditRow(object);
  }
  const handleCancel = () => {
    setOpenDialog(false);
  }

  const handleAddSave = () => {
    setOpenAddDialog(false);
  }

  const handleAddClose = () => {
    setOpenAddDialog(false);
  }

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  }


  return (
    <div className={classes.tableResponsive}>
      {add && <div style={{ position: 'absolute', right: ' 8vw', top: ' -15px', zIndex: '5' }}>
        <Fab color="primary" aria-label="add" onClick={handleOpenAddDialog}>
          <AddIcon />
        </Fab>
      </div>}
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
          {rows.map((prop) => (
            <TableRow key={prop.id} className={classes.tableBodyRow}>
              {tableHead.map((head, key) => (
                <TableCell className={classes.tableCell} key={key}>
                  {prop[head.id]}
                </TableCell>
              ))}
              {editable &&
                <TableCell className={classes.tableCell}>
                  <IconButton
                    aria-label="edit"
                    className={classes.margin}
                    onClick={() => handleOpenDialog(prop)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    className={classes.margin}
                    onClick={() => handleOpenDeleteDialog(prop)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>}
            </TableRow>
          ))}
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
      <Dialog
        fullscreen={true}
        open={openAddDialog}
        onClose={handleCloseDialog}
        ChildComponent={addForm}
        handleClose={handleAddClose}
        childProps={{
          onFinish: handleAddSave,
        }}
      />
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        ChildComponent={editForm}
        childProps={{
          onSave: handleUpdateSave,
          onCancel: handleCancel,
          update: update
        }}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        title={`Eliminar ${update}`}
        ChildComponent={Ask}
        childProps={{
          onYesClick: handleYesClick,
          onNoClick: handleNoClick
        }}
      />
    </div>
  );
}



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
  onAddRow: PropTypes.func,
  add: PropTypes.bool,
  addForm: PropTypes.any
};

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  editable: false,
  add: true,
  onAddRow: () => console.log("onAddRow not implemented"),
  onEditRow: () => console.log("onEditRow not implemented"),
  onDeleteRow: () => console.log("onDeleteRow not implemented"),

}
