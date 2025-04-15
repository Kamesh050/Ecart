import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {fetchApiResponse, Product} from '../../types/product.entities';
import {PRODUCT_SERVICE} from '../../service/api';
import {ApiResponse} from '../../types/common.entities';

type ProductRequest = {
  page: string;
  pageSize: string;
};

type DeleteProfileState = ApiResponse<Product>;

const initialState: DeleteProfileState = {
  data: undefined,
  error: undefined,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (payload: ProductRequest, thunkAPI) => {
    try {
      const response = await axios.post<fetchApiResponse>(
        PRODUCT_SERVICE.FEATCH_PRODUCTS,
        payload,
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({
        error: 'An unexpected error occurred',
      });
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoading = true;
        state.isError = false;

        state.error = undefined;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = undefined;

        if (Array.isArray(state.data)) {
          state.data = [...state.data, ...action.payload.products];
        } else {
          state.data = action.payload.products;
        }
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;

        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
