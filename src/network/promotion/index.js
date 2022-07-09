import request from "@/network/request"

const testAPI = require("@/apis")

export const createPromotionStrategy = config => request._post(testAPI.CREATE_PROMOTION_STRATEGY, config)
export const findPromotionStrategyByTime = config => request._get(testAPI.FIND_PROMOTION_STRATEGY_BY_TIME, config)
