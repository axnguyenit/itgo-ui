import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
	position: 'relative',
	backgroundColor: theme.palette.grey[400],
	overflow: 'hidden',
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
					src={`${window.location.origin}/assets/images/overlay.svg`}
					variants={varFade().in}
				/>

				<HeroImgStyle
					alt="hero"
					src={`${window.location.origin}/assets/images/home-hero.png`}
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
					</ContentStyle>
				</Container>
			</RootStyle>
			<Box sx={{ height: { md: '100vh' } }} />
		</MotionContainer>
	);
}
