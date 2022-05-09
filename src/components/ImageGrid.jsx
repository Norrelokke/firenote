import React from 'react';
import Container from 'react-bootstrap/Container'

import { SRLWrapper } from "simple-react-lightbox";

const ImageGrid = ({ query }) => {

  return (
    <Container>
      {query.data === undefined || query.data.length == 1 ? <Container className="text-center">This folder does not contain any images, go to settings to upload</Container> :
        <SRLWrapper>
          <div className="img-grid">
            {query.data && query.data.map(image => (
              <div className={image.className ? image.className : "img-wrap"} key={image._id}>
                <img src={image.url} alt="uploaded image" />
              </div>
            ))}
          </div>
        </SRLWrapper>}
    </Container>
  )
}

export default ImageGrid;