import { Photo } from "../models/photo.model";

export const mock_photos: Photo[] = [];

for (let i = 1; i <= 20; i++) {
  mock_photos.push({
    id: i.toString(),
    url: `https://picsum.photos/200/300?random=${i}`,
  });
}