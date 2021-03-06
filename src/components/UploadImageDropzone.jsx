import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import useUploadImageToFolder from '../hooks/useUploadImageToFolder'
import ProgressBar from 'react-bootstrap/ProgressBar'

const UploadImageDropzone = (props) => {

	const upload = useUploadImageToFolder()

	const onDrop = useCallback(acceptedFiles => {

		if (!acceptedFiles.length) {
			return
		}

		acceptedFiles.forEach((file) => {
			upload.uploadImage(file, props.folderid)
		})

	}, [])

	const { getRootProps, getInputProps, acceptedFiles, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: 'image/gif, image/jpeg, image/png, image/webp',
		onDrop,
		maxFiles: 1,
	})

	return (

		<div {...getRootProps()}
			id="upload-image-dropzone-wrapper"
			className={`${isDragAccept ? 'drag-accept' : ''} ${isDragReject ? 'drag-reject' : ''}`}
		>
			<input {...getInputProps()} />

			{
				isDragActive
					? (isDragAccept ? <div className="dropzone"><p>Drop file here</p></div> : <p>not accepted format</p>)
					: <div className="dropzone"><p>Drop file here</p></div>
			}

			{acceptedFiles.length > 0 && (
				<div className="accepted-files mt-2">
					<ul className="list-unstyled">
						{acceptedFiles.map(file => (
							<li key={file.name}>{file.name} ({Math.round(file.size / 1024)} kb)</li>
						))}
					</ul>
				</div>
			)}

<div className="py-5">{upload.progress !== null && <ProgressBar variant="success" animated now={upload.progress} />}</div>

		</div>

	)
}

export default UploadImageDropzone