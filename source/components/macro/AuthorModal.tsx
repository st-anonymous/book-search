import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { AuthorsDetailsAtom } from "../../data/dataClusters";
import { useEffect, useState } from "react";

export const AuthorModal = () => {
  const [authorsDetails, setAuthorsDetails] = useRecoilState(
    AuthorsDetailsAtom
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (Object.keys(authorsDetails).length) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [authorsDetails]);

  const OnClosingModal = () => {
    setAuthorsDetails({});
    setIsVisible(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal visible={isVisible} transparent={true} onDismiss={OnClosingModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: 'lightgrey',
              borderRadius: 15,
              padding: 6
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: `https://covers.openlibrary.org/a/olid/${authorsDetails.authorId}-L.jpg`,
                }}
                style={{ height: 150, width: 100, resizeMode: "cover" }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  width: "60%",
                }}
              >
                {authorsDetails.authorName && (
                  <Text style={{fontSize: 16}} >{"Name: " + authorsDetails.authorName}</Text>
                )}
                {authorsDetails.DOB && (
                  <Text style={{fontSize: 16}} >{"DOB: " + authorsDetails.DOB}</Text>
                )}
                {authorsDetails.workCount && (
                  <Text style={{fontSize: 16}} >{"Work count: " + authorsDetails.workCount}</Text>
                )}
                {authorsDetails.topWork && (
                  <Text style={{fontSize: 16}} >{"Top Work: " + authorsDetails.topWork}</Text>
                )}
              </View>
            </View>
            <TouchableOpacity
              onPress={OnClosingModal}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
