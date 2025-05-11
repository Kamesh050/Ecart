import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RootStackParamList} from '../navigation/AppNavigator';
import type {RouteProp} from '@react-navigation/native';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
const {width} = Dimensions.get('window');

const ProductDetails = () => {
  const route = useRoute<ProductDetailsRouteProp>();
  const navigation = useNavigation();
  const {product} = route?.params;

  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => setQuantity(q => q + 1);
  const handleRemove = () => setQuantity(q => (q > 0 ? q - 1 : 0));

  const goToCart = () => {
    navigation.navigate('Cart', {selectedProduct: {...product, quantity}});
  };
  const totalPrice = (product?.discounted_price * quantity).toFixed(2);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {product?.discount_percentage && (
          <View style={styles.discountTag}>
            <Text style={styles.discountText}>
              {product?.discount_percentage ?? 50}% OFF
            </Text>
          </View>
        )}
        <Image
          source={
            product?.images?.front
              ? {uri: product?.images.front}
              : require('../assets/emptyProduct.png')
          }
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.name}>{product?.name}</Text>
      <Text style={styles.category}>{product?.main_category}</Text>

      <View style={styles.rowBetween}>
        <View style={styles.kgTag}>
          <Text style={styles.kgText}>1 kg</Text>
        </View>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.discountedPrice}>
          ₹{quantity > 0 ? totalPrice : product?.discounted_price}
        </Text>
        <Text style={styles.originalPrice}>₹{product?.original_price}</Text>
      </View>

      {quantity === 0 ? (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyControls}>
          <TouchableOpacity onPress={handleRemove}>
            <Icon name="remove" size={22} color="#d32f2f" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{quantity}</Text>
          <TouchableOpacity onPress={handleAdd}>
            <Icon name="add" size={22} color="#388e3c" />
          </TouchableOpacity>
        </View>
      )}

      {quantity > 0 && (
        <TouchableOpacity style={styles.cartButton} onPress={goToCart}>
          <Text style={styles.cartButtonText}>Go to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    width: width - 40,
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  discountTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#d32f2f',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  kgTag: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
  },
  kgText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    color: '#888',
  },
  addButton: {
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    marginTop: 10,
    width: '100%',
  },
  addText: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#d32f2f',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    gap: 16,
    marginTop: 10,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  cartButton: {
    marginTop: 120,
    backgroundColor: '#388e3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
