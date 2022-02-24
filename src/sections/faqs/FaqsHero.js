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
  url(https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/hero%2Ffaqs.png?alt=media&token=be61d9d5-77cf-458d-8ff1-d6446b335e9f)`,
	padding: theme.spacing(10, 0),
	[theme.breakpoints.up('md')]: {
		height: 560,
		padding: 0,
	},
}));

const ContentStyle = styled(Stack)(({ theme }) => ({
	textAlign: 'center',
	[theme.breakpoints.up('md')]: {
		textAlign: 'left',
		position: 'absolute',
		bottom: theme.spacing(10),
	},
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
	return (
		<RootStyle>
			<Container component={MotionContainer} sx={{ position: 'relative', height: '100%' }}>
				<ContentStyle spacing={5}>
					<div>
						<TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
						<br />
						<Box sx={{ display: 'inline-flex', color: 'common.white' }}>
							<TextAnimate text="can" sx={{ mr: 2 }} />
							<TextAnimate text="we" sx={{ mr: 2 }} />
							<TextAnimate text="help" sx={{ mr: 2 }} />
							<TextAnimate text="you?" />
						</Box>
					</div>

					<m.div variants={varFade().inUp}>
						<InputStyle
							stretchStart={280}
							placeholder="Search support"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<Iconify
											icon={'eva:search-fill'}
											sx={{ color: 'text.disabled', width: 20, height: 20 }}
										/>
									</InputAdornment>
								),
							}}
							sx={{
								'& .MuiOutlinedInput-root': {
									color: 'common.white',
								},
							}}
						/>
					</m.div>
				</ContentStyle>
			</Container>
		</RootStyle>
	);
}
