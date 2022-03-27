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
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// sections
import { RoadmapListHead, RoadmapMoreMenu } from '../../sections/@dashboard/roadmaps';
// api
import roadmapApi from '../../api/roadmapApi';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'slogan', label: 'Slogan', alignRight: false },
	{ id: 'description', label: 'Description', alignRight: false },
	{ id: '' },
];

// ----------------------------------------------------------------------

export default function Roadmaps() {
	const [roadmaps, setRoadmaps] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const getRoadmaps = async () => {
		const params = {
			_page: page,
			_limit: rowsPerPage,
		};

		try {
			const response = await roadmapApi.getAll(params);
			setRoadmaps(response.data.roadmaps);
			setPagination(response.data.pagination);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteRoadmap = async (roadmapId) => {
		try {
			await roadmapApi.remove(roadmapId);
			getRoadmaps();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getRoadmaps();
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

	const emptyRows = page > 0 ? Math.max(0, rowsPerPage - roadmaps.length) : 0;
	const filteredRoadmaps = applySortFilter(roadmaps, getComparator(order, orderBy));

	return (
		<Page title="Roadmaps">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Roadmaps"
					links={[{ name: 'Dashboard', href: PATH_DASHBOARD.roadmaps.root }, { name: 'Roadmaps' }]}
					action={
						<Button
							variant="contained"
							component={RouterLink}
							to={PATH_DASHBOARD.roadmaps.create}
							startIcon={<Iconify icon={'eva:plus-fill'} />}
						>
							New Roadmap
						</Button>
					}
				/>

				<Card>
					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<RoadmapListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={roadmaps.length}
									onRequestSort={handleRequestSort}
								/>
								<TableBody>
									{!!filteredRoadmaps.length &&
										filteredRoadmaps.map((roadmap) => {
											const { _id, name, slogan, description } = roadmap;

											return (
												<TableRow hover key={_id} tabIndex={-1} role="checkbox">
													<TableCell>{name}</TableCell>
													<TableCell align="left">{slogan}</TableCell>
													<TableCell align="left">{description}</TableCell>
													<TableCell align="right">
														<RoadmapMoreMenu
															roadmapId={_id}
															roadmapName={name}
															onDelete={() => handleDeleteRoadmap(_id)}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 68 * emptyRows }}>
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
