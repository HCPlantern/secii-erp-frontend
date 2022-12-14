import Vue from "vue";
import VueRouter from "vue-router";
import {ROLE, PATH} from "@/common/const";

const Error = () => import("../components/content/Error");
const Login = () => import("../views/auth/Login");
const Home = () => import("../views/Home");
const CommodityManagement = () =>
    import("../views/commodity/CommodityManagement");
const CommodityClassification = () =>
    import("../views/commodity/CommodityClassification");
const InventoryManagement = () => import("../views/inventory/InventoryManagement");
const InventoryCheck = () => import("../views/inventory/InventoryCheck");
const InventoryOperation = () =>
    import("../views/inventory/InventoryOperation");
const InventoryIn = () => import("../views/inventory/InventoryIn");
const InventoryOut = () => import("../views/inventory/InventoryOut");
const InventoryLoss = () => import("../views/inventory/InventoryLoss");
const InventoryOverflow = () => import("../views/inventory/InventoryOverflow");
const InventoryPresent = () => import("../views/inventory/InventoryPresent");
const InventoryView = () => import("../views/inventory/InventoryView");
const InventoryWarning = () => import("../views/inventory/InventoryWarning");
const PurchaseView = () => import("../views/purchase/PurchaseView");
const PurchaseReturnView = () => import("../views/purchase/PurchaseReturnView");
const SaleView = () => import("../views/sale/SaleView");
const PromotionView = () => import("../views/sale/PromotionView");
const SaleReturnView = () => import("../views/sale/SaleReturnView");
const CustomerView = () => import ("../views/purchase/CustomerView");
const MaxAmountCustomerView = () => import("../views/purchase/MaxAmountCustomerView");
const CollectionSheetApproval=()=>import("../views/approval/CollectionSheetApproval");
const PaymentSheetApproval=()=>import("../views/approval/PaymentSheetApproval");
const SalarySheetApproval=()=>import("../views/approval/SalarySheetApproval");
const AccountView = () => import("../views/admin/AccountView");
const CollectionView = () => import("../views/finance/CollectionView");
const PaymentView = () => import("../views/finance/PaymentView");
const InitCompanyAccountView = () => import("../views/finance/InitAccountView");
const DepartmentSalaryRuleView = () => import("../views/humanresource/DepartmentSalaryRuleView");
const EmployeeManagementView = () => import("../views/humanresource/EmployeeManagementView");
const SalarySheetGenerationView = () => import("../views/humanresource/SalarySheetGenerationView");

