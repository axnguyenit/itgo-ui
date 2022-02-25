import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack, InputAdornment } from '@mui/material';
// components
import Iconify from '../../components/Iconify';
import InputStyle from '../../components/InputStyle';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	backgroundSize: 'cover',
	backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/icons%2Foverlay.svg?alt=media&token=a149ddf3-b203-4dad-8997-9e26ff857598),
  url(https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/hero%2Fcourse-details.jpg?alt=media&token=22e3f7d7-11bc-4820-82bf-af4e3a361daa)`,
	padding: theme.spacing(10, 0),
	[theme.breakpoints.up('md')]: {
		height: 360,
		padding: 0,
	},
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
	textAlign: 'center',
	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
		position: 'absolute',
		bottom: '50%',
		transform: 'translateY(50%)',
	},
}));

// ----------------------------------------------------------------------

export default function CourseHero() {
	return (
		<RootStyle>
			<Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
				<ContentStyle spacing={5}>
					<div>
						<Box sx={{ display: 'inline-flex', color: 'common.white' }}>
							<TextAnimate text="Course" sx={{ mr: 2 }} />
							<TextAnimate text="details" sx={{ mr: 2 }} />
						</Box>
					</div>
				</ContentStyle>
			</Container>
		</RootStyle>
	);
}
