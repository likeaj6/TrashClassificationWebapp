export const ADD_IMAGE = 'ADD_IMAGE'
export const SET_COUNT = 'INCREMENT_COUNT'

export function addImage(imageObject) {
  return {
    type: ADD_IMAGE,
    imageObject: imageObject
  }
}

export function setDataCount(dataCount) {
  return {
    type: SET_COUNT,
    dataCount: dataCount
  }
}
