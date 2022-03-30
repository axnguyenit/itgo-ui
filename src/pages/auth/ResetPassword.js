import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';
// sections
import { ResetPasswordForm } from '../../sections/auth';
// assets
import { SuccessIcon, ErrorIcon } from '../../assets';
import userApi from '../../api/userApi';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	minHeight: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgotPassword() {
	const [sent, setSent] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const { id, token } = useParams();

	useEffect(() => {
		const checkRequestResetPassword = async () => {
			try {
				await userApi.checkRequestResetPassword(id, token);
				setIsValid(true);
			} catch (error) {
				console.error(error);
			}
		};

		checkRequestResetPassword();
	}, [id, token]);

	if (!isValid) return <LoadingScreen />;

	return (
		<Page title="Reset Password" sx={{ height: 1 }}>
			<RootStyle>
				<LogoOnlyLayout />

				<Container>
					<Box sx={{ maxWidth: 480, mx: 'auto' }}>
						{!sent && isValid && (
							<>
								<Typography variant="h3" paragraph>
									Create new password
								</Typography>

								<ResetPasswordForm onSent={() => setSent(true)} id={id} token={token} />

								<Button
									fullWidth
									size="large"
									component={RouterLink}
									to={PATH_AUTH.login}
									sx={{ mt: 1 }}
								>
									Back
								</Button>
							</>
						)}
						{sent && (
							<Box sx={{ textAlign: 'center' }}>
								<SuccessIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

								<Typography variant="h3" gutterBottom>
									Reset password successfully
								</Typography>

								<Button
									size="large"
									variant="contained"
									component={RouterLink}
									to={PATH_AUTH.login}
									sx={{ mt: 5 }}
								>
									Back
								</Button>
							</Box>
						)}

						{!isValid && (
							<Box sx={{ textAlign: 'center' }}>
								<ErrorIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
								<Typography variant="h3" gutterBottom>
									Link reset password is invalid
								</Typography>

								<Button
									size="large"
									variant="contained"
									component={RouterLink}
									to={PATH_AUTH.login}
									sx={{ mt: 5 }}
								>
									Back
								</Button>
							</Box>
						)}
					</Box>
				</Container>
			</RootStyle>
		</Page>
	);
}
