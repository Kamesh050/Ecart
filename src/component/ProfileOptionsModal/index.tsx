import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import GenericModal from '../GenericModal';
import styles from './styles';

type ProfileOptionsModalProps = {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onUploadPhoto: () => void;
  onRemovePhoto?: () => void;
  hasProfilePhoto?: boolean;
};

const ProfileOptionsModal = ({
  visible,
  onClose,
  onTakePhoto,
  onUploadPhoto,
  onRemovePhoto,
  hasProfilePhoto = false,
}: ProfileOptionsModalProps) => {
  return (
    <GenericModal
      visible={visible}
      onClose={onClose}
      style={styles.modalContainer}>
      <>
        <View style={styles.header}>
          <Text style={styles.headerText}>Options</Text>
        </View>
        <ScrollView>
          <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
            <Text style={styles.optionText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={onUploadPhoto}>
            <Text style={styles.optionText}>Upload Photo</Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    </GenericModal>
  );
};

export default ProfileOptionsModal;
