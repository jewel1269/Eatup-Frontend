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

  // Search query state
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
          containerStyle={styles.checkBox}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with Logo and Filter Button */}
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/Logo/logo1.png-removebg-preview.png")}
        />
        <Text style={styles.headerText}>Meal Menu</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search meals..."
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
          <Text style={styles.modalHeader}>Filter Options</Text>

          {/* Filter options */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Choose Meal</Text>
              <View style={styles.checkboxContainer}>
                <CheckBox
                  title="Breakfast"
                  checked={mechanical}
                  onPress={() => setMechanical(!mechanical)}
                  containerStyle={styles.checkBox}
                />
                <CheckBox
                  title="Lunch"
                  checked={structure}
                  onPress={() => setStructure(!structure)}
                  containerStyle={styles.checkBox}
                />
                <CheckBox
                  title="Dinner"
                  checked={equipment}
                  onPress={() => setEquipment(!equipment)}
                  containerStyle={styles.checkBox}
                />
                <CheckBox
                  title="Special Offer"
                  checked={electric}
                  onPress={() => setElectric(!electric)}
                  containerStyle={styles.checkBox}
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
              <Text style={styles.sectionTitle}>Price Priority</Text>
              <View style={styles.priorityContainer}>
                {["High Price", "Medium Price", "Low Price"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setPriority(level)}
                    style={[
                      styles.priorityOption,
                      priority === level && styles.selectedPriority,
                    ]}
                  >
                    <Text style={styles.priorityText}>{level}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Location */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              <Text style={styles.locationText}>{location}</Text>
            </View>

            {/* Status Checkboxes */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Meal Type</Text>
              {renderStatusOptions()}
            </View>
          </ScrollView>

          <Button title="Show Results" onPress={toggleModal} color="#007BFF" />
        </View>
      </Modal>

      {/* Pass the searchQuery as a prop to MenuMeal */}
      <ScrollView>
        <MenuMeal searchQuery={searchQuery} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 37,
    marginLeft:10
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  filterButton: {
    padding: 8,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 7,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  checkBox: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  toggleText: {
    fontSize: 16,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  priorityOption: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  selectedPriority: {
    backgroundColor: "#007BFF",
  },
  priorityText: {
    color: "#333",
    fontSize: 16,
  },
  locationText: {
    fontSize: 16,
    color: "#666",
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default FilterModal;
