import React, { useEffect, memo } from 'react';
import { ZoomMtg } from '@zoomus/websdk';
import { Typography, Button, Stack } from '@mui/material';
import './learning.css';
// declare var ZoomMtg;
ZoomMtg.setZoomJSLib('https://source.zoom.us/2.2.0/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

console.log('ZoomMtg', ZoomMtg);

function Learning() {
	// setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
	var signatureEndpoint = 'http://localhost:8000/api/zoom';
	var apiKey = 'UgFubNlTQq2mML_q_0G33g';
	var meetingNumber = '91511194597';
	var role = 0;
	var leaveUrl = 'http://localhost:3030/learning/courseId';
	var userName = 'Kha';
	var userEmail = '';
	var passWord = 181201;
	// pass in the registrant's token if your meeting or webinar requires registration. More info here:
	// Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
	// Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
	var registrantToken = '';

	const startMeeting = (signature) => {
		console.log('signature', signature);
		document.getElementById('zmmtg-root').style.display = 'block';

		ZoomMtg.init({
			leaveUrl: leaveUrl,
			success: (success) => {
				console.log(success);

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
						console.log(error);
						document.getElementById('zmmtg-root').style.display = 'none';
					},
				});
			},
			error: (error) => {
				console.log(error);
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
				console.log('response.signature', response.signature);
				startMeeting(response.signature);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		const zoomRoot = document.getElementById('zmmtg-root');
		zoomRoot.style.display = 'none';
	}, []);

	return (
		<Stack direction="column" justifyContent="center" alignItems="center" sx={{ mt: 15 }}>
			<Typography variant="h3">Zoom Meeting SDK Sample React</Typography>

			<Button variant="contained" onClick={getSignature}>
				Join Meeting
			</Button>
		</Stack>
	);
}

export default memo(Learning);
