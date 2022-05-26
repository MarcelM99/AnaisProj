import React from "react";
import { FlatList, View, Text } from "react-native";
import { Contact } from "react-native-contacts";

interface IProps {
  items: Contact[];
}
interface ContactType {
  item: Contact;
}
const ContactsList = ({ items }: IProps) => {
  const renderData = ({ item }: ContactType) => {
    return (
      <Text>
        {item.displayName ? item.displayName : item.familyName + item.givenName}
      </Text>
    );
  };
  return <FlatList data={items} renderItem={renderData} />;
};

export default ContactsList;
