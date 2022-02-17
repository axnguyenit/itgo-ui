// @mui
import { Container, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  EcommerceWelcome,
  EcommerceNewProducts,
} from '../../sections/@dashboard/general/e-commerce';

import {
  HomeLCourseList,
  HomeWidgetSummary,
  HomeInstructorList,
  HomePopularTech,
} from 'src/sections/home';
import useResponsive from 'src/hooks/useResponsive';
import {
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration,
} from '../../assets';

// ----------------------------------------------------------------------

export default function Home() {
  const { themeStretch } = useSettings();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <Page title='Home'>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {isDesktop && (
            <Grid item xs={0} lg={2.5}>
              <HomeLCourseList />
            </Grid>
          )}

          <Grid item xs={12} lg={7}>
            <EcommerceNewProducts />
          </Grid>
          {isDesktop && (
            <Grid item xs={0} lg={2.5}>
              <EcommerceWelcome />
            </Grid>
          )}

          <Grid item xs={12} md={4}>
            <HomeWidgetSummary
              title='Experienced instructors'
              total={714000}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <HomeWidgetSummary
              title='Students'
              total={311000}
              icon={<CheckInIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <HomeWidgetSummary
              title='The best programming learning platform'
              total={'1st'}
              icon={<CheckOutIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <HomeInstructorList />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <HomePopularTech />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
