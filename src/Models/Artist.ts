export type Artist = {
    pk: string;
    sk: string;
    id: string;
    images: {url:string}[];
    name: string;
    url: string;
    external_urls: {spotify: string};
}