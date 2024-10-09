import { router } from 'expo-router';
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const PrivacyPolicyScreen = () => {

  const handleAgree = () => {
    router.replace("/home")
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      {/* Privacy Policy Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Introduction Section */}
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to our mobile application! We take your privacy seriously. This privacy policy outlines how we collect, use, and protect your information.
          </Text>

          {/* Data Collection Section */}
          <Text style={styles.sectionTitle}>Data Collection</Text>
          <Text style={styles.paragraph}>
            We may collect personal information such as your name, email address, and location when you use our app. We also gather non-personal data for analytics purposes to improve our services.
          </Text>

          {/* Data Usage Section */}
          <Text style={styles.sectionTitle}>How We Use Your Data</Text>
          <Text style={styles.paragraph}>
            We use the collected data to provide personalized services, enhance user experience, and analyze app performance. Your information will never be shared with third parties without your consent.
          </Text>

          {/* Security Section */}
          <Text style={styles.sectionTitle}>Security</Text>
          <Text style={styles.paragraph}>
            We prioritize the security of your data and employ industry-standard practices to protect it from unauthorized access or disclosure.
          </Text>

          {/* User Rights Section */}
          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, update, or delete your personal information. Please contact our support team if you have any privacy-related concerns.
          </Text>
        </View>
      </ScrollView>

      {/* Agree Button */}
      <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
        <Text style={styles.agreeButtonText}>I Agree</Text>
      </TouchableOpacity>
    </View>
  );
};

// Get screen dimensions for responsive design
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  contentContainer: {
    paddingBottom: 100, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  agreeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    width: "50%",
    alignSelf: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  agreeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PrivacyPolicyScreen;
