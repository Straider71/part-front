import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
// import Toasted from 'vue-toasted';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    redirect: {
      name: 'QuestionnaireListPage',
    },

    children: [
      {
        path: '',
        name: 'QuestionnaireListPage',
        component: () =>
          import(
            /* webpackChunkName: "QuestionnaireListPage" */ '@/views/QuestionnaireListPage.vue'
          ),
        meta: {
          requireAuth: true,
        },
      },
      {
        path: 'questions/:id',
        name: 'Question',
        component: () =>
          import(/* webpackChunkName: "Question" */ '@/views/Question.vue'),
        meta: {
          requireAuth: true,
        },
        props: true,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () =>
          import(/* webpackChunkName: "Profile" */ '@/views/Profile.vue'),
        meta: {
          requireAuth: true,
        },
      },
    ],
  },
  {
    path: '/account/',
    component: () =>
      import(/* webpackChunkName: "Authenticate" */ '@/views/Authenticate.vue'),
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () =>
          import(/* webpackChunkName: "SignIn" */ '@/views/SignIn.vue'),
      },
      {
        path: 'sign-up',
        name: 'sign-up',

        component: () =>
          import(/* webpackChunkName: "SignUp" */ '@/views/SignUp.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',

        component: () =>
          import(/* webpackChunkName: "ForgotPass" */ '@/views/ForgotPass.vue'),
      },
      {
        path: 'reset-password/:token',
        name: 'reset-password',

        component: () =>
          import(
            /* webpackChunkName: "ForgotPassForm" */ '@/views/ForgotPassForm.vue'
          ),
      },
    ],
  },

  {
    path: '/admin/',
    // name: 'admin',

    component: () =>
      import(/* webpackChunkName: "AdminPage" */ '@/views/AdminPage.vue'),
    meta: {
      admin: true,
    },
    children: [
      {
        path: '',
        name: 'overview',
        meta: {
          admin: true,
        },
        component: () => import('@/views/Overview.vue'),
      },
      {
        path: 'questionnaire',
        name: 'createQuestionnare',
        meta: {
          admin: true,
        },
        component: () => import('@/views/createQuestionnare.vue'),
      },
      {
        path: 'question',
        name: 'createQuestion',
        meta: {
          admin: true,
        },
        component: () => import('@/views/createQuestion.vue'),
      },
    ],
  },
  {
    path: '/validate-email/:token/',
    name: 'validate-email',
    component: () =>
      import(
        /* webpackChunkName: "ForgotPassForm" */ '@/views/EmailValidation.vue'
      ),
  },

  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = JSON.parse(localStorage.getItem('user'));

  if (
    to.matched.some(record => record.meta.admin) &&
    loggedIn.role !== 'admin'
  ) {
    Vue.toasted.error('شما دسترسی لازم را ندارید');
  } else if (to.matched.some(record => record.meta.requireAuth) && !loggedIn) {
    next('/account/sign-in');
    // Vue.toasted.error('ابتدا وارد شوید');
  } else if (
    (to.fullPath === '/account/sign-in' ||
      to.fullPath === '/account/sign-up') &&
    loggedIn
  )
    next('/');
  else {
    next();
  }
});
export default router;
