import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Alert, Image } from "react-native";
import { Formik } from "formik";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { Button, Menu, Divider } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import firebase from "../utils/Firebase";
import "firebase/firestore";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const { width, height } = Dimensions.get("screen");

export default function AddItemForm() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const closeMenu = () => setVisible(false);
  function openMenu() {
    return setVisible(true);
  }
  const db = firebase.firestore();

  //set value of categoty input from Menu
  const handleSelection = (value) => {
    setCategory(value);
    setVisible(false);
  };
  //submit values from form to firebase database
  function submitForm(values) {
    db.collection("item").add({
      values,
      category: category,
      image: selectedImage,
    });
    setSelectedImage(null);
  }
  //pick an image and add it to form for submission
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("permission to access camera roll is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };
  let pic;
  if (selectedImage !== null) {
    pic = (
      <Image
        source={{ uri: selectedImage.localUri }}
        style={styles.thumbnail}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Button onPress={openMenu}>touch me to select category</Button>}
      >
        <Menu.Item
          onPress={() => {
            handleSelection("clothing");
          }}
          title="clothing"
        />
        <Menu.Item
          onPress={() => {
            handleSelection("food");
          }}
          title="food"
        />
        <Menu.Item
          onPress={() => {
            handleSelection("furniture");
          }}
          title="furniture"
        />
        <Menu.Item
          onPress={() => {
            handleSelection("vehicles and spares");
          }}
          title="vehicles and spares"
        />
      </Menu>
      <Text> {category} </Text>
      <Formik
        initialValues={{ description: "", price: "" }}
        onSubmit={(values, actions) => {
          submitForm(values);
          actions.resetForm();
          setCategory("");
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <FormInput
              placeholder="description of item"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />
            <FormInput
              placeholder="price"
              onChangeText={props.handleChange("price")}
              value={props.values.price}
              keyboardType="numeric"
            />
            <FormButton
              mode="contained"
              onPress={openImagePickerAsync}
              title="pick an image"
            />
            {pic}
            <FormButton
              mode="contained"
              onPress={props.handleSubmit}
              title="add item"
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  category: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1,
    height: height / 15,
    fontWeight: "bold",
  },
  thumbnail: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  container: {
    padding: 20,
  },
});
