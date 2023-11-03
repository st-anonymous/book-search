import React, { useCallback, useRef, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BooksDetailsAtom, SearchDetailsAtom } from "../../data/dataClusters";
import BookCard from "../micro/BookCard";
import axios from "axios";
import { LoadingModal } from "./LoadingModal";

export type BooksDetailsType = {
  coverId: string;
  title: string;
  authorName: string[];
  authorId: string[];
};

export const BookScroll = () => {
  const booksDetails = useRecoilValue(BooksDetailsAtom);
  const setBooksDetailsAtom = useSetRecoilState(BooksDetailsAtom);
  const [searchDetailsAtom, setSearchDetailsAtom] = useRecoilState(
    SearchDetailsAtom
  );

  const flatListRef = useRef(null);

  const CallAPIAgain = () => {
    setSearchDetailsAtom((prev) => {
      return {
        ...prev,
        isSearching: true,
      };
    });
    axios
      .get(
        `https://openlibrary.org/search.json?q=${
          searchDetailsAtom.search
        }&page=${searchDetailsAtom.page + 1}`
      )
      .then((res) => {
        setSearchDetailsAtom((prev) => {
          return {
            ...prev,
            isSearching: false,
          };
        });
        const booksDocs = res.data.docs;
        let booksDetails: BooksDetailsType[] = [];
        booksDocs.map((item: any) => {
          booksDetails.push({
            coverId: item.cover_i,
            title: item.title,
            authorName: item.author_name,
            authorId: item.author_key,
          });
        });
        setBooksDetailsAtom((prev) => {
          return [...prev, ...booksDetails];
        });
      })
      .catch((err) => {
        setSearchDetailsAtom((prev) => {
          return {
            ...prev,
            isSearching: false,
          };
        });
      });
    setSearchDetailsAtom((prev) => {
      return {
        ...prev,
        page: searchDetailsAtom.page + 1,
      };
    });
  };

  const ScrollToTop = () => {
    if (booksDetails.length) flatListRef?.current?.scrollToIndex({ index: 0 });
  };

  const RenderBooks = useCallback(
    ({ item }) => (
      <BookCard
        key={item.authorId}
        coverId={item.coverId}
        title={item.title}
        authorName={item.authorName}
        authorId={item.authorId}
      />
    ),
    []
  );

  return (
    <View
      style={{
        height: "90%",
      }}
    >
      <TouchableOpacity
        onPress={ScrollToTop}
        style={{
          zIndex: 2,
          height: 30,
          width: 30,
          borderRadius: 15,
          backgroundColor: "white",
          position: "absolute",
          bottom: 25,
          right: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/upArrow.png")}
          style={{ height: 30, width: 30 }}
        />
      </TouchableOpacity>
      {searchDetailsAtom.isSearching === false && booksDetails.length === 0 && <Text style={{fontSize: 24, margin: 16}} >No Results Found</Text>}
      {searchDetailsAtom.isSearching === undefined && booksDetails.length === 0 && <Text style={{fontSize: 24, margin: 16}} >Search to see relevant Books...</Text>}
      <FlatList
        ref={flatListRef}
        onEndReachedThreshold={2}
        onEndReached={CallAPIAgain}
        data={booksDetails}
        renderItem={RenderBooks}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        initialNumToRender={20}
      />
      <LoadingModal/>
    </View>
  );
};
