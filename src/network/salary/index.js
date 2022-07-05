import request from "@/network/request"
const testAPI = require("@/apis")

export const getSalarySheetByTime = config => request._get(testAPI.GET_SALARY_SHEET_BY_TIME, config)
export const getSalarySheetById = config => request._get(testAPI.GET_SALARY_SHEET_BY_ID, config)
export const getSalarySheetByState = config => request._get(testAPI.GET_SALARY_SHEET_BY_STATE)