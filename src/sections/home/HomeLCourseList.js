import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Card, CardHeader, Stack } from '@mui/material';
// _mock_
import { _ecommerceLatestProducts } from '../../_mock';
//
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

export default function HomeLCourseList() {
  return (
    <Card>
      <CardHeader title='Courses' />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {_ecommerceLatestProducts.map((product) => (
            <CourseItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

CourseItem.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
  }),
};

function CourseItem({ product }) {
  const { name, image } = product;

  return (
    <Stack direction='row' spacing={2} sx={{}}>
      <Image
        alt={name}
        src={image}
        sx={{ width: 45, height: 45, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link
          component={RouterLink}
          to='#'
          sx={{ color: 'text.primary', typography: 'subtitle2' }}
        >
          {name}
        </Link>
      </Box>
    </Stack>
  );
}
