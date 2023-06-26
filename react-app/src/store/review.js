const GET_REVIEW = 'reviews/GET_REVIEW';
const GET_ALL_CHAPTER_REVIEWS = 'reviews/GET_ALL_CHAPTER_REVIEWS';
const POST_REVIEW = 'reviews/POST_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

export const getReview = review => ({
  type: GET_REVIEW,
  review
});

export const getAllReviews = reviews => ({
  type: GET_ALL_CHAPTER_REVIEWS,
  reviews
});

export const postReview = review => ({
  type: POST_REVIEW,
  review
});

export const editReview = review => ({
  type: EDIT_REVIEW,
  review
});

export const deleteReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId
});

export const fetchSingleReview = reviewId => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`);
  if (res.ok) {
    const review = await res.json();
    dispatch(getReview(review));
  }
};

export const fetchAllChapterReviews = chapterId => async dispatch => {
  const res = await fetch(`/api/reviews/chapter/${chapterId}`);
  if (res.ok) {
    const reviews = await res.json();
    dispatch(getAllReviews(reviews));
  }
};

export const fetchPostReview = (reviewData) => async dispatch => {
  const res = await fetch('/api/reviews/new', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData)
  });
  if (res.ok) {
    const newReview = await res.json();
    dispatch(postReview(newReview));
    return newReview.id;
  }
};

export const fetchPutReview = (review) => async dispatch => {
  const res = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(editReview(updatedReview));
    return updatedReview;
  }
};

export const fetchDeleteReview = reviewId => async dispatch => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
};

export const initialState = {
  singleReview: {},
  allReviews: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_REVIEW: {
      return {
        ...state,
        allReviews: { ...state.allReviews },
        singleReview: { ...action.review }
      };
    }
    case GET_ALL_CHAPTER_REVIEWS: {
      return {
        ...state,
        allReviews: action.reviews,
        singleReview: { ...state.singleReview }
      };
    }
    case POST_REVIEW: {
      const reviews = {...state.allReviews}
      reviews[action.review.id] = action.review
      return {
        ...state,
        allReviews: { ...reviews },
        singleReview: action.review
      };
    }
    case EDIT_REVIEW: {
        state.allReviews[action.review.id] = action.review
      return {
        ...state,
        allReviews: { ...state.allReviews },
        singleReview: action.review
      };
    }
    case DELETE_REVIEW: {
      const newState = {
        ...state,
        allReviews: { ...state.allReviews },
        singleReview: { ...state.singleReview }
      };
      delete newState.allReviews[action.reviewId];
      return newState;
    }
    default:
      return { ...state };
  }
}
