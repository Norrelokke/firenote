import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { SRLWrapper } from "simple-react-lightbox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import useUploadReview from '../hooks/useUploadReview';
import { useParams } from "react-router-dom";

const ImageGrid = ({ query }) => {
  const params = useParams();
  const { UploadReview } = useUploadReview()
  const navigate = useNavigate();
  const [showreview, setShowReview] = useState(false)
  const [showreviewBtn, setShowReviewBtn] = useState(false)
  const [allimages, setAllimages] = useState([]);
  const [likedimages, setlikedImages] = useState([]);
  const [dislikedimages, setdislikedImages] = useState([]);

  useEffect(() => {
    //removes reviewbutton on pages that uses the imagegrid but is not a folder
    if (params.foldername)
      setShowReviewBtn(true)
  }, []);

  const ShowReview = () => {
    // shows/hides reviewthumbs when reviewbutton is clicked
    setShowReview(!showreview)
  }

  const handleReview = async () => {
    //uploads new album to db and sends user to home
    await UploadReview({
      folderimages: likedimages,
    })
    navigate("/");
  }

  const handleLike = (folderimage) => {

    const imgliked = likedimages.filter(img => img.path == folderimage.path)
    const imgdisliked = dislikedimages.filter(img => img.path == folderimage.path)
    // if this image exists in liked or unliked imagelist, return
    if (imgliked.length || imgdisliked.length) {
      console.log("all", allimages)
      console.log("liked", likedimages)
      console.log("dis", dislikedimages)
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
      console.log("liked", newliked)
    }
    if (newdisliked.length)
      console.log("disliked")
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
      {/* <Container className="text-center">This folder does not contain any images, go to settings to upload</Container>  */}
      <SRLWrapper>
        <div className="text-center"> <h1>Images</h1></div>
        {showreviewBtn && <Button type="submit" onClick={ShowReview}><h2>Review Album</h2></Button>}
        <div className="img-grid">
          {query.data && query.data.map((image) => image.folderImages.map((folderimage) =>

            <div className={folderimage.className ? folderimage.className : "img-wrap"} key={folderimage._id}>
              {folderimage._id}
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
      {showreview && <> <h3>{allimages <= 0 ? "0" : allimages} / {query.data ? query.data.length - 1 : "0"} </h3>
        <Button type="submit" onClick={() => { handleReview() }}><h2>Create Review Album</h2></Button></>}
    </Container>
  )
}

export default ImageGrid;