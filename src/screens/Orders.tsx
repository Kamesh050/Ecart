import React, {useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    try {
      const data = await AsyncStorage.getItem('orders');
      if (data) {
        setOrders(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, []),
  );

  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item: any) => item.orderNo}
          renderItem={({item}) => (
            <View style={styles.orderItem}>
              <Text style={styles.orderNo}>Order: {item.orderNo}</Text>
              <Text style={styles.orderAmount}>
                Total: ${item.totalAmount?.toFixed(2)}
              </Text>
              <Text style={styles.orderDate}>Date: {item.dateTime}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noOrdersText}>No Orders Yet</Text>
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
  orderItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
  orderNo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderAmount: {
    fontSize: 16,
    color: '#007bff',
  },
  orderDate: {
    fontSize: 14,
    color: '#555',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
    color: '#888',
  },
});
