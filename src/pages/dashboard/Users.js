import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
	Card,
	Table,
	Avatar,
	Button,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/users';
import userApi from '../../api/userApi';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'email', label: 'Email', alignRight: false },
	{ id: 'position', label: 'Position', alignRight: false },
	{ id: 'role', label: 'Role', alignRight: false },
	{ id: 'isVerified', label: 'Verified', alignRight: false },
	{ id: 'status', label: 'Status', alignRight: false },
	{ id: '' },
];

// ----------------------------------------------------------------------

export default function Users() {
	const [userList, setUserList] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [filterEmail, setFilterEmail] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const getAllUsers = async () => {
		const params = {
			_page: page,
			_limit: rowsPerPage,
		};

		try {
			const response = await userApi.getAll(params);
			setUserList(response.data.users);
			setPagination(response.data.pagination);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, rowsPerPage]);

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(1);
	};

	const handleFilterByName = (filterEmail) => {
		setFilterEmail(filterEmail);
	};

	const emptyRows = page > 0 ? Math.max(0, rowsPerPage - userList.length) : 0;
	const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterEmail);
	const isNotFound = !filteredUsers.length && !!filterEmail;

	return (
		<Page title="Users">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Users"
					links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Users' }]}
					action={
						<Button
							variant="contained"
							component={RouterLink}
							to={PATH_DASHBOARD.users.newUser}
							startIcon={<Iconify icon={'eva:plus-fill'} />}
						>
							New User
						</Button>
					}
				/>

				<Card>
					<UserListToolbar filterEmail={filterEmail} onFilterEmail={handleFilterByName} />

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<UserListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={userList.length}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{!!filteredUsers.length &&
										filteredUsers.map((user) => {
											const {
												_id,
												firstName,
												lastName,
												email,
												isInstructor,
												emailVerified,
												avatar,
												position,
												isBanned,
											} = user;

											return (
												<TableRow hover key={_id} tabIndex={-1} role="checkbox">
													<TableCell sx={{ display: 'flex', alignItems: 'center' }}>
														<Avatar alt={firstName} src={avatar} sx={{ mr: 2 }} />
														<Typography variant="subtitle2" noWrap>
															{firstName} {lastName}
														</Typography>
													</TableCell>
													<TableCell align="left">{email}</TableCell>
													<TableCell align="left">{position ? position : '#'}</TableCell>
													<TableCell align="left">
														{isInstructor ? 'Instructor' : 'Student'}
													</TableCell>
													<TableCell align="left">{emailVerified ? 'Yes' : 'No'}</TableCell>
													<TableCell align="left">
														<Label variant={'ghost'} color={isBanned ? 'error' : 'success'}>
															{sentenceCase(isBanned ? 'banned' : 'active')}
														</Label>
													</TableCell>

													<TableCell align="right">
														<UserMoreMenu userId={_id} />
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 72 * emptyRows }}>
											<TableCell colSpan={7} />
										</TableRow>
									)}
								</TableBody>
								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={7} sx={{ py: 3 }}>
												<SearchNotFound searchQuery={filterEmail} />
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={pagination._totalRows}
						rowsPerPage={rowsPerPage}
						page={page - 1}
						onPageChange={(event, value) => setPage(value + 1)}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>
		</Page>
	);
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query)
		return array.filter((_user) => _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1);

	return stabilizedThis.map((el) => el[0]);
}
