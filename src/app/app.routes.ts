import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'sesion',
    loadComponent: () => import('./pages/auth/components/auth/auth.component'),
  },
  {
    path: 'panel',
    loadComponent: () => import('./pages/dashboard/layout/layout.component'),
    children: [
      {
        path: 'consultas',
        loadComponent: () => import('./pages/dashboard/consultations/components/consultation-layout/consultation-layout.component'),
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/dashboard/consultations/components/consultation-page/consultation-list/consultation-list.component'),
          },
          {
            path: ':id',
            loadComponent: () => import('./pages/dashboard/consultations/components/consultation-page/consultation-by-id/consultation-by-id.component'),
          },
          { path: '**', redirectTo: '' }
        ]
      },
      {
        path: 'blog',
        loadComponent: () => import('./pages/dashboard/blog/components/blog-layout/blog-layout.component'),
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/dashboard/blog/components/blog-page/blog-list/blog-list.component'),
          },
          {
            path: 'crear',
            loadComponent: () => import('./pages/dashboard/blog/components/blog-page/blog-create-edit/blog-create-edit.component'),
          },
          {
            path: 'editar/:id',
            loadComponent: () => import('./pages/dashboard/blog/components/blog-page/blog-create-edit/blog-create-edit.component'),
          },
          { path: '**', redirectTo: '' }
        ]
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/dashboard/users/users.component')
      },
      { path: '**', redirectTo: 'consultas' }
    ]
  },
  { path: '**', redirectTo: 'sesion' }
];
