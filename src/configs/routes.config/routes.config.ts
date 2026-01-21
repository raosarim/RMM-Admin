import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'landingModeView',
        path: '/landing-mode-view',
        component: lazy(() => import('@/views/demo/LandingModesView')),
        authority: [],
    },
    {
        key: 'templatesView',
        path: '/templates-view',
        component: lazy(() => import('@/views/demo/TemplatesView')),
        authority: [],
    },
    {
        key: 'subscriptionView',
        path: '/subscription-view',
        component: lazy(() => import('@/views/demo/SubscriptionView')),
        authority: [],
    },
    {
        key: 'faqView',
        path: '/faq-view',
        component: lazy(() => import('@/views/demo/FaqView')),
        authority: [],
    },
    {
        key: 'faqCategory',
        path: '/faq-category',
        component: lazy(() => import('@/views/demo/FaqCategory')),
        authority: [],
    },
    {
        key: 'subscriptionPackage',
        path: '/subscription-package',
        component: lazy(() => import('@/views/demo/SubscriptionPackage')),
        authority: [],
    },
    {
        key: 'contactAndSupport',
        path: '/contact-and-support',
        component: lazy(() => import('@/views/demo/ContactAndSupport')),
        authority: [],
    },
    {
        key: 'privacyAndPolicy',
        path: '/privacy-and-policy',
        component: lazy(() => import('@/views/demo/PrivacyAndPolicy')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() => import('@/views/demo/GroupSingleMenuItemView')),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView1'),
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(
            () => import('@/views/demo/GroupCollapseMenuItemView2'),
        ),
        authority: [],
    },
    ...othersRoute,
]
