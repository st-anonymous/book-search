import React, { useCallback, useEffect, useRef } from "react"
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { useRecoilValue } from "recoil"
import { BooksDetailsAtom } from "../../data/dataClusters"
import BookCard from "../micro/BookCard"

export type BooksDetailsType = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

export const BookScroll = () => {
  const booksDetails = useRecoilValue(BooksDetailsAtom);

  const flatListRef = useRef(null);

  const CallAPIAgain = () => {
    console.log('reaching end')
  }
  
  const ScrollToTop = () => {
    if(booksDetails.length) flatListRef.current.scrollToIndex({index: 0})
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