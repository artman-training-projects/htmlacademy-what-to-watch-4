import {combineReducers} from 'redux';
import {reducer as data} from './data/data.js';
import {reducer as show} from './show-films/show-films.js';
import {reducer as app} from './app/app.js';
import NameSpace from './name-space.js';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.SHOW]: show,
  [NameSpace.APP]: app,
});
