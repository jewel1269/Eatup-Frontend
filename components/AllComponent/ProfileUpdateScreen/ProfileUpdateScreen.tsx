import { Entypo } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  ImageBackground,
} from "react-native";

const ProfileUpdateScreen = () => {
  const [name, setName] = useState("Jewel Mia");
  const [email, setEmail] = useState("kim.jennie@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("+6281234567890");
  const [website, setWebsite] = useState("Uttara-10, Dhaka, BD");
  const [password, setPassword] = useState("********");
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
      router.replace("/profile");
    }, 3000);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?w=1380&t=st=1728042509~exp=1728043109~hmac=8c773387bdfeaa53afabb786db0f02a5c2f594c7979833ce871e2077eb5ab9e9",
      }} // Replace with your animation background image URL
      style={styles.container}
    >
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Entypo onPress={handleBack} name="back" size={24} color="black" />
            <Text style={styles.profileTitle}>Update</Text>
          </View>
          {/* Settings Icon (can be clickable) */}
          <TouchableOpacity  style={styles.settingsIcon}>
           <Link href={"/setting"}>
           <Text style={styles.settingsText}>⚙</Text>
           </Link>
          </TouchableOpacity>
        </View>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png",
            }}
            style={styles.profileImage}
          />
        </View>

        {/* Name */}
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.subtitleText}>Engineer</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />

        {/* Phone Number Input */}
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />

        {/* Address Input */}
        <TextInput
          style={styles.input}
          value={website}
          onChangeText={setWebsite}
          placeholder="Address"
        />

        {/* Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TouchableOpacity>
            <Text style={styles.showHideText}>👁️</Text>
          </TouchableOpacity>
        </View>

        {/* Circular Update Button with Loading Animation */}
        <View style={styles.loadingWrapper}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#6200ee"
              style={styles.loadingIndicator}
            />
          )}
          <TouchableOpacity
            style={[styles.updateButton, loading && { opacity: 0.7 }]}
            onPress={handleUpdate}
            disabled={loading}
          >
            <Text style={styles.updateButtonText}>
              {loading ? "Updating..." : "Update"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    height: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsIcon: {
    padding: 5,
  },
  settingsText: {
    fontSize: 24,
    color: "red",
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  nameText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitleText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 10,
    elevation: 5,
  },
  showHideText: {
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#888",
  },
  loadingWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  updateButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    shadowColor: "back",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  loadingIndicator: {
    position: "absolute",
    zIndex: 1,
  },
});

export default ProfileUpdateScreen;
