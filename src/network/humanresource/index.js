import request from "@/network/request";
import {CONFIGURABLE} from "core-js/internals/function-name";
const testAPI = require("@/apis")

export const getAllDepartmentSalaryRules=config=>request._get(testAPI.SALARY_RULE_SHOW,config)
export const updateDepartmentSalaryRule=config=>request._post(testAPI.SALARY_RULE_UPDATE,config)
export const addEmployee=config=>request._post(testAPI.EMPLOYEE_ADD,config)
export const getAllEmployee=config=>request._get(testAPI.EMPLOYEE_SHOW,config)
export const updateEmployee=config=>request._post(testAPI.EMPLOYEE_UPDATE,config)
export const deleteEmployeeById=config=>request._get(testAPI.EMPLOYEE_DELETE_BY_ID,config)