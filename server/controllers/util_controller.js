// this file hold utility functions, which for now is just image uploading
// might also be for data sanitization if we can work out a standard format

require('dotenv').config()
const aws = require('aws-sdk')

// need to get the env file from uriel for this to be used
const s3Bucket = new aws.S3({
	Bucket: process.env.BUCKET,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

module.exports = {
    // we need to find a way to run this concurrently while filling out the recipe
	upload_image: (req, res, file, collection, doc) => {
		try {
			const db = req.app.get('db')

			// setup S3 params
			const params = {
				Bucket: process.env.BUCKET,
				Key: file.originalname,
				Body: file.buffer,
				ContentType: file.mimetype,
			}

			// upload to S3 Bucket
			s3Bucket.upload(params, (err, data) => {
				if (err) {
					console.log('Error in callback', err)
					res.status(500).json({ err: 'error in upload' })
				}

				// I hope this works lol
				let docref = db
					.collection(collection)
					.doc(doc)
					.get() // might not need to get it

				if (collection === 'recipes') {
					docref.update({
						imageURL: data.Location,
					})
				} else if (collection === 'users') {
					docref.update({
						photoURL: data.Location,
					})
				}

				console.log('data from s3Bucket.upload: ', data)
				console.log('Image has been uploaded successfully.')
			})
		} catch (err) {
			res.status(500).json(err)
		}
	},
}
