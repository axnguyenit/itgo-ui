// routes
import { PATH_HOME } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  home: getIcon('ic_home'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Home',
        path: PATH_HOME.home,
        icon: ICONS.home,
      },
      {
        title: 'My Learning',
        path: PATH_HOME.myLearning.root,
        icon: ICONS.kanban,
      },
      {
        title: 'Roadmap',
        path: PATH_HOME.roadmap.root,
        icon: ICONS.analytics,
        children: [
          { title: 'Front End', path: PATH_HOME.roadmap.specialization },
          { title: 'Back End', path: PATH_HOME.roadmap.specialization },
          { title: 'Fullstack', path: PATH_HOME.roadmap.specialization },
          { title: 'DevOps', path: PATH_HOME.roadmap.specialization },
          { title: 'Testing', path: PATH_HOME.roadmap.specialization },
        ],
      },
      // {
      //   title: 'Classes',
      //   path: PATH_HOME.general.banking,
      //   icon: ICONS.banking,
      // },
      {
        title: 'Teachers',
        path: PATH_HOME.teachers.root,
        icon: ICONS.booking,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     // MANAGEMENT : USER
  //     {
  //       title: 'user',
  //       path: PATH_HOME.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_HOME.user.profile },
  //         { title: 'cards', path: PATH_HOME.user.cards },
  //         { title: 'list', path: PATH_HOME.user.list },
  //         { title: 'create', path: PATH_HOME.user.newUser },
  //         { title: 'edit', path: PATH_HOME.user.editById },
  //         { title: 'account', path: PATH_HOME.user.account },
  //       ],
  //     },
  //   ],
  // },
];

export default navConfig;
