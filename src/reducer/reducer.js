import {combineReducers} from 'redux';
import {reducer as data} from './data/data';
import {reducer as show} from './show-films/show-films';
import {reducer as user} from './user/user';
import NameSpace from './name-space';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.SHOW]: show,
  [NameSpace.USER]: user,
});
