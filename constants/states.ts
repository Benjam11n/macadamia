import { ROUTES } from './routes';

export const DEFAULT_EMPTY = {
  title: 'No Data Found',
  message:
    'Looks like the database is taking a nap. Wake it up with some new entries.',
  button: {
    text: 'Add Data',
    href: ROUTES.DASHBOARD,
  },
};

export const DEFAULT_ERROR = {
  title: 'Something Went Wrong',
  message: 'Even our code can have a bad day. Give it another shot.',
  button: {
    text: 'Retry Request',
    href: ROUTES.DASHBOARD,
  },
};

export const EMPTY_SESSIONS = {
    title: 'No Practice Sessions Yet',
    message: 'Adjust your settings or start a new interview to track your progress.',
    button: {
      text: 'Start a Practice Interview',
      href: ROUTES.ROLE,
    },
  };