import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

export default StyleSheet.create({
  modalContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.black,
    fontFamily: 'Lexend-Regular',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#E8E8E9',
  },
  iconContainer: {
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.black,
    fontFamily: 'Lexend-Regular',
  },
});
