import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { SRLWrapper } from "simple-react-lightbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import useUploadReview from '../hooks/useUploadReview';


const FolderImageGrid = ({ query }) => {
  const { UploadReview } = useUploadReview()
  const [showreview, setShowReview] = useState(false)
  const [allimages, setAllimages] = useState([]);
  const [likedimages, setlikedImages] = useState([]);
  const [dislikedimages, setdislikedImages] = useState([]);
  const [btntext, setBtntext] = useState("Create review album");

  const handleReview  =  () => {
    setBtntext("Go to profile to view new album")
    //uploads new album to db and sends user to profilepage
      UploadReview({
      folderimages: likedimages,
    })
  }

  const handleLike = (folderimage) => {

    const imgliked = likedimages.filter(img => img.path == folderimage.path)
    const imgdisliked = dislikedimages.filter(img => img.path == folderimage.path)
    // if this image exists in liked or unliked imagelist, return
    if (imgliked.length || imgdisliked.length) {
      //if the image already exist in likedmages: return
      return
    }
    else {
      folderimage.className = "likedstyle"
      likedimages.push(folderimage)
      setAllimages(likedimages.length + dislikedimages.length)
    }

  }

  const handleDisLike = (folderimage) => {

    const imgliked = likedimages.filter(img => img.path == folderimage.path)
    const imgdisliked = dislikedimages.filter(img => img.path == folderimage.path)
    // if this image exists in liked or unliked imagelist, return
    if (imgliked.length || imgdisliked.length) {
      return
    }
    else {
      folderimage.className = "dislikedstyle"
      dislikedimages.push(folderimage)
      setAllimages(likedimages.length + dislikedimages.length)
    }

  }
  const handleUndo = (folderimage) => {
    const newliked = likedimages.filter(img => img.path !== folderimage.path)
    //filter every image that does not have the same path as clicked image in liked images
    const newdisliked = dislikedimages.filter(img => img.path !== folderimage.path)
    //filter every image that does not have the same path as clicked image in disliked images
    if (newliked.length) {
      setlikedImages(newliked)
      //set likeimage array to array without the selected image
    }
    if (newdisliked.length)

    {
      setdislikedImages(newdisliked)
    }

    const likedimgtodelete = likedimages.filter(img => img.path == folderimage.path)
    const dislikedimgtodelete = likedimages.filter(img => img.path == folderimage.path)
    //filter out selected image and delete it from array
    const likeindex = likedimages.indexOf(likedimgtodelete)
    const dislikeindex = likedimages.indexOf(dislikedimgtodelete)
    likedimages.splice(likeindex, 1)
    likedimages.splice(dislikeindex, 1)
    folderimage.className = "neutralstyle"
    setAllimages(likedimages.length + dislikedimages.length)
  }

  return (
    <Container>
      <SRLWrapper>
        <div className="text-center"> <h1>Images</h1></div>
     <Button type="submit" onClick={() =>setShowReview(!showreview)}><h2>Review Album</h2></Button>
        <div className="img-grid">
          {query.data && query.data.map((image) => image.folderImages.map((folderimage) =>

            <div className={folderimage.className ? folderimage.className : "img-wrap"} key={folderimage._id}>
            
              <>  <img src={folderimage.url} alt="uploaded image" />

                {showreview &&
                  <div className="rewiew-btns">
                    <FontAwesomeIcon className="like-btn" onClick={() => { handleUndo(folderimage) }} icon={faTrashAlt} />
                    <FontAwesomeIcon className="like-btn" onClick={() => { handleLike(folderimage) }} icon={faThumbsUp} />
                    <FontAwesomeIcon className="dislike-btn" onClick={() => { handleDisLike(folderimage) }} icon={faThumbsDown} />
                  </div>
                }
              </>
            </div>
          ))}

        </div>
      </SRLWrapper>

      {showreview && <> <h3>{allimages <= 0 ? "0" : allimages} / {query.data ? query.data[0].folderImages.length : "0"} </h3>
        <Button type="submit"  onClick={() => { handleReview() }}><h2>{btntext}</h2></Button></>}
 
    </Container>
  )
}

export default FolderImageGrid;