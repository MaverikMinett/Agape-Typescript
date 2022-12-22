

import sharp from 'sharp';


export class ImageService {

    async convert( inputFilePath: string, outputFilePath ) {
        const output = await sharp(inputFilePath).toFile(outputFilePath)
    }

}



async function main() {
    const imageService = new ImageService()
    await imageService.convert('./src/images/3.webp', './src/images/3.jpeg')
}

main()

// // const originalImageBuffer =
// const convertedImageBuffer  = imageService.convert()
