import request from "@/network/request";
const testAPI = require("@/apis")

export const getAllCompanyAccount=config=>request._get(testAPI.COMPANY_ACCOUNT_SHOW, config)