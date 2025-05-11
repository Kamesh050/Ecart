import React, {ReactElement, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  KeyboardTypeOptions,
  Keyboard,
} from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import Colors from '../../theme/Colors';

type FloatingLabelTextInputProps = {
  label: string;
  text: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  error?: string;
  style?: ViewStyle;
  customShowPasswordComponent?: ReactElement;
  customHidePasswordComponent?: ReactElement;
  onFocus?: () => void;
  disable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  focused?: boolean;
  autoFocus?: boolean;
};

// molecules
const FloatingLabelTextInput = (props: FloatingLabelTextInputProps) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const {
    label,
    text,
    error,
    isPassword = false,
    customShowPasswordComponent,
    customHidePasswordComponent,
    onChangeText,
    keyboardType = 'default',
    focused = false,
    autoFocus = false,
  } = props;

  const customLabelStyles = {
    colorFocused: Colors.veryDarkGray,
    colorBlurred: Colors.veryDarkGray,
    fontSizeBlurred: 16,
    fontSizeFocused: 12,
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsFocus(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [isFocus]);

  return (
    <View
      style={[
        {...props.style},
        {
          borderRadius: 12,
          backgroundColor:
            error !== undefined ? Colors.lightGrayishRed : 'transparent',
        },
      ]}>
      <View
        style={{
          ...styles.container,
          borderColor: error !== undefined ? Colors.red : 'transparent',
          borderWidth: 1,
        }}>
        <FloatingLabelInput
          editable={props.disable !== true}
          isPassword={isPassword}
          containerStyles={{...styles.floatingInputContainer}}
          customLabelStyles={customLabelStyles}
          animationDuration={180}
          labelStyles={styles.floatingLabel}
          inputStyles={styles.floatingInput}
          label={label}
          value={text}
          isFocused={isFocus || focused}
          onFocus={() => {
            setIsFocus(true);
            props.onFocus?.();
          }}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          customShowPasswordComponent={customShowPasswordComponent}
          customHidePasswordComponent={customHidePasswordComponent}
          keyboardType={keyboardType}
          caretHidden={isFocus === true || autoFocus === true ? false : true}
          autoFocus={autoFocus}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.inputGray,
    borderRadius: 12,
    paddingLeft: 10,
    paddingRight: 18,
    paddingVertical: 2,
  },
  floatingInputContainer: {
    height: 58,
    padding: 0,
  },
  floatingLabel: {
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
  },
  floatingInput: {
    marginTop: 10,
    padding: 0,
    fontFamily: 'Lexend-Regular',
    fontSize: 16,
    color: Colors.black,
  },
});

export default FloatingLabelTextInput;
