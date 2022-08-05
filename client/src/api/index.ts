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

/**
 * Gets the Daily Entry for Today. If none exits, it will create one.
 * @returns daily entry object
 */
export const getDaily = async (user_id: String) => {
  try {
    let result = await axios({
      method: 'get',
      url: '/api/daily',
      params: {
        user_id,
      }
    });
    // console.log('first try data:', result.data);
    if (result.data._id === undefined) {
      result = await axios.get('/api/latestEntry', {
        params: {
          user_id,
        }
      });
      // console.log('Getting Latest data', result.data);
      let entry = {
        // Default to account instead of zero
        weightAmount: result.data?.weightAmount ? result.data.weightAmount : 0,
        user_id,
      };
      result = await axios.post('/api/daily', entry);
      // console.log('result after post:', result.data);
    }
    // console.log('Returning Data:', result.data);
    return result.data;
  } catch (error: any) {
    throw error;
  }
}

export const getUserInfo = async (user_id: String) => {
  try {
    let result = await axios({
      method: 'get',
      url: '/api/fetchUser',
      params: {
        user_id,
      }
    });
    return result.data;
  } catch (error: any) {
    throw error;
  }
}