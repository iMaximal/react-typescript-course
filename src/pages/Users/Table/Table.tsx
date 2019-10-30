import * as React from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
} from '@material-ui/core'

import { IUserModel } from '@src/interfaces'
import * as style from './style.styl'
import Loading from '@components/Loading'
import NoResults from '@components/NoResults'

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort<T>(array: Omit<IUserModel[], 'password'>, cmp: (a: T, b: T) => number) {
  if (!Array.isArray(array)) return

  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

type Order = 'asc' | 'desc'

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K,
): (a: { [key in K]: number | string }, b: { [key in K]: number | string }) => number {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

interface HeadRow {
  disablePadding: boolean
  id: keyof IUserModel
  label: string
  numeric: boolean
}

const headRows: HeadRow[] = [
  { id: 'username', numeric: false, disablePadding: false, label: 'username' },
  { id: 'email', numeric: false, disablePadding: false, label: 'email' },
  { id: 'role', numeric: false, disablePadding: false, label: 'role' },
  { id: 'status', numeric: true, disablePadding: false, label: 'status' },
  { id: 'userId', numeric: false, disablePadding: false, label: 'userId' },
  { id: 'createdAt', numeric: true, disablePadding: false, label: 'createdAt' },
  { id: 'updatedAt', numeric: true, disablePadding: false, label: 'updatedAt' },
]

const EnhancedTableHead = (props) => {
  const { t } = useTranslation()
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof IUserModel) => (event: React.MouseEvent<HTMLSpanElement>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headRows.map((row) => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id)}>
              {t(`labels.${row.label}`)}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
      tableLayout: 'auto',
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
)

interface EnhancedTableProps {
  classes?: ReturnType<typeof useStyles>
  onRequestSort?: (event: React.MouseEvent<HTMLTableHeaderCellElement>, property: keyof IUserModel) => void
  order?: Order
  orderBy?: string
  rowCount?: number
  loading: boolean
  users: Omit<IUserModel[], 'password'>
  onHandleRowClick: (userId: string) => void
}

const EnhancedTable: React.FC<EnhancedTableProps> = (props) => {
  const classes = useStyles('')
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof IUserModel>('username')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const { users, loading } = props
  const { t } = useTranslation()

  const handleRequestSort = (event: React.MouseEvent<HTMLTableHeaderCellElement>, property: keyof IUserModel) => {
    const isDesc = orderBy === property && order === 'desc'
    setOrder(isDesc ? 'asc' : 'desc')
    setOrderBy(property)
  }

  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    props.onHandleRowClick(event.currentTarget.dataset.userId)
  }

  const handleRowEnter = (event: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (event.key === 'Enter') {
      props.onHandleRowClick(event.currentTarget.dataset.userId)
    }
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

  const renderTableBody = () => {
    if (loading) {
      return (
        <TableRow>
          <TableCell colSpan={7}>
            <Loading />
          </TableCell>
        </TableRow>
      )
    }

    if (users.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={7}>
            <NoResults id="usersNoResult" className={style.noResult} />
          </TableCell>
        </TableRow>
      )
    }

    return (
      <>
        {stableSort(users, getSorting(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => {
            return (
              <TableRow
                hover
                onClick={handleRowClick}
                onKeyUp={handleRowEnter}
                key={row.username}
                data-user-id={row.userId}
                tabIndex={0}
                role="button"
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell>{row.userId}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
                <TableCell align="right">{row.updatedAt}</TableCell>
              </TableRow>
            )
          })}
        {emptyRows > 0 && (
          <TableRow style={{ height: 49 * emptyRows }}>
            <TableCell colSpan={7} />
          </TableRow>
        )}
      </>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table className={clsx(classes.table, style.container)} aria-label="tableTitle" size="medium">
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody role="contentinfo">{renderTableBody()}</TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={t('labels.rowsPerPage')}
        />
      </Paper>
    </div>
  )
}

export default EnhancedTable
