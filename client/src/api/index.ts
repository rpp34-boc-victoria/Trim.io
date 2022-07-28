import axios from "axios";

export const apiGet = async (path: string, params: any = {}) => {
  try {
    let result = await axios.get(path, params);
    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error("data query failure");
  }
};

export const apiPost = async (path: string, data: any = {}) => {
  try {
    let result = await axios.post(path, data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw new Error("data query failure");
  }
};
