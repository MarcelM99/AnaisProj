import React, { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, View, Text } from "react-native";
import Contacts, { Contact } from "react-native-contacts";

import ContactsList from "../components/ContactsList";
import { styles } from "./styles/contactsScreenStyles";

const ContactsScreen = () => {
  const [contactsData, setContactsData] = useState<Contact[]>([]);
  const checkForUsersPermissions = () => {
    if (Platform.OS === "android")
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: "Contacts",
        message: "This app would like to view your contacts.",
        buttonPositive: "Please accept bare mortal",
      }).then(() =>
        Contacts.getAll().then((res: Contact[]) => setContactsData(res))
      );
    else
      Contacts.checkPermission().then((permission) => {
        if (permission === "undefined") {
          Contacts.requestPermission().then((permission) => {
            if (permission === "authorized") {
              Contacts.getAll().then((res: Contact[]) => setContactsData(res));
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
  };
  useEffect(() => {
    checkForUsersPermissions();
  }, []);

  if (contactsData.length === 0)
    return (
      <View>
        <Text>Loading Contacts</Text>
      </View>
    );

  return (
    <View style={styles.topView}>
      <ContactsList items={contactsData} />
    </View>
  );
};

export default ContactsScreen;
