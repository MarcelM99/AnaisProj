import React from "react";
import { FlatList, View, Text } from "react-native";

interface IProps {
  items: any[];
}

const ContactsList = ({ items }: IProps) => {
  const renderData = ({ item }: any) => {
    return (
      <Text>
        {item.displayName ? item.displayName : item.familyName + item.givenName}
      </Text>
    );
  };
  return <FlatList data={items} renderItem={renderData} />;
};

export default ContactsList;
