import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, images} from '../constants/theme';

const CustomDrawerItem = props => {
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    insideContainer: {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: COLORS.secondary1,
      borderBottomWidth: 1,
      marginStart: 20,
      paddingVertical: 6,
      alignContent: 'center',
      alignItems: 'center',
    },
    label: {
      color: 'white',
      fontSize: 14,
      flex: 1,
    },
  });
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container,props.style]}>
      <Image
        style={{width: 20, height: 20, marginStart: 20, tintColor: 'white'}}
        source={props.image}
      />
      <View style={styles.insideContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <Image
          style={{
            width: 24,
            height: 24,
            tintColor: COLORS.secondary1,
            marginRight: 20,
            display: !props.showArrow ? 'none' : 'flex',
          }}
          source={images.arrow_next}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CustomDrawerItem;
