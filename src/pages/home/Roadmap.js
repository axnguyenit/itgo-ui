import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
// component
import Image from '../../components/Image';
import Page from '../../components/Page';
// api
import roadmapApi from '../../api/roadmapApi';
// paths
import { PATH_PAGE, PATH_HOME } from '../../routes/paths';
// utils
import cloudinary from '../../utils/cloudinary';

function Roadmap() {
	const [roadmap, setRoadmap] = useState(null);
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const getRoadmap = async () => {
			try {
				const response = await roadmapApi.get(id);
				setRoadmap(response.data.roadmap);
			} catch (error) {
				console.error(error);
				navigate(PATH_PAGE.page404);
			}
		};

		getRoadmap();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleClick = (tag) => {
		navigate({
			pathname: PATH_HOME.courses.root,
			search: createSearchParams({ category: tag }).toString(),
		});
	};

	return (
		<Page>
			<Container maxWidth="lg" sx={{ mt: 15, mb: 10 }}>
				<Box sx={{ mb: 4 }}>
					<Typography variant="h2" sx={{ mb: 2 }}>
						{roadmap?.name}
					</Typography>
					<Typography variant="body1">{roadmap?.description}</Typography>
				</Box>
				<Stack spacing={4}>
					{!!roadmap?.technologies.length &&
						roadmap.technologies.map((technology, index) => (
							<RoadmapItem
								key={index}
								no={index + 1}
								technology={technology}
								onClick={handleClick}
							/>
						))}
				</Stack>
			</Container>
		</Page>
	);
}

export default Roadmap;

RoadmapItem.propTypes = {
	technology: PropTypes.object,
	onClick: PropTypes.func,
	no: PropTypes.number,
};

function RoadmapItem({ technology, onClick, no }) {
	return (
		<Stack spacing={2}>
			<Typography variant="h3">{`${no}. ${technology?.technology}`}</Typography>
			<Typography variant="body1">{technology?.description}</Typography>

			<Card>
				<Stack spacing={2} sx={{ p: { xs: 2, md: 4 } }} direction="row" alignItems="center">
					<Image
						alt="name"
						src={cloudinary.w300(technology?.image)}
						sx={{ width: { xs: 200, md: 300 }, height: { xs: 120, md: 170 }, borderRadius: 1 }}
					/>
					<Box>
						<Typography variant="h4">Related Courses</Typography>
						<Button onClick={() => onClick(technology?.tag)} variant="contained" sx={{ mt: 1 }}>
							Learn now
						</Button>
					</Box>
				</Stack>
			</Card>
		</Stack>
	);
}
