/* eslint-disable */
import axios from "axios";
import React, { useState } from "react"
import { View, TextInput, TouchableOpacity, Text, Keyboard } from "react-native"
import { useSetRecoilState } from "recoil";
import { BooksDetailsAtom } from "../../data/dataClusters";

export type BooksDetailsType = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isAPICalling, setIsAPICalling] = useState(true);
  const setBooksDetailsAtom = useSetRecoilState(BooksDetailsAtom)

  const onSearchChange = (val: string) => {
    val ? setIsAPICalling(false) : setIsAPICalling(true);
    setSearchText(val);
  }

  const onSearchClick = () => {
    Keyboard.dismiss();
    const search = searchText.replace(/ /g, '+')
    setIsAPICalling(true);
    console.log(`https://openlibrary.org/search.json?q=${search}`);
    axios.get(`https://openlibrary.org/search.json?q=${search}`)
      .then(res => {
        setIsAPICalling(false);
        const booksDocs = res.data.docs;
        // console.log(booksDocs, booksDocs.length);
        let booksDetails: BooksDetailsType[] = [];
        booksDocs.map((item: any) => {
          booksDetails.push({
            coverId: item.cover_i,
            title: item.title,
            authorName: item.author_name,
            authorId: item.author_key
          })
        })
        setBooksDetailsAtom(booksDetails);
      })
      .catch(err => {
        setIsAPICalling(false);
        console.log(err)
      })
  }

  const color = isAPICalling ? 'grey' : 'black';
  return(
    <View
      style={{
        flexDirection: 'row',
        margin: '2%',
        marginTop: '5%',
        justifyContent: 'center'
      }}
    >
      <TextInput 
      placeholder="search by author/book name" 
      value={searchText} 
      onChangeText={onSearchChange} 
        style={{
        color: color,
        borderWidth: 1, 
        borderColor: color, 
        width: '75%', 
        fontSize: 16, 
        lineHeight: 20, 
        padding: 12
      }}/>
      <TouchableOpacity onPress={isAPICalling ? () => {} : onSearchClick} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: color}}>
        <Text style={{lineHeight: 20, padding: 12, color: 'white'}}>Search</Text>
      </TouchableOpacity>
    </View>
  )
}