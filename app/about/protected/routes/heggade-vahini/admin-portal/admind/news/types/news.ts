export interface Translation {
  languageCode: string;
  title: string;
  content: string;
}

export interface ImageItem {
  id: string;
  url: string;
}

export interface NewsItem {
  id: number;
  translations: Translation[];
  images: ImageItem[];
  tags: string[];
}

export interface Tag {
  id: number;
  name: string;
}
