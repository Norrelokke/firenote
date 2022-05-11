import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { SRLWrapper } from "simple-react-lightbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import useUploadReview from '../hooks/useUploadReview';
import { Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const FolderImageGrid = ({ query }) => {
  // grid that generates images inside of folders
  const params = useParams();
  const navigate = useNavigate();
  const { UploadReview } = useUploadReview()
  const [showreview, setShowReview] = useState(false)
  const [allimages, setAllimages] = useState([]);
  const [likedimages, setlikedImages] = useState([]);
  const [dislikedimages, setdislikedImages] = useState([]);
  const [undoneimages, setUbdoneImages] = useState([]);
  const [btntext, setBtntext] = useState("Create review album");
  const [message, setMessage] = useState(null)

  const handleReview = () => {
    //if all images has been reviewed, change buttontext
    if (allimages == query.data[0].folderImages.length) {
      setBtntext("Thank you for the review")
      UploadReview({
        owner: params.userid,
        folderimages: likedimages,
      })
    }
    else {
      setMessage("Please review all images before creating a review")
    }
  }

  const handleLike = (folderimage) => {

    const imgliked = likedimages.filter(img => img.path == folderimage.path)
    const imgdisliked = dislikedimages.filter(img => img.path == folderimage.path)
    // if this image exists in liked or unliked imagelist, return
    if  (imgliked.includes(folderimage) || imgdisliked.includes(folderimage)) {
      //if the image already exist in likedmages: return
      return
    }
    else {

      const likeindex = undoneimages.findIndex(img => img.path == folderimage.path)
      undoneimages.splice(likeindex, 1)

      folderimage.className = "likedstyle"
      likedimages.push(folderimage)
      setAllimages(likedimages.length + dislikedimages.length)

    }

  }

  const handleDisLike = (folderimage) => {
    const imgliked = likedimages.filter(img => img.path == folderimage.path)
    const imgdisliked = dislikedimages.filter(img => img.path == folderimage.path)
    // if this image exists in liked or unliked imagelist, return
    if (imgliked.includes(folderimage) || imgdisliked.includes(folderimage)) {
      return
    }
    else {
      const likeindex = undoneimages.findIndex(img => img.path == folderimage.path)
      undoneimages.splice(likeindex, 1)
      folderimage.className = "dislikedstyle"
      dislikedimages.push(folderimage)
      setAllimages(likedimages.length + dislikedimages.length)
    }

  }
  const handleUndo = (folderimage) => {
    
    const undone = undoneimages.filter(img => img.path == folderimage.path)
    // if this image already is undone, return
    if (undone.includes(folderimage)) {
      return
    }
    // if this image is not liked or disliked, return
    if (!likedimages.includes(folderimage) && !dislikedimages.includes(folderimage)) {
      return
    }
    else {
      undoneimages.push(folderimage)
      const likeindex = likedimages.findIndex(img => img.path == folderimage.path)
      const dislikeindex = dislikedimages.findIndex(img => img.path == folderimage.path)

      likedimages.splice(likeindex, 1)
      dislikedimages.splice(dislikeindex, 1)
      folderimage.className = "neutralstyle"
      setAllimages(likedimages.length + dislikedimages.length)

    }
  }

  return (
    <Container>
      <SRLWrapper>
        <div className="text-center"> <h1>Images</h1></div>
        <Button type="submit" onClick={() => setShowReview(!showreview)}><h2>Review Album</h2></Button>
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
        <Button type="submit" onClick={() => { handleReview() }}><h2>{btntext}</h2></Button></>}
      {message && (<Alert variant={"danger"} >{message}  <Button onClick={() => navigate("/myprofile")}><h2>Redo review</h2></Button> </Alert>)}

    </Container>
  )
}

export default FolderImageGrid;