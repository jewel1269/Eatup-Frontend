import { auth } from "@/components/AllComponent/Firebase/Firebase";
import useAuth from "@/components/AllComponent/useAuth/useAuth";
import { Feather, Ionicons } from "@expo/vector-icons";
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

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    setSearchQuery("");
  };

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
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Feather name="search" size={24} color="white" />
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

      <ScrollView style={{
        paddingHorizontal:10
      }}>
        {/* Email Section */}
        <TouchableOpacity style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </TouchableOpacity>

        {/* About You */}
        <TouchableOpacity onPress={handleProfile} style={styles.row}>
          <Text style={styles.label}>About You</Text>
          <Ionicons name="person-outline" size={20} color="black" />
        </TouchableOpacity>

        {/* Privacy Policy */}
        <TouchableOpacity onPress={() => router.push("/privacy")} style={styles.row}>
          <Text style={styles.label}>Privacy Policy</Text>
          <Ionicons name="shield-outline" size={20} color="black" />
        </TouchableOpacity>

        {/* Notifications */}
        <TouchableOpacity onPress={() => router.replace("/notifications")} style={styles.row}>
          <Text style={styles.label}>Notifications</Text>
          <Ionicons name="notifications-outline" size={20} color="black" />
        </TouchableOpacity>

        {/* Profile Visibility */}
        <TouchableOpacity onPress={() => router.push("/allOrder")} style={styles.row}>
          <Text style={styles.label}>All Orders</Text>
          <Ionicons name="list-outline" size={20} color="black" />
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
          <View style={styles.logoutButtonStyle}>
            <Button onPress={confirmLogOut} color={"gray"} title="Log Out" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff", 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#007bff", 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop:10
  },
  searchInput: {
    height: 40,
    borderColor: "#007bff", 
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: "#e6f0ff", 
  },
  row: {
    flexDirection: "row",
    borderColor: "#007bff", 
    borderWidth: 1,
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",

    marginVertical: 5, 
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
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
    borderTopColor: "#f4f4f4",
  },
  logoutButtonStyle: {
    borderRadius: 20,
    overflow: "hidden", 
    backgroundColor: "#ff4d4d", 
    width: "80%", 
    alignSelf: "center", 
  },
});

export default SettingsScreen;
