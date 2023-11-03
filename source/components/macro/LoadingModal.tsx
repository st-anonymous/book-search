import { useEffect, useState } from "react";
import { View, Modal, Image, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRecoilValue } from "recoil";
import { SearchDetailsAtom } from "../../data/dataClusters";

export const LoadingModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const searchDetailsAtom = useRecoilValue(SearchDetailsAtom)

  useEffect(() => {
    if (searchDetailsAtom.isSearching) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [searchDetailsAtom.isSearching])
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal visible={isVisible} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="black" />
        </View>
      </Modal>
    </View>
  );
}