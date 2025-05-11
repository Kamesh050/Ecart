import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {RootStackParamList} from '../navigation/AppNavigator';
import Barcode from 'react-native-barcode-svg';

const ProductCard = ({item}: {item: any}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fallbackImage = require('../assets/emptyProduct.png');

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {product: item})}
      style={styles.card}>
      <View style={styles.discountTag}>
        <Text style={styles.discountText}>{item.discount_percent}% OFF</Text>
      </View>
      <Image
        source={item?.images?.front ? {uri: item.images.front} : fallbackImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{item.name}</Text>
      {item.gtin && (
        <View style={styles.barcodeContainer}>
          <Barcode value={item.gtin} format="CODE128" />
        </View>
      )}
      <Text style={styles.category}>{item.main_category}</Text>

      <Text style={styles.prices}>
        ₹{item.discounted_price}{' '}
        <Text style={styles.originalPrice}>₹{item.original_price}</Text>
      </Text>

      {/* <View style={styles.actions}>
        {quantity > 0 ? (
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => setQuantity(q => q - 1)}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(q => q + 1)}>
              <Text style={styles.qtyBtn}>＋</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setQuantity(1)}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    elevation: 2,
  },
  discountTag: {
    backgroundColor: '#4CAF50',
    padding: 4,
    borderRadius: 4,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  image: {
    height: 80,
    width: '100%',
    marginVertical: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
  },
  category: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  prices: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 12,
    color: '#888',
  },
  actions: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  barcodeContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ProductCard;
