import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
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
import useAuth from "../useAuth/useAuth";

const ProfileUpdateScreen = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useAuth();
  const email = user?.email;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:5000/users/users?email=${email}`
        );

        if (response && response.data) {
          console.log("User data:", response.data);
          setUserData(response.data);
          setName(response.data.name);
          setPhoneNumber(response.data.phoneNumber);
          setAddress(response.data.address);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [email]);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const response = await axios.patch(
        `http://10.0.2.2:5000/users/update/${userData?._id}`,
        {
          name,
          phoneNumber,
          address,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
        router.replace("/profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      ToastAndroid.show(
        "Failed to update profile. Please try again.",
        ToastAndroid.SHORT
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setPassword(showPassword ? password : "********"); 
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/free-photo/gray-abstract-wireframe-technology-background_53876-101941.jpg?w=1380&t=st=1728042509~exp=1728043109~hmac=8c773387bdfeaa53afabb786db0f02a5c2f594c7979833ce871e2077eb5ab9e9",
      }}
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
          <TouchableOpacity style={styles.settingsIcon}>
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
        <Text style={styles.nameText}>{userData?.name}</Text>
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
          value={userData?.email}
          placeholder="Email"
          keyboardType="email-address"
          editable={false} 
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
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />

        {/* Password */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Password"
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.showHideText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
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
    shadowColor: "black",
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
