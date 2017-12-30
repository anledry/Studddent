import dbpost from './../models/Post';

const postController = {};

postController.post = (req, res) => {
    const { name, url, feature } = req.body;
    let image;
    const features=[req.body.f1,req.body.f2,req.body.f3].filter((item) => { 
        return (item !== ''); 
    }).map((str) => {
        return str.substr(0,40)
    });

    if (req.body.image == '') {
        image = 'https://i.imgur.com/HLBILGL.png';
    } else {
        image = req.body.image;
    }

    const post = new dbpost({
        name,
        url,
        feature,
        features,
        image
    });

    post.save().then((newPost) => {
        res.status(200).redirect('/');
    }).catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
};

export default postController;