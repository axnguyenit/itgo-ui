import { useEffect, useState } from 'react';
import { sentenceCase } from 'change-case';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
	Card,
	Table,
	Avatar,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import TableListHead from '../../components/TableListHead';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import courseApi from '../../api/courseApi';
import cloudinary from '../../utils/cloudinary';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'email', label: 'Email', alignRight: false },
	{ id: 'position', label: 'Position', alignRight: false },
	{ id: 'role', label: 'Role', alignRight: false },
	{ id: 'status', label: 'Status', alignRight: false },
	// { id: '' },
];

// ----------------------------------------------------------------------

export default function Students() {
	const [studentList, setStudentList] = useState([]);
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const getAllStudents = async () => {
			try {
				const response = await courseApi.getStudents(id);
				setStudentList(response.data.students);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		getAllStudents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows = page > 0 ? Math.max(0, rowsPerPage - studentList.length) : 0;
	const filteredStudents = applySortFilter(studentList, getComparator(order, orderBy));

	return (
		<Page title="Students">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Students"
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{ name: 'Instructors', href: PATH_DASHBOARD.instructors.root },
						{ name: 'Students' },
					]}
				/>

				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<TableListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{!!filteredStudents.length &&
										filteredStudents.map((user) => {
											const {
												_id,
												firstName,
												lastName,
												email,
												isInstructor,
												avatar,
												position,
												isBanned,
											} = user;

											return (
												<TableRow hover key={_id} tabIndex={-1} role="checkbox">
													<TableCell sx={{ display: 'flex', alignItems: 'center' }}>
														<Avatar alt={firstName} src={cloudinary.w100(avatar)} sx={{ mr: 2 }} />
														<Typography variant="subtitle2" noWrap>
															{firstName} {lastName}
														</Typography>
													</TableCell>
													<TableCell align="left">{email}</TableCell>
													<TableCell align="left">{position ? position : '#'}</TableCell>
													<TableCell align="left">
														{isInstructor ? 'Instructor' : 'Student'}
													</TableCell>
													<TableCell align="left">
														<Label variant={'ghost'} color={isBanned ? 'error' : 'success'}>
															{sentenceCase(isBanned ? 'banned' : 'active')}
														</Label>
													</TableCell>

													{/* <TableCell align="right">
														<UserMoreMenu userId={_id} />
													</TableCell> */}
												</TableRow>
											);
										})}
									{(emptyRows > 0 || !filteredStudents.length) && (
										<TableRow
											style={{ height: 72 * (!filteredStudents.length ? rowsPerPage : emptyRows) }}
										>
											<TableCell colSpan={5} />
										</TableRow>
									)}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={studentList.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={(e, page) => setPage(page)}
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
