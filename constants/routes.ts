export const ROUTES = {
  HOME: '/',

  DASHBOARD: '/dashboard',
  RESUME: (roleId:string) =>  `/interview/role/${roleId}`,
  ROLE: '/interview/role',
  CALL: (interviewId: string) => `/interview//${interviewId}/call`,
  DETAILS: (id: string) => `/interview/${id}/details`,

  FAQ: '/faq',
  ABOUT: '/about',
  TERMS: '/terms',

  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
};

