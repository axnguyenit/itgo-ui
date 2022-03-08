// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Stack } from '@mui/material';
// components
import { MotionContainer, TextAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	backgroundSize: 'cover',
	backgroundImage: `url(${window.location.origin}/assets/images/overlay.svg),
  url(${window.location.origin}/assets/images/courses-hero.jpg)`,
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

export default function CourseHero({ label }) {
	return (
		<RootStyle>
			<Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
				<ContentStyle spacing={5}>
					<div>
						<Box sx={{ display: 'inline-flex', color: 'common.white' }}>
							{label &&
								label
									.split(' ')
									.map((e, index) => <TextAnimate key={index} text={e} sx={{ mr: 2 }} />)}
						</Box>
					</div>
				</ContentStyle>
			</Container>
		</RootStyle>
	);
}
