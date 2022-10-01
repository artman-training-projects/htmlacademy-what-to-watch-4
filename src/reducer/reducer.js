import { combineReducers } from "redux";

import { reducer as data } from "./data/data";
import NameSpace from "./name-space";
import { reducer as show } from "./show-films/show-films";
import { reducer as user } from "./user/user";

export default combineReducers({
	[NameSpace.DATA]: data,
	[NameSpace.SHOW]: show,
	[NameSpace.USER]: user,
});
