const gm = require('gm').subClass({ imageMagick: true });

async function addTextToImage(imagePath, text) {
    return new Promise((resolve, reject) => {
        gm(imagePath)
        .resize(1600)
        .gravity('center')
        .font('./public/fonts/BebasNeue.ttf')
        .out('-undercolor', 'White')
        .out('-pointsize', '200', 'label:'+ text, '-trim', '+repage', '-resize', '1600x', '-gravity', 'south')
        .out('-composite')
        .borderColor('white')
        .border(20, 20)
        // .extent(1600, 900)
        .resize(1600)
        // .crop(1600, 900, 0, 0)
        .write('./public/images/image.jpg', function (err) {
            if (!err) {
                console.log(Date() + '- Text added to image');
                resolve(true);
            } else {
                console.log(Date() + '- Error adding text to image');
                reject(err);
            }
        });
    });
}

module.exports = { addTextToImage };