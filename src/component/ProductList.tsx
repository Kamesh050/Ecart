import React, {useEffect, useState} from 'react';
import {Text, FlatList, View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../redux/slices/productsSlice';
import {AppDispatch, RootState} from '../redux/store';
import ProductCard from './ProductCard';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {error, data, isLoading} = useSelector(
    (state: RootState) => state.products,
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({page: String(page), pageSize: '10'}));
  }, [dispatch, page]);

  if (error) return <Text>{error}</Text>;

  // if (isLoading && page === 1) {
  //   return (
  //     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  const modifiedData = Array.isArray(data)
    ? data.map(item => ({
        ...item,
        // gtin: item.gtin ?? 'default-gtin',
        images: {
          ...item.images,
          front: item.images?.front,
        },
        original_price: item.original_price ?? 100,
        discounted_price: item.discounted_price ?? 80,
        discount_percent:
          item.discount_percent ??
          Math.round(
            ((item.original_price ?? 100 - item.discounted_price ?? 80) /
              (item.original_price ?? 100)) *
              100,
          ),
      }))
    : [];

  const handleLoadMore = () => {
    if (!loadingMore && !isLoading) {
      setLoadingMore(true);
      setPage(prev => prev + 1);
      setTimeout(() => setLoadingMore(false), 1000);
    }
  };

  return (
    <FlatList
      data={modifiedData}
      keyExtractor={item => item.id}
      contentContainerStyle={{paddingHorizontal: 10}}
      renderItem={({item}) => (
        <View style={{flex: 1, margin: 5}}>
          <ProductCard item={item} />
        </View>
      )}
      numColumns={2}
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator size="small" style={{marginVertical: 16}} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ProductList;
