import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Typography } from '@mui/material';
// components
import cloudinary from '../../utils/cloudinary';

// ----------------------------------------------------------------------

export default function InstructorRules() {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const _category = searchParams.get('category');
	}, [searchParams]);

	const handleChangePage = (value) => {
		setPage(value);
		setSearchParams({ page: value });
	};

	return <Stack>InstructorRules</Stack>;
}
