import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offset: 0,
  limit: 20,
  fields: `{id,authors,title}`,
  baseURL: `api/feed/audiobooks/`,
  booklist: [],
};

const handleUpdatedData = (state, action) => {
  state.booklist = action.payload.newBookList;
};

const handleSearchSubmit = (state, action) => {
  const { searchQuery, searchBy } = action.payload;
  let newUrl = `api/feed/audiobooks/${searchBy}`;
  if (searchBy === "title") newUrl += `/%5E${searchQuery}`;
  else newUrl += `/${searchQuery}`;
  state.baseURL = newUrl;
  state.offset = 0;
};

const handleResetData = (state, action) => {
  state.baseURL = "api/feed/audiobooks/";
  state.offset = 0;
  state.booklist = [];
};

const handlePaginationData = (state, action) => {
  console.log(action.payload.newBookList, "in slice");
  state.booklist = state.booklist.concat(action.payload.newBookList);
  state.offset += 1;
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    handleSearch: handleSearchSubmit,
    handleUpdate: handleUpdatedData,
    handlePagination: handlePaginationData,
    handleReset: handleResetData,
  },
});

export const { handleSearch, handleUpdate, handlePagination, handleReset } =
  booksSlice.actions;

export default booksSlice.reducer;
