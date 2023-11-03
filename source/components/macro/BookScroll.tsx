import React, { useCallback, useRef, useState } from "react"
import { FlatList, Image, TouchableOpacity, View } from "react-native"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { BooksDetailsAtom, SearchDetailsAtom } from "../../data/dataClusters"
import BookCard from "../micro/BookCard"
import axios from "axios"

export type BooksDetailsType = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

export const BookScroll = () => {
  const booksDetails = useRecoilValue(BooksDetailsAtom);
  const setBooksDetailsAtom = useSetRecoilState(BooksDetailsAtom);
  const [searchDetails, setSearchDetails] = useRecoilState(SearchDetailsAtom);

  const flatListRef = useRef(null);

  const CallAPIAgain = () => {
    axios.get(`https://openlibrary.org/search.json?q=${searchDetails.search}&page=${searchDetails.page+1}`)
      .then(res => {
        const booksDocs = res.data.docs;
        let booksDetails: BooksDetailsType[] = [];
        booksDocs.map((item: any) => {
          booksDetails.push({
            coverId: item.cover_i,
            title: item.title,
            authorName: item.author_name,
            authorId: item.author_key
          })
        })
        setBooksDetailsAtom(prev => {
          return [
            ...prev,
            ...booksDetails
          ]
        });
      })
      .catch(err => {
      })
    setSearchDetails(prev => {
      return {
        ...prev,
        page: searchDetails.page + 1
      }
    })
  }
  
  const ScrollToTop = () => {
    if(booksDetails.length) flatListRef?.current?.scrollToIndex({index: 0})
  }

  const RenderBooks = useCallback(({item}) => (
    <BookCard key={item.authorId} coverId={item.coverId} title={item.title} authorName={item.authorName} authorId={item.authorId} />
  ), [])

  return (
    <View
      style={{
        height: '90%'
      }}
    >
      <TouchableOpacity onPress={ScrollToTop} style={{ zIndex: 2, height: 30, width: 30, borderRadius: 15, backgroundColor: 'white', position: "absolute", bottom: 25, right: 25, alignItems: "center", justifyContent: "center"}} >
        <Image source={require('../../assets/upArrow.png')} style={{ height: 30, width: 30 }} />
      </TouchableOpacity>
      <FlatList ref={flatListRef} onEndReachedThreshold={2} onEndReached={CallAPIAgain} data={booksDetails} renderItem={RenderBooks} keyExtractor={(item, index) => index.toString()} numColumns={2} initialNumToRender={20} />
    </View>
  )
}