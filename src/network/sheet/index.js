import request from "@/network/request"

const testAPI = require("@/apis")


// 需要定义查找和修改的API
export const findAllSheet = config => request._get(testAPI.FIND_ALL_SHEET, config)
export const getFinancialReport = config => request._get(testAPI.GET_FINANCIAL_REPORT, config)
