export const ADD_IMAGE = 'ADD_IMAGE'

export function addImage(imageObject) {
  return {
    type: ADD_IMAGE,
    imageObject: imageObject
  }
}
