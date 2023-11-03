import { View } from "react-native"
import { SearchBar } from "../micro/SearchBar"
import { BookScroll } from "../macro/BookScroll"
import { AuthorModal } from "../macro/AuthorModal"

export const BookSearch = () => {

  return (
    <View>
      <SearchBar/>
      <BookScroll />
      <AuthorModal/>
    </View>
  )
}