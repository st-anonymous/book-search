import { atom } from "recoil";

export type BooksDetailsType = {
  coverId: string,
  title: string,
  authorName: string[],
  authorId: string[]
}

export const BooksDetailsAtom = atom<BooksDetailsType[]>({
  key: 'BooksDetailsAtom',
  default: []
})