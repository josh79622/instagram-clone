import { useMemo, useRef, useState } from "react"
import { modalState } from "atom/modalAtom"
import { useRecoilState } from "recoil"
import Modal from 'react-modal'
import { CameraIcon } from "@heroicons/react/24/outline"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db, storage } from "../../firebase"
import { useSession } from "next-auth/react"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import ImageSlider from './ImageSlider';

export default function UploadModal() {
  const { data: session } = useSession()
  const [open, setOpen] = useRecoilState(modalState)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)
  const captionRef = useRef(null)
  const anyImageSelected = selectedFiles && selectedFiles.length > 0

  const items = selectedFiles ? selectedFiles.map((image, index) => ({
    src: image,
    alt: `upload image_${index + 1}`
  })) : []

  function addImageToPost(event) {
    if (event.target.files[0]) {
      for(let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[index])
        reader.onloadend = (readerEvent) => {
          setSelectedFiles(selectedFiles => [...(selectedFiles || []), readerEvent.target.result])
        }
      }
    }
    
  }
  async function uploadPost (event) {
    if (loading) return;
    setLoading(true)
    const docRef = await addDoc(collection(db, "posts"), {
      caption: captionRef.current.value,
      username: session?.user?.username || "Anonymous",
      profileImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    for (let selectedFile of selectedFiles) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef)
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        })
      })
    }
    
    setOpen(false)
    setLoading(false)
  }
  function deleteOneImage(index) {
    setSelectedFiles(selectedFiles => [...selectedFiles.slice(0, index),...selectedFiles.slice(index + 1)])
  }
  return (
    <div>
      <Modal
        className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md outline-none focus:outline-none"
        style={{
          overlay: {
            zIndex: 1000,
          },
        }}
        isOpen={open}
        onRequestClose={() => {
          setOpen(false)
          setSelectedFiles([])
        }}
      >
        <div className="flex flex-col justify-center items-center h-[100%]">
          {anyImageSelected ?
            <div className="relative w-full">
              {anyImageSelected && 
                <ImageSlider items={items} onDelete={deleteOneImage} imageClassName="w-full max-h-[250px] object-contain"/>
              }
              
              {/* <img src={selectedFile} alt="post image" className="w-full max-h-[250px] object-contain"/> */}
            </div> : 
            <CameraIcon onClick={() => filePickerRef.current.click()} className="cursor-pointer h-14 bg-red-200 p-2 rounded-full border-2 text-red-500"/>
          }
          <input ref={filePickerRef} multiple type="file" hidden onChange={addImageToPost}/>
          <input
            ref={captionRef}
            type="text" 
            maxLength="150" 
            placeholder="Please enter your caption."
            className="m-4 border-none text-center w-full focus:ring-0"
          />
           <button
            disabled={!anyImageSelected || loading}
            onClick={uploadPost}
            className="w-full bg-red-600 text-white p-2 shadow-md hover:brightness-110 disabled:bg-slate-200 disabled:cursor-not-allowed disabled:hover:brightness-100">Upload Post</button>
        </div>

      </Modal>
    </div>
  )
}
