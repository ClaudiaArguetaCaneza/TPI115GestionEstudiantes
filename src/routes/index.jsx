import React from "react";
import { Navigate } from "react-router-dom";



// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// //  // Inner Authentication



import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";




import RecursosMto from "../pages/RecursosMto/RecursosMto";
import RolesMto from "../pages/RolesMto/RolesMto";

import { AdministracionCurriculum } from "../pages/AdministracionCurriculum/AdministracionCurriculum";
import OfertasAplicaciones from "../pages/OfertasAplicaciones/OfertasAplicaciones";

const authProtectedRoutes = [
  // { path: "/dashboard", component: <Dashboard /> },
  // { path: "/dashboard-saas", component: <DashboardSaas /> },
  // { path: "/dashboard-crypto", component: <DashboardCrypto /> },
  // { path: "/blog", component: <Blog /> },
  // { path: "/dashboard-job", component: <DashboardJob /> },

  // //   //Crypto
  // { path: "/crypto-wallet", component: <CryptoWallet /> },
  // { path: "/crypto-buy-sell", component: <CryptoBuySell /> },
  // { path: "/crypto-exchange", component: <CryptoExchange /> },
  // { path: "/crypto-lending", component: <CryptoLending /> },
  // { path: "/crypto-orders", component: <CryptoOrders /> },
  // { path: "/crypto-kyc-application", component: <CryptoKYCApplication /> },

  // //chat
  // { path: "/chat", component: <Chat /> },

  // //File Manager
  // { path: "/apps-filemanager", component: <FileManager /> },

  // // //calendar
  // { path: "/calendar", component: <Calendar /> },

  // //   // //profile
  // { path: "/profile", component: <UserProfile /> },

  // //   //Ecommerce
  // {
  //   path: "/ecommerce-product-detail/:id",
  //   component: <EcommerceProductDetail />,
  // },
  // { path: "/ecommerce-products", component: <EcommerceProducts /> },
  // { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  // { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  // { path: "/ecommerce-cart", component: <EcommerceCart /> },
  // { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  // { path: "/ecommerce-shops", component: <EcommerceShops /> },
  // { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },

  // //   //Email
  // { path: "/email-inbox", component: <EmailInbox /> },
  // { path: "/email-read", component: <EmailRead /> },
  // { path: "/email-template-basic", component: <EmailBasicTemplte /> },
  // { path: "/email-template-alert", component: <EmailAlertTemplte /> },
  // { path: "/email-template-billing", component: <EmailTemplateBilling /> },

  // //   //Invoices
  // { path: "/invoices-list", component: <InvoicesList /> },
  // { path: "/invoices-detail", component: <InvoiceDetail /> },
  // { path: "/invoices-detail/:id", component: <InvoiceDetail /> },

  // //   // Tasks
  // { path: "/tasks-list", component: <TasksList /> },
  // { path: "/tasks-create", component: <TasksCreate /> },
  // { path: "/tasks-kanban", component: <TasksKanban /> },

  // //   //Projects
  // { path: "/projects-grid", component: <ProjectsGrid /> },
  // { path: "/projects-list", component: <ProjectsList /> },
  // { path: "/projects-overview", component: <ProjectsOverview /> },
  // { path: "/projects-overview/:id", component: <ProjectsOverview /> },
  // { path: "/projects-create", component: <ProjectsCreate /> },

  // //   //Blog
  // { path: "/blog-list", component: <BlogList /> },
  // { path: "/blog-grid", component: <BlogGrid /> },
  // { path: "/blog-details", component: <BlogDetails /> },

  // { path: "/job-grid", component: <JobGrid /> },
  // { path: "/job-details", component: <JobDetails /> },
  // { path: "/job-categories", component: <JobCategories /> },
  // { path: "/job-list", component: <JobList /> },
  // { path: "/job-apply", component: <ApplyJobs /> },
  // { path: "/candidate-list", component: <CandidateList /> },
  // { path: "/candidate-overview", component: <CandidateOverview /> },

  // // Contacts
  // { path: "/contacts-grid", component: <ContactsGrid /> },
  // { path: "/contacts-list", component: <ContactsList /> },
  // { path: "/contacts-profile", component: <ContactsProfile /> },

  // //   //Charts
  // { path: "/apex-charts", component: <ChartApex /> },
  // { path: "/chartjs-charts", component: <ChartjsChart /> },
  // { path: "/e-charts", component: <EChart /> },
  // { path: "/sparkline-charts", component: <SparklineChart /> },
  // { path: "/charts-knob", component: <ChartsKnob /> },
  // { path: "/re-charts", component: <ReCharts /> },

  // //   // Icons
  // { path: "/icons-boxicons", component: <IconBoxicons /> },
  // { path: "/icons-dripicons", component: <IconDripicons /> },
  // { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  // { path: "/icons-fontawesome", component: <IconFontawesome /> },

  // //   // Tables
  // { path: "/tables-basic", component: <BasicTables /> },
  // { path: "/tables-datatable", component: <DatatableTables /> },

  // //   // Maps
  // { path: "/maps-google", component: <MapsGoogle /> },

  // //   // Forms
  // { path: "/form-elements", component: <FormElements /> },
  // { path: "/form-layouts", component: <FormLayouts /> },
  // { path: "/form-advanced", component: <FormAdvanced /> },
  // { path: "/form-editors", component: <FormEditors /> },
  // { path: "/form-mask", component: <FormMask /> },
  // { path: "/form-repeater", component: <FormRepeater /> },
  // { path: "/form-uploads", component: <FormUpload /> },
  // { path: "/form-wizard", component: <FormWizard /> },
  // { path: "/form-validation", component: <FormValidations /> },
  // { path: "/dual-listbox", component: <DualListbox /> },

  // //   // Ui
  // { path: "/ui-alerts", component: <UiAlert /> },
  // { path: "/ui-buttons", component: <UiButtons /> },
  // { path: "/ui-cards", component: <UiCards /> },
  // { path: "/ui-carousel", component: <UiCarousel /> },
  // { path: "/ui-colors", component: <UiColors /> },
  // { path: "/ui-dropdowns", component: <UiDropdown /> },
  // { path: "/ui-offcanvas", component: <UiOffCanvas /> },
  // { path: "/ui-general", component: <UiGeneral /> },
  // { path: "/ui-grid", component: <UiGrid /> },
  // { path: "/ui-images", component: <UiImages /> },
  // { path: "/ui-lightbox", component: <UiLightbox /> },
  // { path: "/ui-modals", component: <UiModal /> },
  // { path: "/ui-progressbars", component: <UiProgressbar /> },
  // { path: "/ui-tabs-accordions", component: <UiTabsAccordions /> },
  // { path: "/ui-typography", component: <UiTypography /> },
  // { path: "/ui-video", component: <UiVideo /> },
  // { path: "/ui-session-timeout", component: <UiSessionTimeout /> },
  // { path: "/ui-rating", component: <UiRating /> },
  // { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  // { path: "/ui-notifications", component: <UiNotifications /> },
  // { path: "/ui-placeholders", component: <UiPlaceholders /> },
  // { path: "/ui-toasts", component: <UiToasts /> },
  // { path: "/ui-utilities", component: <UiUtilities /> },

  // //   //Utility
  // { path: "/pages-starter", component: <PagesStarter /> },
  // { path: "/pages-timeline", component: <PagesTimeline /> },
  // { path: "/pages-faqs", component: <PagesFaqs /> },
  // { path: "/pages-pricing", component: <PagesPricing /> },

  { path:"/administracion-curriculum", component: <AdministracionCurriculum />},
  { path:"/ofertas-empleo", component:<OfertasAplicaciones />},

  
  
  // { path:"/facilitador_mto", component: <FacilitadorMto />},
  // { path:"/sedes_mto", component: <SedeMto />},
  // { path:"/facilitador_jornadas", component: <FacilitadorJornadas />},
  // { path:"/reportes", component: <Reportes />},
  // { path:"/aprobacion_jornadas", component: <AprobacionJornadas />},
  // { path:"/recursos_mto", component: <RecursosMto />},
  // { path:"/roles_mto", component: <RolesMto />},
  // { path:"/administrador_mto", component:<AdministradorMto />},
  // { path:"/consulta_representante", component: <ConsultaRepresentante />},
  // { path:"/representante_mto", component:<RepresentanteMto />},
  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/login" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  // { path: "/pages-maintenance", component: <PagesMaintenance /> },
  // { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  // { path: "/pages-404", component: <Pages404 /> },
  // { path: "/pages-500", component: <Pages500 /> },
  // { path: "/crypto-ico-landing", component: <CryptoIcoLanding /> },

  // //   // Authentication Inner
  // { path: "/pages-login", component: <Login1 /> },
  // { path: "/pages-login-2", component: <Login2 /> },
  // { path: "/pages-register", component: <Register1 /> },
  // { path: "/pages-register-2", component: <Register2 /> },
  // { path: "/page-recoverpw", component: <Recoverpw /> },
  // { path: "/page-recoverpw-2", component: <Recoverpw2 /> },
  // { path: "/pages-forgot-pwd", component: <ForgetPwd1 /> },
  // { path: "/pages-forgot-pwd-2", component: <ForgetPwd2 /> },
  // { path: "/auth-lock-screen", component: <LockScreen /> },
  // { path: "/auth-lock-screen-2", component: <LockScreen2 /> },
  // { path: "/page-confirm-mail", component: <ConfirmMail /> },
  // { path: "/page-confirm-mail-2", component: <ConfirmMail2 /> },
  // { path: "/auth-email-verification", component: <EmailVerification /> },
  // { path: "/auth-email-verification-2", component: <EmailVerification2 /> },
  // { path: "/auth-two-step-verification", component: <TwostepVerification /> },
  // {
  //   path: "/auth-two-step-verification-2",
  //   component: <TwostepVerification2 />,
  // },
];

export { authProtectedRoutes, publicRoutes };
