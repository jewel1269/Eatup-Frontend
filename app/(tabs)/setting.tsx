import { auth } from "@/components/AllComponent/Firebase/Firebase";
import useAuth from "@/components/AllComponent/useAuth/useAuth";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  Alert,
  Button, 
} from "react-native";

const SettingsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isSearching, setIsSearching] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleBack = () => {
    router.back();
  };

  // Handle search icon click
  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchQuery(""); 
  };

  // Function to confirm log out
  const confirmLogOut = () => {
    Alert.alert(
      "Log Out", 
      "Are you sure you want to log out?", 
      [
        {
          text: "Cancel",
          onPress: () => console.log("Log out cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: handleLogOut, 
        },
      ],
      { cancelable: false }
    );
  };

  // Actual logout function
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        ToastAndroid.show("Successfully logged out", ToastAndroid.SHORT);
        router.replace("/signIn");
      })
      .catch((error) => {
        console.error("Logout error:", error.message);
        ToastAndroid.show(`Logout failed: ${error.message}`, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      {isSearching && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search settings..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      <ScrollView>
        {/* Email Section */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </TouchableOpacity>

        {/* About You */}
        <TouchableOpacity onPress={handleProfile} style={styles.row}>
          <Text style={styles.label}>About You</Text>
          <FontAwesome name="location-arrow" size={20} color="black" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity onPress={()=>router.push("/privacy")} style={styles.row}>
          <Text style={styles.label}>Privacy Policy</Text>
          <FontAwesome name="location-arrow" size={20} color="black" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity onPress={()=>router.replace("/notifications")} style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <FontAwesome name="location-arrow" size={20} color="black" />
        </TouchableOpacity>

        {/* Profile Visibility */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Profile Visibility</Text>
          <FontAwesome name="location-arrow" size={20} color="black" />
        </TouchableOpacity>

        {/* Blocked Users */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Blocked Users</Text>
          <FontAwesome name="location-arrow" size={20} color="black" />
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton}>
            <View style={{
                borderRadius:20,
                width:120,
            }}>
            <Button onPress={confirmLogOut} color={"#ff4d4d"}  title="Log Out"/>
            </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  label: {
    fontSize: 16,
  },
  email: {
    fontSize: 16,
    color: "#007bff",
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    borderTopWidth: 1,
    borderRadius:10,
    borderTopColor: "#f4f4f4",
  },
  logoutText: {
    fontSize: 16,
    color: "red",
  },
});

export default SettingsScreen;
