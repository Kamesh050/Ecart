/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Product from '../screens/product';
import Cart from '../screens/Cart';
import Orders from '../screens/Orders';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="Products"
          component={Product}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-bag" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" color={color} size={size} />
            ),
            tabBarBadge: cart.length > 0 ? cart.length : null,
          }}
        />
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="history" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
