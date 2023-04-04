import { BlockedDay } from "../../models/blockedDay";
import { BlockedDaysAction } from "../actions/actionCreator";
import actionTypes from "../actions/actionTypes";

const blockedDaysReducer = (
  blockedDays: Array<BlockedDay> = [],
  action: BlockedDaysAction
): Array<BlockedDay> => {
  let newBlockedDays;
  switch (action.type) {
    case actionTypes.getBlockedDays:
      newBlockedDays = [...action.blockedDays];
      break;
    default:
      newBlockedDays = blockedDays;
  }
  return newBlockedDays;
};

export default blockedDaysReducer;
