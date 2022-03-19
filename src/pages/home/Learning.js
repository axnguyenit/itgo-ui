import React, { memo } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import './learning.css';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';

// ----------------------------------------------------------------------

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.2.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

const RootStyle = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	padding: theme.spacing(0),
	margin: theme.spacing(0),
	backgroundColor: theme.palette.background.default,
}));

const HeaderStyle = styled('header')(({ theme }) => ({
	top: 0,
	position: 'absolute',
	padding: theme.spacing(3),
	[theme.breakpoints.up('md')]: {
		padding: theme.spacing(7, 5, 0, 7),
	},
}));

const SectionStyle = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	margin: theme.spacing(0),
}));

const ContentStyle = styled('div')(({ theme }) => ({
	width: '100%',
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	margin: theme.spacing(0),
	padding: theme.spacing(20, 5),
	[theme.breakpoints.down('md')]: {
		padding: theme.spacing(0),
	},
}));

const ContainerContent = styled(Container)(({ theme }) => ({
	margin: theme.spacing(0, 'auto'),
	[theme.breakpoints.down('md')]: {
		margin: theme.spacing(10),
	},
	// backgroundColor: theme.palette.background.primary,
}));

function Learning() {
	const signatureEndpoint = `${process.env.REACT_APP_API_URL}/api/zoom`;
	const apiKey = 'UgFubNlTQq2mML_q_0G33g';
	const meetingNumber = '91511194597';
	const role = 0;
	const leaveUrl = `${window.location.origin}/learning/courseId`;
	const userName = 'Kha';
	const userEmail = '';
	const passWord = 181201;
	const registrantToken = '';

	const mdUp = useResponsive('up', 'md');

	const startMeeting = (signature) => {
		document.getElementById('zmmtg-root').style.display = 'block';

		ZoomMtg.init({
			leaveUrl: leaveUrl,
			success: (success) => {
				ZoomMtg.join({
					signature: signature,
					meetingNumber: meetingNumber,
					userName: userName,
					apiKey: apiKey,
					userEmail: userEmail,
					passWord: passWord,
					tk: registrantToken,
					success: (success) => {
						console.log('success', success);
					},
					error: (error) => {
						console.error(error);
						document.getElementById('zmmtg-root').style.display = 'none';
					},
				});
			},
			error: (error) => {
				console.error(error);
			},
		});
	};

	const getSignature = (e) => {
		e.preventDefault();

		fetch(signatureEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				meetingNumber: meetingNumber,
				role: role,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				startMeeting(response.signature);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<Page title="Learning">
			<RootStyle>
				<HeaderStyle>
					<Logo />
				</HeaderStyle>
				<ContainerContent>
					<Grid container>
						{mdUp && (
							<Grid item xs={12} md={5}>
								<SectionStyle>
									<Image
										alt="join meeting"
										src={`${window.location.origin}/assets/images/education-online.png`}
									/>
								</SectionStyle>
							</Grid>
						)}

						<Grid xs={12} md={7}>
							<ContentStyle>
								<Image
									alt="js"
									ratio="21/9"
									sx={{ borderRadius: 1 }}
									src="https://firebasestorage.googleapis.com/v0/b/graduation-project-itgo.appspot.com/o/courses%2Ftypescript.png?alt=media&token=bfcc7ba7-04ff-4cf0-b0d7-1def58e9310f"
								/>
								<Typography variant="h3" sx={{ my: 5 }}>
									Join Meeting
								</Typography>

								<Button variant="contained" fullWidth size="large" onClick={getSignature}>
									Join Meeting
								</Button>
							</ContentStyle>
						</Grid>
					</Grid>
				</ContainerContent>
			</RootStyle>
		</Page>
	);
}

export default memo(Learning);
