import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Product, ProductsResponse} from '../../types/product.entities';
import {PRODUCT_SERVICE} from '../../service/api';

export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async () => {
    const response = await axios.get<ProductsResponse>(
      PRODUCT_SERVICE.FEATCH_PRODUCTS,
    );
    return response.data.products;
  },
);

interface ProductsState {
  products: Product[];
  categories: string[];
}

const initialState: ProductsState = {
  products: [],
  categories: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.categories = [
        ...new Set(action.payload.map((item: any) => item.category)),
      ];
    });
  },
});

export default productsSlice.reducer;
