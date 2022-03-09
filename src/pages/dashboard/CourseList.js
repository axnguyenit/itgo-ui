import { useState, useEffect } from 'react';
// @mui
import {
	Box,
	Card,
	Table,
	TableRow,
	Checkbox,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Product', alignRight: false },
	{ id: 'instructor', label: 'Instructor', alignRight: false },
	{ id: 'createdAt', label: 'Create at', alignRight: false },
	{ id: 'price', label: 'Price', alignRight: true },
	{ id: '' },
];

// ----------------------------------------------------------------------

export default function CourseList() {
	const [courses, setCourses] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});

	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [orderBy, setOrderBy] = useState('createdAt');

	const getAllCourses = async () => {
		const params = {
			_page: page,
			_limit: rowsPerPage,
		};
		try {
			const response = await courseApi.getAll(params);
			if (response.data.success) {
				setCourses(response.data.courses);
				setPagination(response.data.pagination);
			}
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

	const handleSelectAllClick = (checked) => {
		if (checked) {
			const selected = courses.map((n) => n.name);
			setSelected(selected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
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
			const response = await courseApi.remove(courseId);
			if (response.data.success) getAllCourses();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteCourses = (selected) => {
		const deleteProducts = courses.filter((product) => !selected.includes(product.name));
		setSelected([]);
		setCourses(deleteProducts);
	};

	const emptyRows = page > 0 ? Math.max(0, page * rowsPerPage - courses.length) : 0;

	const filteredCourses = courses.filter(
		(_course) => _course.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
	);

	const isNotFound = !filteredCourses.length && Boolean(filterName);

	return (
		<Page title="Course List">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Course List"
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{
							name: 'Courses List',
						},
					]}
				/>

				<Card>
					<CourseListToolbar
						numSelected={selected.length}
						filterName={filterName}
						onFilterName={handleFilterByName}
						onDeleteProducts={() => handleDeleteCourses(selected)}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<CourseListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={courses.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>

								<TableBody>
									{filteredCourses.length > 0 &&
										filteredCourses.map((course) => {
											const { _id, name, cover, price, createdAt, instructor } = course;

											const isItemSelected = selected.indexOf(name) !== -1;

											return (
												<TableRow
													hover
													key={_id}
													tabIndex={-1}
													role="checkbox"
													selected={isItemSelected}
													aria-checked={isItemSelected}
												>
													<TableCell padding="checkbox">
														<Checkbox checked={isItemSelected} onClick={() => handleClick(name)} />
													</TableCell>
													<TableCell sx={{ display: 'flex', alignItems: 'center' }}>
														<Image
															disabledEffect
															alt={name}
															src={cover}
															sx={{ borderRadius: 1.5, width: 64, height: 64, mr: 2 }}
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
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>

								{isNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6}>
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
