import {
  StyleSheet
} from "react-native";

import colors from "../../constants/Colors";

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75, 
    marginRight: 10
  },
  artist: {
    color: "lightgray",
    fontSize: 16,
    marginTop: 5
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    margin: 10 
  },
  container: {
    position: "absolute",
    bottom: 79,
    backgroundColor: "#131313",
    width: "100%",
    borderWidth: 2,
    borderColor: "black",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 100,
    justifyContent: "space-around"
  },
  rightContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between"
  },
  progress: {
    height: 4,
    backgroundColor: "#bcbcbc"
  },
  row: {
    flexDirection: "row"
  }
});

export default styles;