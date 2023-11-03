import { Image, Modal, Text, View } from "react-native"
import { useRecoilValue } from "recoil"
import { AuthorsDetailsAtom } from "../../data/dataClusters"
import { useEffect, useState } from "react";

export const AuthorModal = () => {
  const authorsDetails = useRecoilValue(AuthorsDetailsAtom);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (Object.keys(authorsDetails).length) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [authorsDetails])

  useEffect(() => {
    console.log(isVisible, 'aarha');
  }, [isVisible])

  return (
    <Modal
      visible={isVisible}
      style={{
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 6,
          padding: 6
        }}
      >
        <Image source={{ uri: `https://covers.openlibrary.org/a/olid/OL229501A-L.jpg` }} style={{ height: 150, width: 100, resizeMode: 'cover' }} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {authorsDetails.authorName && <Text>{'Name: '+authorsDetails.authorName}</Text>}
          {authorsDetails.DOB && <Text>{'DOB: '+authorsDetails.DOB}</Text>}
          {authorsDetails.workCount && <Text>{'Work count: '+authorsDetails.workCount}</Text>}
          {authorsDetails.topWork && <Text>{'Top Work: '+authorsDetails.topWork}</Text>}
        </View>
      </View>
    </Modal>
  )
}