// ??????
const SaleDetailView = () => import("../views/sheet/SaleDetailView");
const HistorySheetView = () => import("../views/sheet/HistorySheetView");
const BusinessSituationView = () => import("../views/sheet/BusinessSituationView");


Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/error",
        component: Error
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/register",
        component: () => import("@/views/auth/register.vue")
    },
    // ????????????
    {
        path: PATH.COMMODITY_CLASSIFICATION.path,
        component: CommodityClassification,
        meta: {requiresAuth: PATH.COMMODITY_CLASSIFICATION.requiresAuth}
    },
    {
        path: PATH.COMMODITY_MANAGEMENT.path,
        component: CommodityManagement,
        meta: {requiresAuth: PATH.COMMODITY_MANAGEMENT.requiresAuth}
    },
    // ????????????
    {
        path: PATH.INVENTORY_MANAGEMENT.path,
        component: InventoryManagement,
        meta: {requiresAuth: PATH.INVENTORY_MANAGEMENT.requiresAuth}
    },
    {
        path: PATH.INVENTORY_CHECK.path,
        component: InventoryCheck,
        meta: {requiresAuth: PATH.INVENTORY_CHECK.requiresAuth}
    },
    {
        path: PATH.INVENTORY_OPERATION.path,
        component: InventoryOperation,
        name: "InventoryOperation",
        meta: {requiresAuth: PATH.INVENTORY_OPERATION.requiresAuth}
    },
    {
        path: PATH.INVENTORY_IN.path,
        component: InventoryIn,
        name: "InventoryIn",
        meta: {requiresAuth: PATH.INVENTORY_LOSS.requiresAuth}
    },
    {
        path: PATH.INVENTORY_OUT.path,
        component: InventoryOut,
        name: "InventoryOut",
        meta: {requiresAuth: PATH.INVENTORY_LOSS.requiresAuth}
    },
    {
        path: PATH.INVENTORY_LOSS.path,
        component: InventoryLoss,
        name: "InventoryLoss",
        meta: {requiresAuth: PATH.INVENTORY_LOSS.requiresAuth}
    },
    {
        path: PATH.INVENTORY_OVERFLOW.path,
        component: InventoryOverflow,
        name: "InventoryOverflow",
        meta: {requiresAuth: PATH.INVENTORY_OVERFLOW.requiresAuth}
    },
    {
        path: PATH.INVENTORY_PRESENT.path,
        component: InventoryPresent,
        name: "InventoryPresent",
        meta: {requiresAuth: PATH.INVENTORY_PRESENT.requiresAuth}
    },
    {
        path: PATH.INVENTORY_VIEW.path,
        component: InventoryView,
        meta: {requiresAuth: PATH.INVENTORY_VIEW.requiresAuth}
    },
    {
        path: PATH.INVENTORY_WARNING.path,
        component: InventoryWarning,
        name: "InventoryWarning",
        meta: {requiresAuth: PATH.INVENTORY_WARNING.requiresAuth}
    },
    // ????????????
    {
        path: PATH.PURCHASE_VIEW.path,
        component: PurchaseView,
        name: "PurchaseView",
        meta: {requiresAuth: PATH.PURCHASE_VIEW.requiresAuth}
    },
    {
        path: PATH.PURCHASE_RETURN_VIEW.path,
        component: PurchaseReturnView,
        name: "PurchaseReturnView",
        meta: {requiresAuth: PATH.PURCHASE_RETURN_VIEW.requiresAuth}
    },
    {
        path: PATH.SALE_RETURN_VIEW.path,
        component: SaleReturnView,
        name: "SaleReturnView",
        meta: {requiresAuth: PATH.SALE_RETURN_VIEW.requiresAuth}


    },
    {
        path: PATH.SALE_VIEW.path,
        component: SaleView,
        name: "SaleView",
        meta: {requiresAuth: PATH.SALE_VIEW.requiresAuth}
    },
    {
      path: PATH.PROMOTION_VIEW.path,
      component: PromotionView,
      name: "PromotionView",
      meta: {requiresAuth: PATH.PROMOTION_VIEW.requiresAuth}
    },
    {
        path: PATH.CUSTOMER_VIEW.path,
        component: CustomerView,
        name: "CustomerView",
        meta: {requiresAuth: PATH.CUSTOMER_VIEW.requiresAuth}
    },
    {
        path: PATH.MAX_AMOUNT_CUSTOMER_VIEW.path,
        component: MaxAmountCustomerView,
        name: "MaxAmountCustomerView",
        meta: {requiresAuth: PATH.MAX_AMOUNT_CUSTOMER_VIEW.requiresAuth}
    },


    // ????????????????????????
    // ?????????????????? ??????????????? ??????????????? ???????????????
    {
        path: PATH.COLLECTION_SHEET_APPROVAL_VIEW.path,
        component: CollectionSheetApproval,
        meta: {requiresAuth: PATH.COLLECTION_SHEET_APPROVAL_VIEW.requiresAuth}
    },
    {
        path: PATH.PAYMENT_SHEET_APPROVAL_VIEW.path,
        component: PaymentSheetApproval,
        meta: {requiresAuth: PATH.PAYMENT_SHEET_APPROVAL_VIEW.requiresAuth}
    },
    {
        path: PATH.SALARY_SHEET_APPROVAL_VIEW.path,
        component: SalarySheetApproval,
        meta: {requiresAuth: PATH.SALARY_SHEET_APPROVAL_VIEW.requiresAuth}
    },
    // ????????????
    {
        path: PATH.ACCOUNT_VIEW.path,
        component: AccountView,
        meta: {requiresAuth: PATH.ACCOUNT_VIEW.requiresAuth}
    },
    // ???????????????
    {
        path: PATH.COLLECTION_VIEW.path,
        component: CollectionView,
        meta: {requiresAuth: PATH.COLLECTION_VIEW.requiresAuth}
    },
    // ???????????????
    {
        path: PATH.PAYMENT_VIEW.path,
        component: PaymentView,
        meta: {requiresAuth: PATH.PAYMENT_VIEW.requiresAuth}
    },
    // ????????????
    {
        path: PATH.SALE_DETAIL_VIEW.path,
        component: SaleDetailView,
        name: "SaleDetailView",
        meta: {requiresAuth: PATH.SALE_DETAIL_VIEW.requiresAuth}
    },
    {
        path: PATH.HISTORY_SHEET_VIEW.path,
        component: HistorySheetView,
        name: "HistorySheetView",
        meta: {requiresAuth: PATH.HISTORY_SHEET_VIEW.requiresAuth}
    },
    {
        path: PATH.BUSINESS_SITUATION_VIEW.path,
        component: BusinessSituationView,
        name: "BusinessSituationView",
        meta: {requiresAuth: PATH.BUSINESS_SITUATION_VIEW.requiresAuth}
    },
    {
        path: PATH.INIT_ACCOUNT_VIEW.path,
        component: InitCompanyAccountView,
        name: "InitCompanyAccountView",
        meta: {requiresAuth: PATH.INIT_ACCOUNT_VIEW.requiresAuth}
    },
    //??????????????????
    {
        path: PATH.DEPARTMENT_SALARY_RULE_VIEW.path,
        component: DepartmentSalaryRuleView,
        meta: {requiresAuth: PATH.DEPARTMENT_SALARY_RULE_VIEW.requiresAuth}
    },
    {
        path: PATH.EMPLOYEE_MANAGEMENT_VIEW.path,
        component: EmployeeManagementView,
        meta: {requiresAuth: PATH.EMPLOYEE_MANAGEMENT_VIEW.requiresAuth}
    },
    {
        path: PATH.SALARY_SHEET_GENERATION_VIEW.path,
        component: SalarySheetGenerationView,
        meta: {requiresAuth: PATH.SALARY_SHEET_GENERATION_VIEW.requiresAuth}
    },
    // -----------------------???????????????-----------------------------
    {
        path: "*",
        redirect: "/error"
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach(async (to, from, next) => {
    // console.log(to.path);
    if (to.path === "/error" || to.path === "/login") {
        next();
    } else if (to.path === "/") {
        let token = sessionStorage.getItem("token");
        let role = sessionStorage.getItem("role");
        if (token == null || role == null) next("/login");
        else next();
    } else if (to.meta.requiresAuth) {
        if (
            to.meta.requiresAuth.some(
                role => role.toString() === sessionStorage.getItem("role")
            )
        ) {
            //?????????
            // console.log("??????????????????");
            next()
        } else {
            // console.log("???????????????");
            next("/"); //?????????,????????????
        }
    } else {
        // ????????????, ??????next (??????error)
        next();
    }
});

export default router;
