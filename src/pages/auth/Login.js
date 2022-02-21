import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex',
	},
}));

const HeaderStyle = styled('header')(({ theme }) => ({
	top: 0,
	zIndex: 9,
	lineHeight: 0,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	padding: theme.spacing(3),
	justifyContent: 'space-between',
	[theme.breakpoints.up('md')]: {
		alignItems: 'flex-start',
		padding: theme.spacing(7, 5, 0, 7),
	},
}));

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
	const { method } = useAuth();

	const smUp = useResponsive('up', 'sm');

	return (
		<Page title="Login">
			<RootStyle>
				<HeaderStyle>
					<Logo />
					{smUp && (
						<Typography variant="body2" sx={{ mt: { lg: 1, md: -2 } }}>
							Don’t have an account? {''}
							<Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
								Get started
							</Link>
						</Typography>
					)}
				</HeaderStyle>

				<Container maxWidth="sm">
					<ContentStyle>
						<Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
							<Box sx={{ flexGrow: 1 }}>
								<Typography variant="h4" gutterBottom>
									Login to ITGO
								</Typography>
								<Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
							</Box>

							<Tooltip title={capitalCase(method)} placement="right">
								<>
									<Image
										disabledEffect
										src="https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/icons%2Fic_jwt.png?alt=media&token=86a979e1-f491-48d1-8e39-a9129d0b5d22"
										sx={{ width: 32, height: 32 }}
									/>
								</>
							</Tooltip>
						</Stack>

						{/* <Alert severity="info" sx={{ mb: 3 }}>
							Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
						</Alert> */}

						<LoginForm />

						{!smUp && (
							<Typography variant="body2" align="center" sx={{ mt: 3 }}>
								Don’t have an account?{' '}
								<Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
									Get started
								</Link>
							</Typography>
						)}
					</ContentStyle>
				</Container>
			</RootStyle>
		</Page>
	);
}
