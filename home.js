import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  CommonActions
} from 'react-native';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addtocart, getproduct, removetocart, emptycart } from './redux/action';
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const handleLogout = async () => {
  try {
    
    await signOut(auth);

    await AsyncStorage.setItem("isLogged", "false");
    

    console.log("Logged out successfully");
  

  } catch (error) {
    console.error("Logout error:", error);
  }
  
};
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.cart);
  const items = useSelector((state: any) => state.product.product);
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header with Cart */}
      <View style={styles.header}>
        <Text style={styles.cartText}>🛒 Your Cart</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.cartList}>
            {cartItems.map((item: any) => (
              <View key={item.name} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.cartImage} />
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                <View style={styles.qtyControl}>
                  <Text style={styles.qtyLabel}>Qty:</Text>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.cartButton, styles.removeButton]}
                  onPress={() => dispatch(removetocart(item))}
                >
                  <Text style={styles.cartButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalPrice}>₹{totalPrice}</Text>
        </View>

        {/* Header Buttons */}
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => dispatch(getproduct())}
          >
            <Text style={styles.btnText}>Load Products</Text>
          </TouchableOpacity>
          <Button style={styles.btnText} title="Logout" onPress={ handleLogout} />
          <TouchableOpacity
            style={[styles.actionBtn, styles.emptyBtn]}
            onPress={() => dispatch(emptycart())}
          >
            <Text style={styles.btnText}>Empty Cart</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
      <ScrollView contentContainerStyle={styles.productList}>
        {items.map((item: any) => (
          <View key={item.name} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.cartButton, styles.addButton]}
                onPress={() => dispatch(addtocart(item))}
              >
                <Text style={styles.cartButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
       < View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      
      
    </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  header: {
    backgroundColor: '#4F46E5',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 5,
  },
  cartText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    alignSelf: 'center',
  },
  cartList: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 10,
  },
  cartItem: {
    backgroundColor: '#EEF2FF',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
    width: 100,
  },
  cartImage: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  cartItemName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#1E293B',
  },
  cartItemPrice: {
    fontSize: 12,
    color: '#10B981',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#6366F1',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  emptyBtn: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '45%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    height: 100,
    width: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: '#10B981',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  cartButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  addButton: {
    backgroundColor: '#22C55E',
  },
  removeButton: {
    backgroundColor: '#EF4444',
  },
  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  totalBox: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#E0E7FF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2563EB',
  },

  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginVertical: 6,
  },

  qtyLabel: {
    fontSize: 12,
    color: '#475569',
  },

  qtyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  }
});