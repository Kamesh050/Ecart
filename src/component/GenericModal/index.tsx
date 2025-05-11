import React, {ReactNode} from 'react';
import {View, Modal, ViewStyle} from 'react-native';
import styles from './style';
type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: ViewStyle;
};

const GenericModal = (props: ModalProps) => {
  return (
    <Modal
      visible={props.visible}
      onRequestClose={props.onClose}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      hardwareAccelerated={true}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, {...props.style}]}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
