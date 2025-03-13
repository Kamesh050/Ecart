import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {checkout} from '../redux/slices/cartSlice';
import {addOrder} from '../redux/slices/ordersSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../redux/store';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const order = {
      orderNo: `ORD-${Date.now()}`,
      dateTime: new Date().toLocaleString(),
      totalAmount,
    };

    try {
      const existingOrders = await AsyncStorage.getItem('orders');
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      const updatedOrders = [...orders, order];
      await AsyncStorage.setItem('orders', JSON.stringify(updatedOrders));
      dispatch(addOrder(order));
      dispatch(checkout());
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <View style={styles.container}>
      {cart.length > 0 ? (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemText}>
                  {item.title} - {item.quantity || 1} x ${item.price}
                </Text>
              </View>
            )}
          />
          <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  cartItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    color: '#888',
  },
});
