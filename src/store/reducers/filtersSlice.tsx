import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Props {
  document_name: string;
}

const initialState: Props = {
  document_name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    clearDataFilters: (state) => {
      state.document_name = "";
    },
    changeFiltersDocument: (state, action: PayloadAction<any>) => {
      state.document_name = action.payload.name;
    },
  },
});

export const { clearDataFilters, changeFiltersDocument } = filtersSlice.actions;
export default filtersSlice.reducer;