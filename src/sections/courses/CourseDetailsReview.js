import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Divider, Collapse } from '@mui/material';
//
import CourseDetailsReviewForm from './CourseDetailsReviewForm';
import CourseDetailsReviewList from './CourseDetailsReviewList';
import CourseDetailsReviewOverview from './CourseDetailsReviewOverview';

// ----------------------------------------------------------------------

CourseDetailsReview.propTypes = {
	product: PropTypes.object,
};

export default function CourseDetailsReview({ product }) {
	const [reviewBox, setReviewBox] = useState(false);

	const handleOpenReviewBox = () => {
		setReviewBox((prev) => !prev);
	};

	const handleCloseReviewBox = () => {
		setReviewBox(false);
	};

	return (
		<>
			<CourseDetailsReviewOverview product={product} onOpen={handleOpenReviewBox} />

			<Divider />

			<Collapse in={reviewBox}>
				<CourseDetailsReviewForm onClose={handleCloseReviewBox} id="move_add_review" />
				<Divider />
			</Collapse>

			<CourseDetailsReviewList product={product} />
		</>
	);
}
