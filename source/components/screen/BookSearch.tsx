import { View } from "react-native"
import { SearchBar } from "../micro/SearchBar"
import { BookScroll } from "../macro/BookScroll"

export const BookSearch = () => {

  return (
    <View>
      <SearchBar/>
      <BookScroll/>
    </View>
  )
}