import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
// routes
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { RoadmapSchemaForm } from '../../sections/@dashboard/roadmaps';
// api
import roadmapApi from '../../api/roadmapApi';

function RoadmapCreate() {
	const [formData, setFormData] = useState(null);
	const { pathname } = useLocation();
	const { id } = useParams();
	const isEdit = pathname.includes('edit');
	const navigate = useNavigate();

	useEffect(() => {
		const getRoadmap = async () => {
			if (!isEdit) return;
			try {
				const response = await roadmapApi.get(id);
				setFormData(response.data.roadmap);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		isEdit ? getRoadmap() : setFormData(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEdit, id]);

	return (
		<Page title={!isEdit ? 'New roadmap' : 'Edit roadmap'}>
			<Container maxWidth={'lg'}>
				<HeaderBreadcrumbs
					heading={!isEdit ? 'New roadmap' : 'Edit roadmap'}
					links={[
						{ name: 'Dashboard', href: PATH_DASHBOARD.root },
						{ name: 'Roadmaps', href: PATH_DASHBOARD.roadmap.root },
						{ name: !isEdit ? 'New roadmap' : 'Edit roadmap' },
					]}
				/>

				{(formData || !isEdit) && <RoadmapSchemaForm isEdit={isEdit} formData={formData} />}
			</Container>
		</Page>
	);
}

export default RoadmapCreate;
