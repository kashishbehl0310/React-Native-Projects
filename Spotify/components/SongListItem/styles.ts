import {
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75
  },
  artist: {
    color: "lightgray",
    fontSize: 16,
    marginTop: 5
  },
  title: {
    color: "white",
    fontSize: 20, 
  },
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10
  },
  rightContainer: {
    justifyContent: "center",
    marginLeft: 16
  }
});

export default styles;