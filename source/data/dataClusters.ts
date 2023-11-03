import { atom } from "recoil";

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

export const BooksDetailsAtom = atom<BooksDetailsType[]>({
  key: 'BooksDetailsAtom',
  default: []
})

export const AuthorsDetailsAtom = atom<AuthorsDetailsType>({
  key: 'AuthorsDetailsAtom',
  default: {}
})