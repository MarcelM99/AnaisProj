import React, { useEffect, useState } from "react";
import {
  Platform,
  PermissionsAndroid,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";
import Contacts from "react-native-contacts";
import ContactsList from "../components/ContactsList";

const ContactsScreen = () => {
  const [contactsData, setContactsData] = useState([]);
  useEffect(() => {
    if (Platform.OS === "android")
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
        buttonPositive: "Please accept bare mortal",
      }).then(() => Contacts.getAll().then((res: any) => setContactsData(res)));
    else
      Contacts.checkPermission().then((permission) => {
        if (permission === "undefined") {
          Contacts.requestPermission().then((permission) => {
            if (permission === "authorized") {
              Contacts.getAll().then((res: any) => setContactsData(res));
            }
            if (permission === "denied") {
              console.log("App needs acces to your contacts");
            }
          });
        }
        if (permission === "authorized") {
          Contacts.getAll().then((res: any) => setContactsData(res));
        }
        if (permission === "denied") {
          console.log("App needs acces to your contacts");
        }
      });
  }, []);

  if (contactsData.length > 0)
    return (
      <View style={styles.topView}>
        <ContactsList items={contactsData} />
      </View>
    );
  else
    return (
      <View>
        <Text>Loading Contacts</Text>
      </View>
    );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  topView: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
