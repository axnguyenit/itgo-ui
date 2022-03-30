import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// @mui
import {
	Card,
	Table,
	TableRow,
	TableBody,
	TableCell,
	Container,
	TableContainer,
	TablePagination,
	Typography,
	Avatar,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import TableListHead from '../../components/TableListHead';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { ApplicationMoreMenu } from '../../sections/@dashboard/applications';
import cloudinary from '../../utils/cloudinary';
import applicationApi from '../../api/applicationApi';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Name', alignRight: false },
	{ id: 'email', label: 'Email', alignRight: false },
	{ id: 'position', label: 'Working position', alignRight: false },
	{ id: 'cv', label: 'CV', alignRight: false },
	{ id: '' },
];

// ----------------------------------------------------------------------

export default function Applications() {
	const [applications, setApplications] = useState([]);
	const [page, setPage] = useState(1);
	const [pagination, setPagination] = useState({});
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('name');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const getApplications = async () => {
		const params = {
			_page: page,
			_limit: rowsPerPage,
		};

		try {
			const response = await applicationApi.getAll(params);
			setApplications(response.data.applications);
			setPagination(response.data.pagination);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getApplications();
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

	const handleApprove = async (id) => {
		try {
			await applicationApi.approve(id);
			getApplications();
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeny = async (id) => {
		try {
			await applicationApi.deny(id);
			getApplications();
		} catch (error) {
			console.error(error);
		}
	};

	const emptyRows = page > 0 ? Math.max(0, rowsPerPage - applications?.length) : 0;
	const filteredApplications = applySortFilter(applications, getComparator(order, orderBy));

	return (
		<Page title="Applications">
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading="Applications"
					links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Applications' }]}
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
									{!!filteredApplications?.length &&
										filteredApplications?.map((application) => (
											<TableRow hover key={application?._id} tabIndex={-1} role="checkbox">
												<TableCell sx={{ display: 'flex', alignItems: 'center' }}>
													<Avatar
														alt={application?.user?.firstName}
														src={cloudinary.w100(application?.user?.avatar)}
														sx={{ mr: 2 }}
													/>
													<Typography variant="subtitle2" noWrap>
														{application?.user?.firstName} {application?.user?.lastName}
													</Typography>
												</TableCell>
												<TableCell>{application?.user?.email}</TableCell>
												<TableCell>{application?.position}</TableCell>
												<TableCell align="left">{application?.cv}</TableCell>
												<TableCell align="right">
													<ApplicationMoreMenu
														applicationId={application?._id}
														name={`${application?.user?.firstName} ${application?.user?.lastName}`}
														onDeny={() => handleDeny(application?._id)}
														onApprove={() => handleApprove(application?._id)}
													/>
												</TableCell>
											</TableRow>
										))}
									{emptyRows > 0 && (
										<TableRow style={{ height: 80 * emptyRows }}>
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
	const stabilizedThis = array?.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis?.map((el) => el[0]);
}
