import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
	Card,
	Table,
	Button,
	TableRow,
	TableBody,
	TableCell,
	Container,
	TableContainer,
	TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { TechnologyListHead, TechnologyMoreMenu } from '../../sections/@dashboard/technologies';
import cloudinary from '../../utils/cloudinary';
import technologyApi from '../../api/technologyApi';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'image', label: 'Image', alignRight: false },
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'tag', label: 'Tag', alignRight: false },
	{ id: '' },
];

// ----------------------------------------------------------------------

export default function Technologies() {
	const [technologies, setTechnologies] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const getTechnologies = async () => {
		const params = {
			_page: page,
			_limit: rowsPerPage,
		};

		try {
			const response = await technologyApi.getAll(params);
			setTechnologies(response.data.technologies);
			setPagination(response.data.pagination);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteTechnology = async (technologyId) => {
		try {
			await technologyApi.remove(technologyId);
			getTechnologies();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getTechnologies();
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

	const emptyRows = page > 0 ? Math.max(0, rowsPerPage - technologies.length) : 0;
	const filteredTechnologies = applySortFilter(technologies, getComparator(order, orderBy));

	return (
		<Page title="Technologies">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Technologies"
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.technologies.root },
						{ name: 'Technologies' },
					]}
					action={
						<Button
							variant="contained"
							component={RouterLink}
							to={PATH_DASHBOARD.technologies.create}
							startIcon={<Iconify icon={'eva:plus-fill'} />}
						>
							New Technology
						</Button>
					}
				/>

				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<TechnologyListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={technologies.length}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{!!filteredTechnologies.length &&
										filteredTechnologies.map((technology) => {
											const { _id, name, tag, image } = technology;

											return (
												<TableRow hover key={_id} tabIndex={-1} role="checkbox">
													<TableCell sx={{ display: 'flex', alignItems: 'center' }}>
														<Image
															disabledEffect
															alt={name}
															src={cloudinary.w150(image)}
															sx={{ borderRadius: 0.5, width: 90, height: 48, mr: 2 }}
														/>
													</TableCell>
													<TableCell>{name}</TableCell>
													<TableCell align="left">{tag}</TableCell>

													<TableCell align="right">
														<TechnologyMoreMenu
															technologyId={_id}
															technologyName={name}
															onDelete={() => handleDeleteTechnology(_id)}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 80 * emptyRows }}>
											<TableCell colSpan={4} />
										</TableRow>
									)}
								</TableBody>
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

function applySortFilter(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}
