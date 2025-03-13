import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../redux/slices/productsSlice';
import {addToCart} from '../redux/slices/cartSlice';
import {RootState} from '../redux/store';

export default function Product() {
  const dispatch = useDispatch();
  const {products, categories} = useSelector(
    (state: RootState) => state.products,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filteredProducts = products.filter(
    p => !selectedCategory || p.category === selectedCategory,
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}>
            <Text style={styles.categoryText}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      />

      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          renderItem={({item}: any) => (
            <View style={styles.productCard}>
              <Image
                source={{uri: item.thumbnail}}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => dispatch(addToCart(item))}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noProductsText}>No Products Found</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginRight: 10,
    marginVertical: 10,
  },
  selectedCategory: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  productCard: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#28a745',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#ff5733',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: '#888',
  },
});
