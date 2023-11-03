import React from "react";
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { BookSearch } from "./source/components/screen/BookSearch";
import { RecoilRoot } from "recoil";

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <RecoilRoot>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          hidden={true}
        />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <BookSearch />
        </View>
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
