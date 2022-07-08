//TEST
const TEST_GET = "/api/test/get";
const TEST_POST = "/api/test/post";

const AUTH = "/api/user/auth"
const LOGIN = "/api/user/login"
const REGISTER = '/api/user/register'
const SIGN_IN = '/api/user/signIn'

// 商品分类管理
const COMMODITY_CLASSIFICATION_ALL = '/api/category/queryAll'
const COMMODITY_CLASSIFICATION_CREATE = '/api/category/create'
const COMMODITY_CLASSIFICATION_UPDATE = '/api/category/update'
const COMMODITY_CLASSIFICATION_DELETE = '/api/category/delete'

// 商品管理
const COMMODITY_ALL = '/api/product/queryAll';
const COMMODITY_CREATE = '/api/product/create';
const COMMODITY_UPDATE = '/api/product/update';
const COMMODITY_DELETE = '/api/product/delete';


const WAREHOUSE_INPUT = '/api/warehouse/input';
const WAREHOUSE_OUTPUT_PRE = '/api/warehouse/product/count';
const WAREHOUSE_OUTPUT = '/api/warehouse/output';
const WAREHOUSE_GET_INPUTSHEET = '/api/warehouse/inputSheet/state';
const WAREHOUSE_FIND_INPUTSHEET_BY_ID = '/api/warehouse/inputSheet/find-sheet';
const WAREHOUSE_GET_OUTPUTSHEET = '/api/warehouse/outputSheet/state';
const WAREHOUSE_FIND_OUTPUTSHEET_BY_ID = '/api/warehouse/outputSheet/find-sheet';
const WAREHOUSE_IO_DEATIL_BY_TIME = '/api/warehouse/sheetContent/time';
const WAREHOUSE_IPQ_BY_TIME = '/api/warehouse/inputSheet/time/quantity';
const WAREHOUSE_OPQ_BY_TIME = '/api/warehouse/outputSheet/time/quantity';
const WAREHOUSE_OUTPUTSHEET_APPROVE = '/api/warehouse/outputSheet/approve';
const WAREHOUSE_INPUTSHEET_APPROVE = '/api/warehouse/inputSheet/approve';
const WAREHOUSE_DAILY_COUNT = '/api/warehouse/warehouse/counting';
const WAREHOUSE_DAILY_COUNT_EXCEL = '/api/warehouse/warehouse/counting/exportexcel'

// 用户管理
const FIND_ALL_SALES_MAN = '/api/user/findAllSalesMan'
const FIND_ALL_USERS = '/api/user/find-all-users'

// 销售管理
// 进货管理
const PURCHASE_ALL = '/api/purchase/sheet-show';
const PURCHASE_FIND_SHEET_BY_ID = '/api/purchase/find-sheet';
const PURCHASE_CREATE = '/api/purchase/sheet-make';
const PURCHASE_FIRST_APPROVAL = '/api/purchase/first-approval';
const PURCHASE_SECOND_APPROVAL = '/api/purchase/second-approval';
// 进货退货管理
const PURCHASE_RETURN_ALL = '/api/purchase-returns/sheet-show';
const PURCHASE_RETURN_CREATE = '/api/purchase-returns/sheet-make';
const PURCHASE_RETURN_FIRST_APPROVAL = '/api/purchase-returns/first-approval';
const PURCHASE_RETURN_SECOND_APPROVAL = '/api/purchase-returns/second-approval';
const PURCHASE_RETURN_FIND_SHEET_BY_ID = '/api/purchase-returns/find-sheet';
// 销售管理
const SALE_ALL = '/api/sale/sheet-show';
const SALE_CREATE = '/api/sale/sheet-make';
const SALE_FIRST_APPROVAL = '/api/sale/first-approval';
const SALE_SECOND_APPROVAL = '/api/sale/second-approval';
const SALE_FIND_SHEET_BY_ID = '/api/sale/find-sheet';
const SALE_FIND_DETAIL_BY_TIME = 'api/sale/find-all-sale-detail';
//销售退货管理
const SALE_RETURN_FIND_SHEET_BY_ID = '/api/sale-returns/find-sheet';
const SALE_RETURN_ALL = '/api/sale-returns/sheet-show'
const SALE_RETURN_CREATE = '/api/sale-returns/sheet-make';
const SALE_RETURN_FIRST_APPROVAL = '/api/sale-returns/first-approval';
const SALE_RETURN_SECOND_APPROVAL = '/api/sale-returns/second-approval';
// 客户管理
const CUSTOMER_QUERY = '/api/customer/findByType';
const CUSTOMER_CREATE = '/api/customer/createCustomer';
const CUSTOMER_UPDATE = '/api/customer/updateCustomer';
const CUSTOMER_DELETE = '/api/customer/deleteCustomer'
const SALE_PURCHASE_ALL = '/api/purchase/sheet-show';
const SALE_PURCHASE_CREATE = '/api/purchase/sheet-make';
const SALE_CUSTOMER_QUERY = '/api/customer/findByType';
const SALE_CUSTOMER_MAX = '/api/sale/maxAmountCustomer';
//财务单据管理
const COLLECTION_SHEET_CREATE = '/api/collection/collection-sheet-make';
const COLLECTION_SHEET_APPROVAL = '/api/collection/approve-collection-sheet'
const COLLECTION_SHEET_SHOW = '/api/collection/sheet-show'
const COLLECTION_FIND_SHEET_BY_ID = '/api/collection/find-sheet'
const PAYMENT_SHEET_CREATE = '/api/payment/payment-sheet-make'
const PAYMENT_SHEET_APPROVAL = '/api/payment/approve-payment-sheet'
const PAYMENT_SHEET_SHOW = '/api/payment/sheet-show'
const PAYMENT_FIND_SHEET_BY_ID = '/api/payment/find-sheet'

