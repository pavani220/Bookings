import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const responses = {
  hi: 'Hello, Welcome to Vurimi AI Global Services, how can I help you today?',
  hello: 'Hello, Welcome to Vurimi AI Global Services, how can I help you today?',
  issue: 'Sorry for the inconvenience, please call the customer care number.',
  problem: 'Sorry for the inconvenience, please call the customer-care number.',
  complaint: 'Sorry for the inconvenience, please call the customer-care number.',
  help: 'Sorry for the inconvenience, please call the customer care number.',
  location: 'Vurimi AI Main Branch is located in Nellore, Andhra Pradesh, India.',
  address: 'Vurimi AI Main Branch is located in Nellore, Andhra Pradesh, India.',
  situated: 'Vurimi AI Main Branch is located in Nellore, Andhra Pradesh, India.',
  less: 'We can’t provide service for less than 5 hectare land for far locations. For support please contact customer care.',
  spraying: 'We offer various spraying services, including pesticides and fertilizers. Want to book a slot?',
  cost: 'The cost of our drone spraying services varies based on the area and type of service. Please provide more details for a quote.',
  agriculture: 'You selected Agriculture. What service do you need?',
  drone: 'You have selected drone. What services do you need?',
  modernFarming: 'You have selected Modern Farming. What services do you need?',
  organicFarming: 'You have selected organic farming. What services do you need?',
  soilTesting: 'Soil testing helps understand soil quality and nutrient levels. Would you like to proceed with soil testing?',
  buybackservices: 'Would you like more information?',
  agriAdvisory: 'Agri-advisory helps farmers with better farming practices. Would you like to know more information?',
  contactFarming: 'Contact farming helps farmers get access to contracts for better yield and pricing. Would you like to know more?',
  default: 'I am sorry, I do not understand your question. Can you please rephrase?? or you can connect with our customer-care through the number',
  pesticide: 'We have many variants in pesticides branded by IFFCO',
  fertilizers: 'We have many variants in Fertilizers branded by IFFCO',
  nutrients: 'We have many variants in Nutrients branded by IFFCO',
  sales: 'We sell the agriculture drones. For more.. ',
  services: 'We provide various services like soil testing, Drone spraying, Drone selling',
  parts: 'We sell various drone spare parts. Want to know more information?',
};

const Bot = () => {
  const navigation = useNavigation(); // Navigation hook
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const generateUniqueId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const botMessage = { id: generateUniqueId(), text: responses.hi, sender: 'bot', options: ['Agriculture', 'Drone', 'Organic Farming', 'Modern Farming'] };
    setMessages([botMessage]);
  }, []);

  const handleSend = (text) => {
    if (text.trim()) {
      const userMessage = { id: generateUniqueId(), text, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      respondToUser(text);
    }
  };

  const respondToUser = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    let botResponse = responses.default;
    let options = [];

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      botResponse = responses.hello;
      options = ['Agriculture', 'Drone', 'Organic Farming', 'Modern Farming'];
    } else if (lowerInput.includes('agriculture')) {
      botResponse = responses.agriculture;
      options = ['Soil Testing', 'Buy Back Services', 'Agri Advisory', 'Contact Farming'];
    } else if (lowerInput.includes('drone')) {
      botResponse = responses.drone;
      options = ['Spraying', 'Sales', 'Services', 'Spare Parts'];
    } else if (lowerInput.includes('organic farming')) {
      botResponse = responses.organicFarming;
      options = ['Pesticides', 'Fertilizers', 'Nutrients'];
    } else if (lowerInput.includes('modern farming')) {
      botResponse = responses.modernFarming;
      options = ['Pesticides', 'Fertilizers', 'Nutrients'];
    } else if (lowerInput.includes('soil testing')) {
      botResponse = responses.soilTesting;
      options = ['Book Now2'];
    } else if (lowerInput.includes('buy back services')) {
      botResponse = responses.buybackservices;
      options = ['View More'];
    } else if (lowerInput.includes('agri advisory')) {
      botResponse = responses.agriAdvisory;
      options = ['View More'];
    } else if (lowerInput.includes('contact farming')) {
      botResponse = responses.contactFarming;
      options = ['View More'];
    } else if (lowerInput.includes('issue')) {
      botResponse = responses.issue;
    } else if (lowerInput.includes('pesticides')) {
      botResponse = responses.pesticide;
      options = ['View Pesticides'];
    } else if (lowerInput.includes('fertilizers')) {
      botResponse = responses.fertilizers;
      options = ['View Fertilizers'];
    } else if (lowerInput.includes('nutrients')) {
      botResponse = responses.nutrients;
      options = ['View Nutrients'];
    } else if (lowerInput.includes('spraying')) {
      botResponse = responses.spraying;
      options = ['Book Now1']; // Book Now button for Spraying
    } else if (lowerInput.includes('sales')) {
      botResponse = responses.sales;
      options = ['Book Now'];
    } else if (lowerInput.includes('services')) {
      botResponse = responses.services;
      options = ['Book Now3'];
    } else if (lowerInput.includes('spare parts')) {
      botResponse = responses.parts;
      options = ['Book Now'];
    } else if (lowerInput.includes('help')) {
      botResponse = responses.help;
    }

    const botMessage = { id: generateUniqueId(), text: botResponse, sender: 'bot', options };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleOptionClick = (option) => {
    // Check if option is 'Book Now' and navigate to the Bookings screen
    if (option === 'Book Now1') {
      navigation.navigate('Bookings'); // Navigate to the Bookings screen
    } if (option==='Book Now2'){
      navigation.navigate('Soil');
    }
    else {
      handleSend(option); // Handle other options (e.g., Agriculture, Drone)
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={32} color="Black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Bot</Text>
      </View>
      <Image source={require('../assets/vurimi_ai.png')} style={styles.backgroundImage} />
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View>
            <View style={item.sender === 'user' ? styles.userMessage : styles.botMessageContainer}>
              {item.sender === 'bot' && (
                <View style={styles.botIconContainer}>
                  <MaterialCommunityIcons name="robot-outline" size={24} color="#000" style={styles.botIcon} />
                </View>
              )}
              <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            </View>
            {item.options?.length > 0 && (
              <View style={styles.optionsContainer}>
                {item.options.map((option) => (
                  <TouchableOpacity key={option} style={styles.optionButton} onPress={() => handleOptionClick(option)}>
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity onPress={() => handleSend(input)} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Bot;

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
  },
  headerTitle:{
    fontsize:18,
    fontWeight:'bold',
    marginLeft:10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  backgroundImage: {
    position: 'absolute',
    width: 380,
    height: 300,
    opacity: 1,
    alignSelf: 'center',
    top: '30%',
  },
  messageList: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7dd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 5,
    maxWidth: '80%',
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  botIconContainer: {
    marginRight: 10,
    borderRadius: 12,
    backgroundColor: '#f8d7da',
    padding: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f8d7da',
    borderRadius: 28,
    maxWidth: '80%',
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  messageText: {
    fontSize: 16,
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 5,
    backgroundColor: 'white',
    marginLeft: 70,
    marginRight: 50,
  },
  optionButton: {
    backgroundColor: '#1bbc',
    borderRadius: 10,
    padding: 8,
    marginRight: 5,
  },
  optionText: {
    color: 'white',
    fontSize:16,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
  },
});
