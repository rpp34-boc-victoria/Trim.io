import axios from "axios";

interface IResponse {
  code: number;
  data: any;
  essmsg: string;
}

export const apiGet = async (path: string, params: any = {}) => {
  try {
    let result = await axios.get<IResponse>(path, params);
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
    let result = await axios.post<IResponse>(path, data);
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
