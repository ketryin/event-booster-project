export default function filterBiggerImage(imagesArray) {
  // console.log(imagesArray);
  let biggestImage = imagesArray[0];
  imagesArray.forEach(element => {
          if (element.width > biggestImage.width && element.width < 1200) {
            biggestImage = element;
          }
          
  });
  // console.log(biggestImage);

  return biggestImage;
}