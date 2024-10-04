import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { CheckBox } from "react-native-elements";
import MenuMeal from "../MenuMeal/MenuMeal";

const FilterModal = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mechanical, setMechanical] = useState(true);
  const [structure, setStructure] = useState(false);
  const [equipment, setEquipment] = useState(false);
  const [electric, setElectric] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [priority, setPriority] = useState("High");
  const [location, setLocation] = useState("Uttara-10, Dhaka, BD");
  const [status, setStatus] = useState<any>({
    Burger: true,
    Sandwich: false,
    Pizza: true,
    Fruits: false,
    Chicken: false,
    Medicine: false,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderStatusOptions = () => (
    <View style={styles.statusContainer}>
      {Object.keys(status).map((key) => (
        <CheckBox
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)}
          checked={status[key]}
          onPress={() => setStatus({ ...status, [key]: !status[key] })}
        />
      ))}
    </View>
  );

  return (
    <View>
      <View>
        {/* Header with Logo and Filter Button */}
        <View style={styles.headerContainer}>
          <Image
            style={styles.logo}
            source={require("../../../assets/images/Logo/logo1.png-removebg-preview.png")}
          />
          <Text style={styles.headerText}>Meal Menu</Text>
          <View style={styles.filterButtonContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Filter Modal */}
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          style={styles.modal}
          swipeDirection={["down"]}
          onSwipeComplete={toggleModal}
          backdropOpacity={0.5}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Filter</Text>

            {/* Meal Type Checkboxes */}
        <ScrollView>
        <View style={styles.filterSection}>
              <Text>Choose Meal</Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  title="Breakfast"
                  checked={mechanical}
                  onPress={() => setMechanical(!mechanical)}
                />
                <CheckBox
                  title="Lunch"
                  checked={structure}
                  onPress={() => setStructure(!structure)}
                />
                <CheckBox
                  title="Dinner"
                  checked={equipment}
                  onPress={() => setEquipment(!equipment)}
                />
                <CheckBox
                  title="Special Offer"
                  checked={electric}
                  onPress={() => setElectric(!electric)}
                />
              </View>
            </View>

            {/* Show Favorites Toggle */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>Show my favorite orders</Text>
              <Switch
                value={showFavorites}
                onValueChange={() => setShowFavorites(!showFavorites)}
              />
            </View>

            {/* Price Priority */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Priority</Text>
              <View style={styles.priorityContainer}>
                {["High Price", "Medium Price", "Low Price"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setPriority(level)}
                  >
                    <Text
                      style={
                        priority === level
                          ? styles.selectedPriority
                          : styles.priority
                      }
                    >
                      {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text>{location}</Text>
            </View>

            {/* Status Checkboxes */}
            <View style={styles.filterSection}>
              <Text>Status</Text>
              {renderStatusOptions()}
            </View>

        </ScrollView>
            <Button title="Show Results" onPress={toggleModal} />
          </View>
        </Modal>

        {/* MenuMeal Component */}
        <ScrollView>
          <MenuMeal />
        </ScrollView>
      </View>
      <Text>Hello</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  logo: {
    height: 50,
    width: 80,
    marginLeft: -5,
    marginTop: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
  filterButtonContainer: {
    backgroundColor: "green",
    padding: 8,
    borderRadius: 10,
  },
  filterButtonText: {
    color: "white",
  },
  sectionTitle: {},
  searchContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input: {
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "80%", // Make the modal cover half the screen
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  toggleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priorityContainer: {
    flexDirection: "row",
    marginLeft: -10,
  },
  priority: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  selectedPriority: {
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#007bff",
    color: "white",
  },
  statusContainer: {
    flexDirection: "column",
  },
});

export default FilterModal;
