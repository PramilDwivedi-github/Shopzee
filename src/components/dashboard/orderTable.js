import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "order_id", label: "OrderId" },
  //   { id: "code", label: "ISO\u00a0Code" },
  {
    id: "status",
    label: "Status",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "Order Date",

    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  //   {
  //     id: "density",
  //     label: "Density",
  //     align: "right",
  //     format: (value) => value.toFixed(2),
  //   },
];

function createData(order_id, status, date) {
  //   const density = population / size;
  return { order_id, status, date };
}

const rows = [
  createData(1, "pending", "12-05-2022"),
  createData(2, "complete", "12-05-2022"),
  createData(3, "complete", "12-05-2022"),
  createData(4, "pending", "12-05-2022"),
  createData(5, "pending", "12-05-2022"),
  createData(6, "pending", "12-05-2022"),
  createData(7, "pending", "12-05-2022"),
  createData(8, "pending", "12-05-2022"),
  createData(9, "pending", "12-05-2022"),
  createData(10, "complete", "12-05-2022"),
  createData(11, "complete", "12-05-2022"),
  createData(12, "pending", "12-05-2022"),
  createData(13, "pending", "12-05-2022"),
  createData(14, "pending", "12-05-2022"),
  createData(15, "pending", "12-05-2022"),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ background: "green", color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, ind) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            color:
                              ind == 1
                                ? value == "pending"
                                  ? "red"
                                  : "green"
                                : "black",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
