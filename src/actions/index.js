import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

// ALTERNATE WAY TO FETCH POSTS AND USERS
// Call 'fetchPosts'
// Get list of posts
// Find all unique userId's from list of posts
// Iterate over unique userId's
// Call 'fetchUser' with each userId

// getState is another argument from Redux Thunk
export const fetchPostsAndUsers = () => async (dispatch, getState) => {

  // we must use dispatch manually in order to call a function and
  // a function inside a function
    // use await keyword so that inner function will eventually gets called
    // essentially make sure these API requests to be completed before 
    // we move on and do anything in action creater

  await dispatch(fetchPosts());
  
  // utilizing lodash which has inner function .map 
    // to get just unique userId property which going to return an array
  const userIds = _.uniq(_.map(getState().posts, 'userId'));

  userIds.forEach(id => dispatch(fetchUser(id)));

  // console.log('fetched posts!', getState().posts);
  // console.log(userIds);
};

// GET POSTS
export const fetchPosts = () => async dispatch => {
  const response =  await  jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data })
};

// GET USER

// FIRST OPTION
// export const fetchUser = id =>  dispatch => _fetchUser(id, dispatch);
// // memoize to call function only one time
//   // the disadvantage is it wont work when we need to refetch the user with each unique id
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });

export const fetchUser = id =>  async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};
