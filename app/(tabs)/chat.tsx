// ChatBot.js
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! My name is Eatup. Before we start, what is your name?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Eatup',
          avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
    handleBotResponse(messages);
  }, []);

  const handleBotResponse = (userMessage: any) => {
    const userText = userMessage[0].text.toLowerCase();
    let botMessage = '';

    if (userText.includes('basmati rice')) {
      botMessage = 'Yes, we have Basmati Rice and Pepper Chicken available!';
    } else if (userText.includes('order status')) {
      botMessage = 'Please provide your order ID, and I will check the status for you.';
    } else if (userText.includes('menu') || userText.includes('available')) {
      botMessage = 'Our menu includes various items like Biryani, Pasta, Burgers, and more. What would you like to order?';
    } else if (userText.includes('help')) {
      botMessage = 'Sure! How can I assist you today?';
    } else if (userText.includes('contact')) {
      botMessage = 'You can contact us at eatup@gmail.com or call us at +8801684321082.';
    } else {
      botMessage = `I can assist with that! How may I help you with "${userText}"?`;
    }

    setTimeout(() => {
      setMessages((prev: any) =>
        GiftedChat.append(prev, [
          {
            _id: Math.random().toString(),
            text: botMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Eatup',
              avatar: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA',
            },
          },
        ])
      );
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <MaterialIcons onPress={()=>router.push("/notifications")} name="notifications" size={24} color="black" />
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#ff3e3e',
              },
              left: {
                backgroundColor: '#f0f0f0',
              },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar {...props} containerStyle={styles.inputToolbar} />
        )}
        renderSend={props => (
          <Send {...props}>
            <TouchableOpacity
              onPress={() => {
                if (props.text && props.onSend) {
                  props.onSend({ text: props.text.trim() }, true);
                }
              }}
              style={styles.sendButton}
            >
              <Text style={{ color: 'red', fontWeight: 'bold', marginTop: -5 }}>Send</Text>
            </TouchableOpacity>
          </Send>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 5,
    paddingBottom: 5,
  },
  sendButton: {
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default Chat;
