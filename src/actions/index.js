import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// GET POSTS
export const fetchPosts = () => async dispatch => {
  const response =  await  jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

// GET USER
export const fetchUser = id =>  dispatch => {
  _fetchUser(id, dispatch);
};
// memoize to call function only one time
const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
});
