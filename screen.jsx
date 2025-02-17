import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Bookings = () => {
  const navigation = useNavigation();
  const [bookedDays, setBookedDays] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const disablePastDays = (dateString) => dateString < today;

  const handleDayPress = (day) => {
    const { dateString } = day;
    if (disablePastDays(dateString)) {
      Alert.alert('Invalid Date', `You cannot book a slot for ${dateString}. Please select a future date.`);
    } else if (bookedDays[dateString]) {
      Alert.alert('Already Booked', `Slot for ${dateString} is already booked. Please select another day.`);
    } else {
      setBookedDays({ ...bookedDays, [dateString]: { selected: true, selectedColor: '#FF5252' } });
      Alert.alert('Booking Confirmed', `You have booked Slot 1 for ${dateString}.`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}></Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Select a Day to Book Drone Spraying</Text>

      <Calendar
        style={styles.cal}
        onDayPress={handleDayPress}
        markedDates={{
          ...bookedDays,
          ...Object.keys(bookedDays).reduce((acc, dateString) => {
            if (disablePastDays(dateString)) {
              acc[dateString] = { disabled: true, selectedColor: 'transparent' };
            }
            return acc;
          }, {}),
        }}
        theme={{
          selectedDayBackgroundColor: '#FF5252',
          todayTextColor: '#4CAF50',
          arrowColor: '#4CAF50',
          dayTextColor: '#333',
          textDayFontFamily: 'Arial',
          textMonthFontWeight: 'bold',
        }}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Selected dates are marked as booked slots. Past dates are disabled.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Want to book the slot')}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  cal: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FF5252',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Bookings;
