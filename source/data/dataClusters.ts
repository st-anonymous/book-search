import { atom } from "recoil";

export type SearchDetailsType = {
  search: string,
  page: number,
}

export type BooksDetailsType = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

export type AuthorsDetailsType = {
  authorId: string
  authorName: string,
  DOB: string,
  workCount: number,
  topWork: string,
}

export const SearchDetailsAtom = atom<SearchDetailsType>({
  key: 'SearchDetailsAtom',
  default: {}
})

export const BooksDetailsAtom = atom<BooksDetailsType[]>({
  key: 'BooksDetailsAtom',
  default: []
})

export const AuthorsDetailsAtom = atom<AuthorsDetailsType>({
  key: 'AuthorsDetailsAtom',
  default: {}
})