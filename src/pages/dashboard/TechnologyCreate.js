import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
// routes
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TechnologyNewForm } from '../../sections/@dashboard/technologies';
// api
import technologyApi from '../../api/technologyApi';

function TechnologyCreate() {
	const [technology, setTechnology] = useState(null);
	const { pathname } = useLocation();
	const { id } = useParams();
	const isEdit = pathname.includes('edit');
	const navigate = useNavigate();

	useEffect(() => {
		const getTechnology = async () => {
			if (!isEdit) return;
			try {
				const response = await technologyApi.get(id);
				setTechnology(response.data.technology);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		isEdit ? getTechnology() : setTechnology(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, id]);

	return (
		<Page title={!isEdit ? 'New technology' : 'Edit technology'}>
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading={!isEdit ? 'New technology' : 'Edit technology'}
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{ name: 'Technologies', href: PATH_DASHBOARD.technologies.root },
						{ name: !isEdit ? 'New technology' : 'Edit technology' },
					]}
				/>

				{(technology || !isEdit) && (
					<TechnologyNewForm isEdit={isEdit} currentTechnology={technology} />
				)}
			</Container>
		</Page>
	);
}

export default TechnologyCreate;
