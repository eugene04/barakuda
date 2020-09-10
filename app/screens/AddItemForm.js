import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
export default function AddItemForm() {
  return (
    <View>
      <Formik
        initialValues={{ title: "", description: "", image: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(props) => (
          <View>
            <FormInput
              placeholder="title of item eg sumsung phone"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
            />
            <FormInput
              placeholder="description of item"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
            />
            <FormInput
              placeholder="image"
              onChangeText={props.handleChange("image")}
              value={props.values.image}
            />
            <FormButton />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({});
