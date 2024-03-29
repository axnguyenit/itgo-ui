import { useState, useEffect } from 'react';
import { capitalCase } from 'change-case';
import { useSearchParams } from 'react-router-dom';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { AccountGeneral, AccountChangePassword } from '../../sections/my-account';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
	{
		value: 'general',
		icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
		component: <AccountGeneral />,
	},
	{
		value: 'change-password',
		icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
		component: <AccountChangePassword />,
	},
];

export default function AccountSettings() {
	const [currentTab, setCurrentTab] = useState('general');
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const tab = searchParams.get('tab');
		if (tab) {
			const existTab = ACCOUNT_TABS.find((item) => item.value === tab);
			if (existTab) setCurrentTab(existTab.value);
		}
	}, [searchParams]);

	const handleChangeTab = (value) => {
		setCurrentTab(value);
		setSearchParams({ tab: value });
	};

	return (
		<Page title="Account Settings">
			<Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
				<Tabs
					value={currentTab}
					scrollButtons="auto"
					variant="scrollable"
					allowScrollButtonsMobile
					onChange={(e, value) => handleChangeTab(value)}
				>
					{ACCOUNT_TABS.map((tab) => (
						<Tab
							disableRipple
							key={tab.value}
							label={capitalCase(tab.value)}
							icon={tab.icon}
							value={tab.value}
						/>
					))}
				</Tabs>

				<Box sx={{ mb: 5 }} />

				{ACCOUNT_TABS.map((tab) => {
					const isMatched = tab.value === currentTab;
					return isMatched && <Box key={tab.value}>{tab.component}</Box>;
				})}
			</Container>
		</Page>
	);
}
