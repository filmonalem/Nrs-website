export const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false;
  state.hasMessage = null;
};

export const handleFulfilled = (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.hasMessage = action.payload.message || null;
  state.pagination = action.payload.pagination || null;
};

export const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.hasMessage = action.payload;
};
