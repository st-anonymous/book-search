/* eslint-disable */
import React, { useEffect } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"

export type BookCardProps = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

const BookCard = (props: BookCardProps) => {
  const { coverId, title, authorName, authorId } = props;

  const onSelectAuthor = (index: number) => {
    console.log(authorId[index]);
  }
  
  return (
    <View
      style={{ width: '50%', padding: 10, alignItems: 'center' }}
    >
      <Image source={{ uri: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` }} alt={`Image of ${title}`} style={{ height: 150, width: 100, resizeMode: 'center' }} />
      {title &&
        <TouchableOpacity>
          <Text style={{ fontSize: 16, textAlign: 'center' }} >{title.length > 40 ? title.substring(0, 35) + '...' : title}</Text>
        </TouchableOpacity>
      }
      {authorName &&
        authorName.map((author, index) => {
          return (
            < TouchableOpacity onPress={() => onSelectAuthor(index)}>
              <Text style={{ fontSize: 12, textAlign: 'center' }} >{author}</Text>
            </ TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default React.memo(BookCard);