import React from "react";
import { View, Text, FlatList } from "react-native";

import {
  Album
} from "../../types";
import styles from "./styles";
import AlbumComponent from "../Album";

export type AlbumCategoriesProps = {
  title: string,
  album: any
}

const AlbumCategories = (props: AlbumCategoriesProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {props.title}
      </Text>
      <FlatList
        data={props.album}
        renderItem={({ item }) => <AlbumComponent album={item} />}
        keyExtractor={( item ) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
};

export default AlbumCategories;