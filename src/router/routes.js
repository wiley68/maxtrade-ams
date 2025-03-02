const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home',
      },
      {
        path: 'options',
        component: () => import('pages/OptionsPage.vue'),
        name: 'options',
      },
      {
        path: 'about',
        component: () => import('src/pages/AboutPage.vue'),
        name: 'about',
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
