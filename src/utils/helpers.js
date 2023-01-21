// Constants
import { IMAGE_SIZES } from '../constants/constant';

export const formatImageList = (imageList, size) => {
    imageList = imageList.map(image => {
        return {
            url: image.url,
            imageWidth: size === IMAGE_SIZES.SMALL ? 128 : size === IMAGE_SIZES.MEDIUM ? 256 : 512
        }
    });

    return imageList;
};