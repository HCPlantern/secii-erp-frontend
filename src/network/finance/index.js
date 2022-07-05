import request from "@/network/request";
import {CONFIGURABLE} from "core-js/internals/function-name";
const testAPI = require("@/apis")

export const createCollectionSheet = config => request._post(testAPI.COLLECTION_SHEET_CREATE, config)
export const collectionSheetApproval= config => request._get(testAPI.COLLECTION_SHEET_APPROVAL, config)
export const getAllCollectionSheet=config=> request._get(testAPI.COLLECTION_SHEET_SHOW, config)
export const getCollectionSheetById = config => request._get(testAPI.COLLECTION_FIND_SHEET_BY_ID, config)
export const createPaymentSheet=config=>request._post(testAPI.PAYMENT_SHEET_CREATE, config)
export const paymentSheetApproval=config=>request._get(testAPI.PAYMENT_SHEET_APPROVAL, config)
export const getAllPaymentSheet=config=>request._get(testAPI.PAYMENT_SHEET_SHOW, config)
export const getPaymentSheetById = config => request._get(testAPI.PAYMENT_FIND_SHEET_BY_ID, config)
export const getAllInitCustomer = config => request._get(testAPI.INIT_CUSTOMER_SHOW,config)
export const getAllInitProduct = config => request._get(testAPI.INIT_PRODUCT_SHOW,config)
export const getAllInitCompanyAccount = config => request._get(testAPI.INIT_COMPANY_ACCOUNT_SHOW,config)
export const createInitCustomer = config => request._post(testAPI.INIT_CUSTOMER_CREATE,config)
export const createInitProduct = config => request._post(testAPI.INIT_PRODUCT_CREATE,config)
export const createInitCompanyAccount = config => request._post(testAPI.INIT_COMPANY_ACCOUNT_CREATE,config)