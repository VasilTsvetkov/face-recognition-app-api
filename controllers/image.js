const MODEL_ID = 'face-detection'; 

const returnClarifaiJSONRequest = (imageUrl) => {
    const PAT = process.env.CLARIFAI_PAT;
    const USER_ID = 'clarifai';
	const APP_ID = 'main'; 
    const IMAGE_URL = imageUrl;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };

    return requestOptions;
}

const handleApiCall = (req, res) => {
	fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiJSONRequest(req.body.input))
    .then(response => response.json())
    .then(data => {
    	res.json(data)
    })
    .catch(err => res.status(400).json('error handling the API call'))
}

const handleImage = (req, res, db) => {
	const { id, entries } = req.body;
	db('users')
		.where('id', '=', id)
	  	.increment('entries', entries)
	  	.returning('entries')
	  	.then(entries => {
	  		res.json(entries[0].entries);
	  	})
	  	.catch(err => res.status(400).json('error when getting entries'))
}

export { handleImage, handleApiCall };
