import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold"
  },
  creatorContainer: {
    flexDirection: "row"
  },
  play: {},
  button: {
    backgroundColor: "#1cd05d",
    borderRadius: 50,
    height: 50,
    width: 175,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    alignItems: "center",
    padding: 20
  },
  creator: {
    color: "lightgrey",
    margin: 5,
    fontSize: 16
  },
  likes: {
    color: "lightgrey",
    margin: 5,
    fontSize: 16
  }
})

export default styles;