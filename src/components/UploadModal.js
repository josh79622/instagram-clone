import { useRef, useState } from "react"
import { modalState } from "atom/modalAtom"
import { useRecoilState } from "recoil"
import Modal from 'react-modal'
import { CameraIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
export default function UploadModal() {
  const [open, setOpen] = useRecoilState(modalState)
  const [selectedFile, setSelectedFile] = useState(null)
  const filePickerRef = useRef(null)

  function addImageToPost(event) {
    const reader = new FileReader()
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0])
    }
    reader.onloadend = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }
  return (
    <div>
      <Modal
        className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md outline-none focus:outline-none"
        isOpen={open}
        onRequestClose={() => {
          setOpen(false)
          setSelectedFile(null)
        }}
      >
        <div className="flex flex-col justify-center items-center h-[100%]">
          {selectedFile ?
            <div className="relative">
              <XMarkIcon
                onClick={() => setSelectedFile(null)}
                className="absolute h-7 bg-slate-500 text-white top-[-10px] right-[-10px] rounded-full cursor-pointer hover:scale-110 hover:brightness-110"
              />
              <img src={selectedFile} alt="post image" className="w-full max-h-[250px] object-contain"/>
            </div> : 
            <CameraIcon onClick={() => filePickerRef.current.click()} className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"/>
          }
          <input ref={filePickerRef} type="file" hidden onChange={addImageToPost}/>
          <input type="text" maxLength="150" placeholder="Please enter your caption."
           className="m-4 border-none text-center w-full focus:ring-0"/>
           <button disabled className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-110 disabled:bg-slate-200 disabled:cursor-not-allowed disabled:hover:brightness-100">Upload Post</button>
        </div>

      </Modal>
    </div>
  )
}
