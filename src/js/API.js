import axios from "axios";
import { createClient } from "pexels";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_REST,
});

export async function getAxios(url = "") {
  try {
    let { data } = await instance(url);
    return data;
  } catch (error) {
    let { data } = error.response;
    throw data;
  }
}

export const imagePixels = (query, set, def = "https://images.pexels.com/photos/309724/pexels-photo-309724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1200") => {
  const client = createClient(
    import.meta.env.VITE_TOKE_PIXELS
  );
console.log(query)
  client.photos.search({query , per_page: 1 }).then((photos) => {
      if (photos.photos[0] != undefined) {
        set(photos.photos[0].src.landscape);
      }else{
        set(df)
      }
    })
    .catch(() => {
      set(def)
    });
};
