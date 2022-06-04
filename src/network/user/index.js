import request from "@/network/request"
const testAPI = require("@/apis")

export const findAllSalesMan = config => request._get(testAPI.FIND_USER_NAME_BY_ROLE, config)
