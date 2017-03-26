import {
  FETCHING_SINGLE_DISC_START,
  FETCHING_SINGLE_DISC_END,
  FETCHING_SINGLE_DISC_SUCCESS,
  FETCHING_SINGLE_DISC_FAILURE,
  TOGGLE_FAVORITE_START,
  TOGGLE_FAVORITE_SUCCESS,
  TOGGLE_FAVORITE_FAILURE,
} from './constants';
import {
  fetchSingleDiscussion,
  fetchOpinions,
  toggleFavoriteApi,
} from './api';

export const getDiscussion = (discussionSlug) => {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_SINGLE_DISC_START });
    fetchSingleDiscussion(discussionSlug).then(
      data => dispatch({ type: FETCHING_SINGLE_DISC_SUCCESS, payload: data.data }),
      error => dispatch({ type: FETCHING_SINGLE_DISC_FAILURE })
    );
  };
};

export const toggleFavorite = (discussionId) => {
  return (dispatch, getState) => {
    dispatch({ type: TOGGLE_FAVORITE_START });

    toggleFavoriteApi(discussionId).then(
      data => {
        if (data.data._id) {
          dispatch({ type: TOGGLE_FAVORITE_SUCCESS });
          dispatch({ type: FETCHING_SINGLE_DISC_SUCCESS, payload: data.data });
        }
        else dispatch({ type: TOGGLE_FAVORITE_FAILURE });
      },
      error => dispatch({ type: TOGGLE_FAVORITE_FAILURE })
    );
  };
};
