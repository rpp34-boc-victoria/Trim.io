import axios from "axios";


export const apiGet = async (path: string, params: any = {}) => {
  try {
    let result = await axios.get(path, params);
    if(result.status ===200) {
      return result.data
    }else {
      throw new Error('data query failure')
    }
  } catch (error) {
    alert(error)
    // return error
  }
};

export const apiPost = async (path: string, data: any = {}) => {
  try {
    let result = await axios.post(path, data);
    if(result.status ===200) {
      return result.data
    }else {
      throw new Error('data query failure')
    }
  } catch (error) {
    alert(error)
    // return error
  }
};
