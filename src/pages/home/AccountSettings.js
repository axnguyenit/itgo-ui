import { capitalCase } from 'change-case';
import { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// _mock_
// import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
// sections
import { AccountGeneral, AccountChangePassword } from '../../sections/my-account';

// ----------------------------------------------------------------------

export default function AccountSettings() {
	const [currentTab, setCurrentTab] = useState('general');

	const ACCOUNT_TABS = [
		{
			value: 'general',
			icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
			component: <AccountGeneral />,
		},
		// {
		// 	value: 'billing',
		// 	icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
		// 	component: (
		// 		<AccountBilling
		// 			cards={_userPayment}
		// 			addressBook={_userAddressBook}
		// 			invoices={_userInvoices}
		// 		/>
		// 	),
		// },
		{
			value: 'change_password',
			icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
			component: <AccountChangePassword />,
		},
	];

	return (
		<Page title="Account Settings">
			<Container maxWidth={'lg'} sx={{ mt: 15, mb: 10 }}>
				<Tabs
					value={currentTab}
					scrollButtons="auto"
					variant="scrollable"
					allowScrollButtonsMobile
					onChange={(e, value) => setCurrentTab(value)}
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
