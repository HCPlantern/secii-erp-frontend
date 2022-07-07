// 部署url
export const REQUEST_BASE_URL_PROD = "http://ismzl.com/";
// 开发url （mock的地址
export const REQUEST_BASE_URL_DEV = "http://localhost:8080";

export const ROLE = {
    INVENTORY_MANAGER: "INVENTORY_MANAGER", //库存管理人员
    SALE_STAFF: "SALE_STAFF", // 进货销售人员
    SALE_MANAGER: "SALE_MANAGER", //销售经理
    FINANCIAL_STAFF: "FINANCIAL_STAFF", // 财务人员
    HR: "HR", // 人力资源人员
    GM: "GM", // 总经理
    ADMIN: "ADMIN" // 最高权限
};

export const DEPT_NAME = [
    { name: "库存管理部门", value: "INVENTORY_MANAGER" },
    { name: "进货销售部门", value: "SALE_STAFF" },
    { name: "财务部门", value: "FINANCIAL_STAFF" },
    { name: "销售经理", value: "SALE_MANAGER" },
    { name: "人力资源部门", value: "HR" },
    { name: "总经理", value: "GM" },
]; //ADMIN不算部门


export const PATH = {
    // INVENTORY_MANAGER
    COMMODITY_CLASSIFICATION: {
        path: '/commodityClassification',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    COMMODITY_MANAGEMENT: {
        path: '/commodityManagement',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_MANAGEMENT: {
        path: '/inventoryManagement',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_OPERATION: {
        path: '/inventoryOperation',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_CHECK: {
        path: '/inventoryCheck',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_IN: {
        path: '/inventoryIn',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_OUT: {
        path: '/inventoryOut',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_LOSS: {
        path: '/inventoryLoss',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_WARNING: {
        path: '/inventoryWarning',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_OVERFLOW: {
        path: '/inventoryOverflow',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_PRESENT: {
        path: '/inventoryPresent',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },
    INVENTORY_VIEW: {
        path: '/inventoryView',
        requiresAuth: [ROLE.INVENTORY_MANAGER, ROLE.ADMIN]
    },

    // SALE_STAFF & SALE_MANAGER
    PURCHASE_VIEW: {
        path: '/purchaseView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    PURCHASE_RETURN_VIEW: {
        path: '/purchaseReturnView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    SALE_VIEW: {
        path: '/saleView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    PROMOTION_VIEW: {
        path: '/promotionView',
        requiresAuth: [ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    SALE_RETURN_VIEW: {
        path: '/saleReturnView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    CUSTOMER_VIEW: {
        path: '/customerView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    MAX_AMOUNT_CUSTOMER_VIEW: {
        path: '/maxAmountCustomerView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    SALE_DETAIL_VIEW: {
        path: '/saleDetailView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    HISTORY_SHEET_VIEW: {
        path: '/historySheetView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    BUSINESS_SITUATION_VIEW: {
        path: '/businessSituationView',
        requiresAuth: [ROLE.SALE_STAFF, ROLE.SALE_MANAGER, ROLE.GM, ROLE.ADMIN]
    },
    // GM
    // 收款单审批
    COLLECTION_SHEET_APPROVAL_VIEW:{
        path: '/collectionSheetApprovalView',
        requiresAuth:[ROLE.GM,ROLE.ADMIN]
    },
    // 付款单审批
    PAYMENT_SHEET_APPROVAL_VIEW:{
        path: '/paymentSheetApprovalView',
        requiresAuth:[ROLE.GM,ROLE.ADMIN]
    },
    SALARY_SHEET_APPROVAL_VIEW:{
        path: '/salarySheetApprovalView',
        requiresAuth:[ROLE.GM,ROLE.ADMIN]
    },

    // ADMIN
    ACCOUNT_VIEW: {
        path: '/accountView',
        requiresAuth: [ROLE.ADMIN]
    },
    // FINANCIAL_STAFF
    COLLECTION_VIEW: {
        path: '/collectionView',
        requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
    },
    PAYMENT_VIEW: {
        path: '/paymentView',
        requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
    },
    INIT_ACCOUNT_VIEW:{
        path: '/initAccountView',
        requiresAuth: [ROLE.FINANCIAL_STAFF, ROLE.ADMIN]
    },
    //HR
    DEPARTMENT_SALARY_RULE_VIEW:{
        path: '/departmentSalaryRuleView',
        requiresAuth: [ROLE.HR,ROLE.ADMIN]
    },
    EMPLOYEE_MANAGEMENT_VIEW:{
        path: '/employeeManagementView',
        requiresAuth: [ROLE.HR,ROLE.ADMIN]
    }


}
