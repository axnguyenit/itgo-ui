import { useState, useEffect } from 'react';
// @mui
import {
	Box,
	Card,
	Table,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
	Button,
} from '@mui/material';
// routes
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { fCurrency } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
	CourseMoreMenu,
	CourseListHead,
	CourseListToolbar,
} from '../../sections/@dashboard/courses/course-list';
// api
import courseApi from '../../api/courseApi';
import Iconify from '../../components/Iconify';
import cloudinary from '../../utils/cloudinary';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Course', alignRight: false },
	{ id: 'instructor', label: 'Instructor', alignRight: false },
	{ id: 'createdAt', label: 'Create at', alignRight: false },
	{ id: 'price', label: 'Price', alignRight: true },
	{ id: '' },
];

// ----------------------------------------------------------------------

export default function Courses() {
	const [courses, setCourses] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});
	const [order, setOrder] = useState('asc');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [orderBy, setOrderBy] = useState('createdAt');
	const navigate = useNavigate();

	const getAllCourses = async () => {
		const params = {
			_page: page,
			_limit: rowsPerPage,
		};
		try {
			const response = await courseApi.getAll(params);
			setCourses(response.data.courses);
			setPagination(response.data.pagination);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getAllCourses();
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

	const handleFilterByName = (filterName) => {
		setFilterName(filterName);
	};

	const handleDeleteCourse = async (courseId) => {
		try {
			await courseApi.remove(courseId);
			getAllCourses();
		} catch (error) {
			console.error(error);
		}
	};

	const emptyRows = page > 0 ? Math.max(0, rowsPerPage - courses.length) : 0;
	const filteredCourses = applySortFilter(courses, getComparator(order, orderBy), filterName);
	const isNotFound = !filteredCourses.length && !!filterName;

	return (
		<Page title="Courses">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Courses"
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{
							name: 'Courses',
						},
					]}
					action={
						<Button
							variant="contained"
							startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
							onClick={() => navigate(PATH_DASHBOARD.courses.create)}
						>
							New Course
						</Button>
					}
				/>

				<Card>
					<CourseListToolbar filterName={filterName} onFilterName={handleFilterByName} />

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<CourseListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									onRequestSort={handleRequestSort}
								/>

								<TableBody>
									{filteredCourses.length > 0 &&
										filteredCourses.map((course) => {
											const { _id, name, cover, price, createdAt, instructor } = course;

											return (
												<TableRow hover key={_id} tabIndex={-1} role="checkbox">
													<TableCell sx={{ display: 'flex', alignItems: 'center' }}>
														<Image
															disabledEffect
															alt={name}
															src={cloudinary.w100(cover)}
															sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
														/>
														<Typography variant="subtitle2" noWrap>
															{name}
														</Typography>
													</TableCell>
													<TableCell>
														{instructor?.firstName} {instructor?.lastName}
													</TableCell>
													<TableCell style={{ minWidth: 160 }}>{fDate(createdAt)}</TableCell>
													<TableCell align="right">{fCurrency(price)}</TableCell>
													<TableCell align="right">
														<CourseMoreMenu
															courseId={_id}
															courseName={name}
															onDelete={() => handleDeleteCourse(_id)}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 80 * emptyRows }}>
											<TableCell colSpan={5} />
										</TableRow>
									)}
								</TableBody>

								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={5}>
												<Box sx={{ py: 3 }}>
													<SearchNotFound searchQuery={filterName} />
												</Box>
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
						count={pagination._totalRows} //total courses
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

	if (query) {
		return array.filter(
			(_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}

	return stabilizedThis.map((el) => el[0]);
}
