import React, { useEffect, useState } from "react";
import {
  View, Text, Image, TouchableOpacity
} from "react-native";

import { Song } from "../../types";
import styles from "./styles";
import {
  AntDesign, FontAwesome, createIconSetFromFontello
} from "@expo/vector-icons";
import {
  Audio
} from "expo-av";
import { Sound } from "expo-av/build/Audio";

const song = {
  id: '1',
  imageUri: 'https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
  title: 'notJust Dev Beats',
  artist: 'Helen',
  uri: "Https://not-just-trash.s3-eu-west-1.amazonaws.com/WhatsApp+Audio+2020-09-22+at+14.20.25.mp4" 
};

const PlayerWidget = () => {
  const [playerSound, setSound] = useState<Sound|null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(null);
  const [position, setPosition] = useState(null);
  const onPlayBackStatusUpdate = (status: any) => {
    // console.log(status);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
    setIsPlaying(status.isPlaying);
  }
  const playSong = async () => {
    if (playerSound) {
      await playerSound.unloadAsync();
    }
    // const {
    //   sound
    // } = Sound.createAsync(
    //   { uri: song.uri },
    //   { shouldPlay: isPlaying },
    //   onPlayBackStatusUpdate
    // )
    const { sound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: isPlaying },
      onPlayBackStatusUpdate
    )
    setSound(sound);
  };
  useEffect(() => {
    playSong();
  }, []);

  const onPlayPausePress = async () => {
    if (!playerSound) {
      return;
    };
    if (isPlaying) {
      await playerSound.stopAsync();
    } else {
      await playerSound.playAsync();
    }
  }

  const getProgress = () => {
    if (playerSound === null || duration === null || position === null ) {
      return 0;
    }
    return (position / duration) * 100;
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.progress, { width: `${getProgress()}%` }]}
      />
      <View style={styles.row}>
      <Image
          style={styles.image}
          source={{ uri: song.imageUri }}
        />
        <View style={styles.rightContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>
          </View>
          <View style={styles.iconsContainer}>
            <AntDesign name="hearto" size={30} color="white" />
            <TouchableOpacity
              onPress={() => {
                onPlayPausePress();
              }}
            >
              <FontAwesome
                name={isPlaying ? "pause" : "play"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlayerWidget;