import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  View,
} from 'react-native';
import Colors from '../../theme/Colors';

type PrimaryButtonProps = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  // leftImage?: React.FC<SvgProps>;
  disable?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  icon?: React.ReactNode;
};

// molecules
const PrimaryButton = (props: PrimaryButtonProps) => {
  const onPressHandler = () => {
    if (props.disable === true || props.isLoading === true) return;
    props.onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {opacity: props.disable ? 0.3 : 1},
        {...props.style},
      ]}
      onPress={onPressHandler}>
      {/* {LeftImage && <LeftImage style={styles.leftImage} />} */}
      {props.icon && <View style={styles.leftImage}>{props.icon}</View>}
      <Text
        style={[
          styles.text,
          {color: props.disable ? Colors.white : Colors.veryPaleBlue},
          {...props.textStyle},
        ]}>
        {props.title}
      </Text>
      {props.isLoading && (
        <ActivityIndicator
          style={{marginLeft: 10}}
          size={Platform.OS === 'android' ? 25 : 10}
          color={Colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
  },
  leftImage: {marginRight: 10},
});

export default PrimaryButton;
