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
    Sanwich: false,
    Pizza: true,
    Fruits: false,
    Chiken: false,
    Medicine: false,
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query:any) => {
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
         <View style={{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center",
            paddingHorizontal:10,
            marginTop:4
         }}>
            <Image style={{
                height:50,
                width:80,
                marginLeft:-5,
                marginTop:5
            }} source={require('../../../assets/images/Logo/logo1.png-removebg-preview.png')}/>
            <Text style={{fontSize:20, fontWeight:"bold", marginTop:6}}>Meal Menu </Text>
            <View style={{
                backgroundColor: "green",
                padding:8,
                borderRadius:10
            }}>
                <TouchableOpacity>
                    <Text style={{color:"white"}} onPress={toggleModal} >
                      Filter
                    </Text>
                </TouchableOpacity>
            
            </View>
         </View>

      <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
    </View>

      <ScrollView>
        <View style={styles.container}>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            style={styles.modal}
            swipeDirection={["down"]}
            onSwipeComplete={toggleModal}
            backdropOpacity={0.5}
          >
            <View style={styles.modalContent}>
              <Text style={styles.header}>Filter</Text>

              <View style={styles.filterSection}>
                <Text>Choose Meal</Text>
                <View style={styles.checkboxContainer}>
                  <CheckBox
                    title="Breackfast"
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

              <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                marginBottom: 10
              }}>
                <Text style={{fontSize:18, fontWeight:"bold"}}>Show my work orders</Text>
                <Switch
                  value={showFavorites}
                  onValueChange={() => setShowFavorites(!showFavorites)}
                />
              </View>

              <View style={styles.filterSection}>
                <Text style={{fontWeight:"bold"}}>Priority</Text>
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

              <View style={styles.filterSection}>
                <Text style={{fontWeight:"bold"}}>Location</Text>
                <Text>{location}</Text>
              </View>

              <View style={styles.filterSection}>
                <Text>Status</Text>
                {renderStatusOptions()}
              </View>

              <Button title="Show Results" onPress={toggleModal} />
            </View>
          </Modal>
        </View>
      </ScrollView>


      <View>
        <Text>
            Hello Bhai
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input: {
    height: 40,
    paddingLeft: 10,
    backgroundColor: '#fff', 
    borderRadius: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
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
  priorityContainer: {
    flexDirection: "row",
    marginLeft:-10
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
