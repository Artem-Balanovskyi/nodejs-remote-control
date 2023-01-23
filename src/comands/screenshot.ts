import { mouse, screen, Region } from "@nut-tree/nut-js";
import Jimp from 'jimp';

export const makeScreenshot = async () => {

  const { x, y } = await mouse.getPosition();
  const imageSize = 200;
  await screen.highlight(new Region(x - imageSize / 2, y - imageSize / 2, imageSize, imageSize));

  const screenshotArea = new Region(x - imageSize / 2, y - imageSize / 2, imageSize, imageSize);
  const rawImage = await screen.grabRegion(screenshotArea);
  const imageRGB = await rawImage.toRGB();

  const jimpImage = new Jimp({
    data: imageRGB.data,
    width: rawImage.width,
    height: rawImage.height,
  });

  const encodedPicture = (await jimpImage.getBufferAsync(Jimp.MIME_PNG)).toString('base64');

  return `prnt_scrn ${encodedPicture}`;
}
