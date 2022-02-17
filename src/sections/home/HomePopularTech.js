import { CardHeader, Box, Divider } from '@mui/material';
// components
import Image from '../../components/Image';

// ----------------------------------------------------------------------

const TECHS = [
  'https://cdn.fullstack.edu.vn/f8-production/courses/13/13.png',
  'https://cdn.fullstack.edu.vn/f8-production/courses/6.png',
  'https://cdn.fullstack.edu.vn/f8-production/courses/3.png',
  'https://cdn.fullstack.edu.vn/f8-production/courses/5.png',
  'https://cdn.fullstack.edu.vn/f8-production/blog_posts/1653/61b46a3d757cc.png',
  'https://cdn.fullstack.edu.vn/f8-production/blog_posts/343/6142b3b561675.jpg',
];

export default function HomePopularTech() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <CardHeader
        title='Popular Technologies'
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: 28,
          },
        }}
      />
      <Divider sx={{ borderStyle: 'none', marginBottom: 2 }} />

      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {TECHS.length > 0 &&
          TECHS.map((item, i) => (
            <Box
              sx={{
                pt: '60%',
                borderRadius: 1,
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                transition: (theme) =>
                  theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
            >
              <Image
                src={item}
                sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
}
