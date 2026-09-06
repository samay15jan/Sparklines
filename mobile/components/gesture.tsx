// TEMPORARY


import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

export default function App() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [gestureTriggered, setGestureTriggered] = useState(false);

  // Animated value for sliding down
  const slideAnim = useRef(new Animated.Value(-200)).current; // start off screen (top)

  useEffect(() => {
    if (searchVisible) {
      // Slide down
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      // Slide back up
      Animated.timing(slideAnim, {
        toValue: -200,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [searchVisible]);

  function triggerSearchMenu() {
    setGestureTriggered(true);
    setSearchVisible(true);
  }

  function resetGestureTrigger() {
    setGestureTriggered(false);
  }

  const gesture = Gesture.Pan()
    .minPointers(2)
    .onUpdate((event) => {
      if (event.translationY > 80 && !gestureTriggered) {
        runOnJS(triggerSearchMenu)();
      }
    })
    .onEnd(() => {
      runOnJS(resetGestureTrigger)();
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Swipe down with two fingers to open search menu
          </Text>

          <Modal
            transparent={true}
            visible={searchVisible}
            animationType="none" // we control animation ourselves
            onRequestClose={() => setSearchVisible(false)}
          >
            <Pressable
              style={styles.modalBackground}
              onPress={() => setSearchVisible(false)}
            >
              <Animated.View
                style={[
                  styles.searchPanel,
                  { transform: [{ translateY: slideAnim }] },
                ]}
              >
                <Text style={{ fontSize: 18, marginBottom: 20 }}>
                  🔍 Search Menu
                </Text>
                <Pressable onPress={() => setSearchVisible(false)}>
                  <Text style={{ color: 'blue' }}>Close</Text>
                </Pressable>
              </Animated.View>
            </Pressable>
          </Modal>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  searchPanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'white',
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
});
