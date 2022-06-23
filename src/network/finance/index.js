import request from "@/network/request";
const testAPI = require("@/apis")

export const createCollectionSheet = config => request._post(testAPI.COLLECTION_SHEET_CREATE, config)
export const collectionSheetApproval= config => request._get(testAPI.COLLECTION_SHEET_APPROVAL, config)
export const getAllCollectionSheet=config=> request._get(testAPI.COLLECTION_SHEET_SHOW, config)
export const createPaymentSheet=config=>request._post(testAPI.PAYMENT_SHEET_CREATE, config)
export const paymentSheetApproval=config=>request._get(testAPI.PAYMENT_SHEET_APPROVAL, config)
export const getAllPaymentSheet=config=>request._get(testAPI.PAYMENT_SHEET_SHOW, config)
