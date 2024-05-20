export type ModalTypes = {
  img: {
    regular:string, 
    alt_description:string, 
    likes:number
  },
  closeModal:()=>void,
  modalIsOpen:boolean
}