import request from "@/network/request"
const testAPI = require("@/apis")

export const findAllSalesMan = config => request._get(testAPI.FIND_ALL_SALES_MAN, config)

export const findAllUsers = config => request._get(testAPI.FIND_ALL_USERS, config)
