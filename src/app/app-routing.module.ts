import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/panel/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/panel/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'detail-product/:id',
    loadChildren: () => import('./pages/products/detail-product/detail-product.module').then( m => m.DetailProductPageModule)
  },
  {
    path: 'detail-product2/:id',
    loadChildren: () => import('./pages/products/detail-product2/detail-product2.module').then( m => m.DetailProduct2PageModule)
  },
  {
    path: 'view-clients',
    loadChildren: () => import('./pages/clients/view-clients/view-clients.module').then( m => m.ViewClientsPageModule)
  },
  {
    path: 'detail-client/:id',
    loadChildren: () => import('./pages/clients/detail-client/detail-client.module').then( m => m.DetailClientPageModule)
  },
  {
    path: 'create-client',
    loadChildren: () => import('./pages/clients/create-client/create-client.module').then( m => m.CreateClientPageModule)
  },
  {
    path: 'view-products',
    loadChildren: () => import('./pages/products/view-products/view-products.module').then( m => m.ViewProductsPageModule)
  },
  {
    path: 'create-product',
    loadChildren: () => import('./pages/products/create-product/create-product.module').then( m => m.CreateProductPageModule)
  },
  {
    path: 'create-product2',
    loadChildren: () => import('./pages/products/create-product2/create-product2.module').then( m => m.CreateProduct2PageModule)
  },
  {
    path: 'create-product3',
    loadChildren: () => import('./pages/products/create-product3/create-product3.module').then( m => m.CreateProduct3PageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/panel/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'update-user',
    loadChildren: () => import('./pages/panel/update-user/update-user.module').then( m => m.UpdateUserPageModule)
  },
  {
    path: 'comment',
    loadChildren: () => import('./pages/panel/comment/comment.module').then( m => m.CommentPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/panel/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'view-invoices',
    loadChildren: () => import('./pages/invoices/view-invoices/view-invoices.module').then( m => m.ViewInvoicesPageModule)
  },
  {
    path: 'detail-invoice/:id',
    loadChildren: () => import('./pages/invoices/detail-invoice/detail-invoice.module').then( m => m.DetailInvoicePageModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/invoices/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
