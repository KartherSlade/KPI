import mocks from "./mocks";

const initialState = {
  currentUser: "1",
  searchPhrase: "",
  ...mocks,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_PHRASE":
      return {
        ...state,
        searchPhrase: action.payload,
      };
    case "CREATE_POST":
      const currentUserObj = state.users.find(
        (user) => user.id === state.currentUser
      );
      return {
        ...state,
        users: [
          ...state.users.filter((user) => user.id !== state.currentUser),
          {
            ...currentUserObj,
            posts: [...currentUserObj.posts, action.payload.id],
          },
        ],
        posts: [
          ...state.posts,
          { ...action.payload.data, author: state.currentUser },
        ],
      };
    case "ADD_COMMENT":
      const commentedPost = state.posts.find(
        (post) => action.payload.postId === post.id
      );
      return {
        ...state,
        posts: [
          ...state.posts.filter((post) => post.id !== action.payload.postId),
          {
            ...commentedPost,
            comments: [...commentedPost.comments, action.payload.data.id],
          },
        ],
        comments: [
          ...state.comments,
          {
            ...action.payload.data,
            author: state.currentUser,
          },
        ],
      };
    case "LIKE":
      const postToLike = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      return {
        ...state,
        posts: [
          ...state.posts.filter((post) => post.id !== action.payload.postId),
          {
            ...postToLike,
            likes: [...postToLike.likes, state.currentUser],
          },
        ],
      };
    case "REMOVE_LIKE":
      const postToDislike = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      return {
        ...state,
        posts: [
          ...state.posts.filter((post) => post.id !== action.payload.postId),
          {
            ...postToDislike,
            likes: postToDislike.likes.filter((id) => id !== state.currentUser),
          },
        ],
      };
    case "TOGGLE_FOLLOW":
      const userToToggle = state.users.find(
        (user) => user.id === action.payload.userId
      );
      const currentUser = state.users.find(
        (user) => user.id === state.currentUser
      );

      const doesCurrentUserFollowTarget = userToToggle.followers.includes(
        state.currentUser
      );

      return {
        ...state,
        users: [
          ...state.users.filter(
            (user) =>
              user.id !== action.payload.userId && user.id !== state.currentUser
          ),
          {
            ...userToToggle,
            followers: doesCurrentUserFollowTarget
              ? userToToggle.followers.filter((id) => id !== state.currentUser)
              : [...userToToggle.followers, currentUser],
          },
          {
            ...currentUser,
            following: doesCurrentUserFollowTarget
              ? currentUser.following.filter(id => id !== action.payload.userId)
              : [...currentUser.following, action.payload.userId],
          },
        ],
      };
    default:
      return state;
  }
};