//公司银行账户管理
const COMPANY_ACCOUNT_SHOW = '/api/accountManage/findCompanyAccountByName'
const COMPANY_ACCOUNT_CREATE = '/api/accountManage/createCompanyAccount'
const COMPANY_ACCOUNT_UPDATE = '/api/accountManage/updateCompanyAccount'
const COMPANY_ACCOUNT_DELETE = '/api/accountManage/deleteCompanyAccountById'
// 单据
const FIND_ALL_SHEET = '/api/sheet/findAllSheet'
const GET_FINANCIAL_REPORT = '/api/finance/getFinancialReport'
// 薪酬规则制定
const SALARY_RULE_SHOW='/api/salary/queryAllSalaryRules'
const SALARY_RULE_UPDATE='/api/salary/updateDepartmentSalaryRule'
//员工管理
const EMPLOYEE_ADD='/api/employee/addEmployee'
const EMPLOYEE_SHOW='/api/employee/queryAllEmployees'
const EMPLOYEE_UPDATE='/api/employee/updateEmployeeInfo'
const EMPLOYEE_DELETE_BY_ID='/api/employee/deleteEmployeeById'
// 工资
const GET_SALARY_SHEET_BY_TIME = '/api/salary/getSalarySheetByTime'
const GET_SALARY_SHEET_BY_ID = '/api/salary/getSalarySheetById'
const GET_SALARY_SHEET_BY_STATE = '/api/salary/getSalarySheetByState'
const SALARY_SHEET_GENERATION = '/api/salary/generateSalarySheet'
const SALARY_FIRST_APPROVAL='/api/salary/salary-first-approval'
const SALARY_SECOND_APPROVAL='/api/salary/salary-second-approval'
// 期初建账
const INIT_COMPANY_ACCOUNT_SHOW = '/api/initAccount/getAllInitCompanyAccount'
const INIT_PRODUCT_SHOW = '/api/initAccount/getAllInitProduct'
const INIT_CUSTOMER_SHOW = '/api/initAccount/getAllInitCustomer'
const INIT_COMPANY_ACCOUNT_CREATE = '/api/initAccount/createCompanyAccount'
const INIT_PRODUCT_CREATE = '/api/initAccount/createProduct'
const INIT_CUSTOMER_CREATE = '/api/initAccount/createCustomer'
module.exports = {
    TEST_GET,
    TEST_POST,

    FIND_ALL_SALES_MAN,
    FIND_ALL_USERS,

    AUTH,
    LOGIN,
    REGISTER,
    SIGN_IN,
    COMMODITY_CLASSIFICATION_ALL,
    COMMODITY_CLASSIFICATION_CREATE,
    COMMODITY_CLASSIFICATION_UPDATE,
    COMMODITY_CLASSIFICATION_DELETE,

    COMMODITY_ALL,
    COMMODITY_CREATE,
    COMMODITY_UPDATE,
    COMMODITY_DELETE,

    WAREHOUSE_INPUT,
    WAREHOUSE_OUTPUT_PRE,
    WAREHOUSE_OUTPUT,
    WAREHOUSE_GET_INPUTSHEET,
    WAREHOUSE_GET_OUTPUTSHEET,
    WAREHOUSE_IO_DEATIL_BY_TIME,
    WAREHOUSE_IPQ_BY_TIME,
    WAREHOUSE_OPQ_BY_TIME,
    WAREHOUSE_OUTPUTSHEET_APPROVE,
    WAREHOUSE_INPUTSHEET_APPROVE,
    WAREHOUSE_DAILY_COUNT,
    WAREHOUSE_DAILY_COUNT_EXCEL,
    WAREHOUSE_FIND_INPUTSHEET_BY_ID,
    WAREHOUSE_FIND_OUTPUTSHEET_BY_ID,

    PURCHASE_ALL,
    PURCHASE_CREATE,
    PURCHASE_FIRST_APPROVAL,
    PURCHASE_SECOND_APPROVAL,
    PURCHASE_RETURN_ALL,
    PURCHASE_RETURN_CREATE,
    PURCHASE_RETURN_FIRST_APPROVAL,
    PURCHASE_RETURN_SECOND_APPROVAL,
    PURCHASE_FIND_SHEET_BY_ID,
    PURCHASE_RETURN_FIND_SHEET_BY_ID,

    SALE_ALL,
    SALE_CREATE,
    SALE_FIRST_APPROVAL,
    SALE_SECOND_APPROVAL,
    SALE_CUSTOMER_QUERY,
    SALE_CUSTOMER_MAX,
    SALE_FIND_SHEET_BY_ID,
    SALE_FIND_DETAIL_BY_TIME,
    SALE_PURCHASE_ALL,
    SALE_PURCHASE_CREATE,
    CUSTOMER_QUERY,
    CUSTOMER_CREATE,
    CUSTOMER_UPDATE,
    CUSTOMER_DELETE,
    SALE_RETURN_ALL,
    SALE_RETURN_CREATE,
    SALE_RETURN_FIRST_APPROVAL,
    SALE_RETURN_SECOND_APPROVAL,
    SALE_RETURN_FIND_SHEET_BY_ID,

    COLLECTION_SHEET_CREATE,
    COLLECTION_SHEET_APPROVAL,
    COLLECTION_SHEET_SHOW,
    COLLECTION_FIND_SHEET_BY_ID,
    PAYMENT_FIND_SHEET_BY_ID,
    PAYMENT_SHEET_CREATE,
    PAYMENT_SHEET_APPROVAL,
    PAYMENT_SHEET_SHOW,

    COMPANY_ACCOUNT_SHOW,
    COMPANY_ACCOUNT_CREATE,
    COMPANY_ACCOUNT_UPDATE,
    COMPANY_ACCOUNT_DELETE,

    FIND_ALL_SHEET,
    GET_FINANCIAL_REPORT,

    GET_SALARY_SHEET_BY_TIME,
    GET_SALARY_SHEET_BY_ID,
    GET_SALARY_SHEET_BY_STATE,
    SALARY_SHEET_GENERATION,

    INIT_COMPANY_ACCOUNT_SHOW,
    INIT_PRODUCT_SHOW,
    INIT_CUSTOMER_SHOW,
    INIT_COMPANY_ACCOUNT_CREATE,
    INIT_PRODUCT_CREATE,
    INIT_CUSTOMER_CREATE,
    SALARY_RULE_SHOW,
    SALARY_RULE_UPDATE,
    EMPLOYEE_ADD,
    EMPLOYEE_SHOW,
    EMPLOYEE_UPDATE,
    EMPLOYEE_DELETE_BY_ID,
    SALARY_FIRST_APPROVAL,
    SALARY_SECOND_APPROVAL
};
