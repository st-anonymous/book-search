/* eslint-disable */
import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { useSetRecoilState } from "recoil"
import { AuthorsDetailsAtom } from "../../data/dataClusters"
import axios from "axios"

export type BookCardProps = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

const BookCard = (props: BookCardProps) => {
  const { coverId, title, authorName, authorId } = props;
  const setAuthorsDetailsAtom = useSetRecoilState(AuthorsDetailsAtom)

  const onSelectAuthor = (index: number) => {
    const author_id = authorId[index];
    axios.get(`https://openlibrary.org/authors/${author_id}.json`)
      .then(res => {
        const authorDocs = res.data;
        setAuthorsDetailsAtom({
          authorId: authorDocs.key.substring(9),
          authorName: authorDocs.name,
          DOB: authorDocs.birth_date,
          workCount: authorDocs.work_count,
          topWork: authorDocs.top_work,
        });
      })
      .catch(err => {
      })
  }
  
  return (
    <View
      style={{ width: '50%', padding: 10, alignItems: 'center' }}
    >
      <Image source={{ uri: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` }} alt={`Image of ${title}`} style={{ height: 150, width: 100, resizeMode: 'center' }} />
      {title &&
          <Text style={{ fontSize: 16, textAlign: 'center' }} >{title.length > 40 ? title.substring(0, 35) + '...' : title}</Text>
      }
      {authorName &&
        authorName.map((author, index) => {
          return (
            < TouchableOpacity key={author + index} onPress={() => onSelectAuthor(index)}>
              <Text style={{ fontSize: 12, textAlign: 'center' }} >{author+' ⓘ'}</Text>
            </ TouchableOpacity>
          )
        })
      }
    </View>
  )
}

export default React.memo(BookCard);