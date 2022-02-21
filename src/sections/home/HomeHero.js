import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
	position: 'relative',
	backgroundColor: theme.palette.grey[400],
	[theme.breakpoints.up('md')]: {
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
		display: 'flex',
		position: 'fixed',
		alignItems: 'center',
	},
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
	zIndex: 10,
	maxWidth: 520,
	margin: 'auto',
	textAlign: 'center',
	position: 'relative',
	paddingTop: theme.spacing(15),
	paddingBottom: theme.spacing(15),
	[theme.breakpoints.up('md')]: {
		margin: 'unset',
		textAlign: 'left',
	},
}));

const HeroOverlayStyle = styled(m.img)({
	zIndex: 9,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
	top: 0,
	right: 0,
	bottom: 0,
	zIndex: 8,
	width: '100%',
	margin: 'auto',
	position: 'absolute',
	[theme.breakpoints.up('lg')]: {
		right: '8%',
		width: 'auto',
		height: '80%',
	},
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
	return (
		<MotionContainer>
			<RootStyle>
				<HeroOverlayStyle
					alt="overlay"
					src="https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/icons%2Foverlay.svg?alt=media&token=a149ddf3-b203-4dad-8997-9e26ff857598"
					variants={varFade().in}
				/>

				<HeroImgStyle
					alt="hero"
					src="https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/hero%2Fhome-hero.png?alt=media&token=eb583251-0b29-4bb4-b7e5-d98a375cc656"
					variants={varFade().inUp}
				/>

				<Container>
					<ContentStyle>
						<m.div variants={varFade().inRight}>
							<Typography variant="h1" sx={{ color: 'common.white' }}>
								Start learning <br />
								programming <br /> with
								<Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
									&nbsp;ITGO
								</Typography>
							</Typography>
						</m.div>

						<m.div variants={varFade().inRight}>
							<Typography sx={{ color: 'common.white' }}>
								Vietnam's leading programming learning platform taught by IT engineers.
							</Typography>
						</m.div>

						<m.div variants={varFade().inRight}>
							<Button
								size="large"
								variant="contained"
								component={RouterLink}
								to={PATH_DASHBOARD.root}
								startIcon={<Iconify icon={'eva:flash-fill'} width={20} height={20} />}
							>
								Learn Now
							</Button>
						</m.div>
					</ContentStyle>
				</Container>
			</RootStyle>
			<Box sx={{ height: { md: '100vh' } }} />
		</MotionContainer>
	);
}
