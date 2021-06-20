export default function filterBiggerImage(imagesArray) {
    // console.log(imagesArray);
    let biggestImage = imagesArray[0];
    imagesArray.forEach(element => {
        if ('devicePixelRatio' in window && window.devicePixelRatio > 1) {
            if (element.width > biggestImage.width && element.width > 1200) {
                biggestImage = element;
            }
        } else {
            if (element.width > biggestImage.width && element.width < 1200) {
                biggestImage = element;
            }
        }


    });
    // console.log(biggestImage);

    return biggestImage;
}