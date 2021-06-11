/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import {icons, COLORS, SIZES, FONTS} from '../constants';

const Restaurant = ({route, navigation}) => {
  const [restaurant, setRestaurant] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const scrollX = new Animated.Value(0);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    let {item, currentLocation} = route.params;
    setRestaurant(item);
    setCurrentLocation(currentLocation);
  }, [route.params]);

  const editOrder = (action, menuId, price) => {
    let OrderList = orderItems.slice();
    let item = OrderList.filter((o) => o.menuId === menuId);
    if (action === '+') {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId,
          qty: 1,
          price,
          total: price,
        };
        OrderList.push(newItem);
      }
      setOrderItems(OrderList);
    } else {
      if (item.length > 0) {
        if (item[0].qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = item[0].qty * price;
        }
      }
      setOrderItems(OrderList);
    }
  };

  const getOrderQty = (menuId) => {
    let orderItem = orderItems.filter((o) => o.menuId === menuId);
    if (orderItem && orderItem.length > 0) {
      return orderItem[0].qty;
    }
    return 0;
  };

  const getTotalCartItems = () => {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);
    return itemCount;
  };

  const getTotalAmount = () => {
    let itemTotal = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    return itemTotal.toFixed(2);
  };

  const renderHeader = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}>
            <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            padding: SIZES.padding * 2,
            justifyContent: 'center',
          }}>
          <Image
            source={icons.list}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderFoodView = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}>
        {restaurant?.menu.map((item, index) => (
          <View key={`menu-${index}`} style={{alignItems: 'center'}}>
            <View style={{height: SIZES.height * 0.35}}>
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{width: SIZES.width, height: '100%'}}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  height: 50,
                }}>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => {
                    editOrder('-', item.menuId, item.price);
                  }}>
                  <Text style={{...FONTS.body1}}>-</Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.white,
                  }}>
                  <Text style={{...FONTS.h2}}>{getOrderQty(item.menuId)}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => {
                    editOrder('+', item.menuId, item.price);
                  }}>
                  <Text style={{...FONTS.body1}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: SIZES.width,
                alignItems: 'center',
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}>
              <Text
                style={{
                  marginVertical: 10,
                  textAlign: 'center',
                  ...FONTS.h2,
                }}>
                {item.name} - {item.price.toFixed(2)}
              </Text>
              <Text style={{...FONTS.body3}}>{item.description}</Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Image
                source={icons.fire}
                style={{width: 20, height: 20, marginRight: 10}}
              />
              <Text style={{...FONTS.body3, color: COLORS.darkgray}}>
                {item.calories.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View style={{height: 30}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: SIZES.padding,
          }}>
          {restaurant?.menu.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: 'clamp',
            });
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderOrder = () => {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray3,
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                ...FONTS.h3,
              }}>
              {getTotalCartItems()} Items in Cart
            </Text>
            <Text
              style={{
                ...FONTS.h3,
              }}>
              ${getTotalAmount()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.padding,
                  ...FONTS.h4,
                }}>
                Location
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                source={icons.master_card}
                resizeMode="contain"
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <Text
                style={{
                  marginLeft: SIZES.padding,
                  ...FONTS.h4,
                }}>
                4242
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                navigation.navigate('OrderDelivery', {
                  restaurant,
                  currentLocation,
                });
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                }}>
                Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: -34,
            height: 34,
            left: 0,
            right: 0,
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodView()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
});

export default Restaurant;
