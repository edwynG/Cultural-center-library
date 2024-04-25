import axios from "axios";
// toke pixels API IMGsqyIMfIKwyo39FEfboZ16qBtwVHaRD1UCJIKfojxTiY6ir7Veh2Ek
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_REST,
});

export async function getAxios(url = "") {
  try {
    let { data } = await instance(url);
    return data;
  } catch (error) {
    let { data } = error.response;
     throw(data);
  }
}
getAxios();
export const imagePixels = async (query, set, def = "https://images.pexels.com/photos/309724/pexels-photo-309724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1200") => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${query}`,
      {
        headers: {
          Authorization:
            import.meta.env.VITE_TOKE_PIXELS,
        },
      }
    );
    let [photos] = response.data.photos;
     if(photos != undefined){
      set(photos.src.landscape)
     }else{
      set(def)
     }
  } catch (error) {
    set(def)
  }
};
