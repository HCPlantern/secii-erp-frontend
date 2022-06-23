import request from "@/network/request";
const testAPI = require("@/apis")

export const getAllCompanyAccount=config=>request._get(testAPI.COMPANY_ACCOUNT_SHOW, config)
export const createCompanyAccount=config=>request._post(testAPI.COMPANY_ACCOUNT_CREATE,config)
export const updateCompanyAccount=config=>request._post(testAPI.COMPANY_ACCOUNT_UPDATE,config)
export const deleteCompanyAccountById=config=>request._get(testAPI.COMPANY_ACCOUNT_DELETE,config)