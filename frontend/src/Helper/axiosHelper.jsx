import axios from "axios";

const BASE_URL = process.env.REACT_APP_API;
const data = JSON.parse(localStorage.getItem("user_details"));
/**
 * Gets the headers.
 *
 */
const getHeaders = () => {
  let authToken = data?.accessToken ? data?.accessToken : null;
  let config = {
    headers: {
      Accept: "application/json",
    },
  };
  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`;
  }

  return config;
};

/**
 * Get call from Axios
 */
const axiosGet = async (url) => {
  try {
    return await axios.get(`${BASE_URL}/${url}`, getHeaders());
  } catch (error) {
    throw error.response.data;
  }
};
/**
 * Post request from axios
 */
const axiosPost = async (data, url) => {
  try {
    let response = await axios.post(`${BASE_URL}/${url}`, data, getHeaders());

    return {
      data: response?.data,
      status: response?.status,
      statusText: response?.message,
    };
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Update request from axios.
 */
const axiosPut = async (data, url) => {
  try {
    let request = await axios.put(`${BASE_URL}/${url}`, data, getHeaders());

    return request;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Save request from axios
 */
const axiosSave = async (oldTask, newTask, url) => {
  try {
    let request = await axios.put(
      `${BASE_URL}/${url}`,
      {
        id: oldTask.id,
        task: newTask,
      },
      getHeaders()
    );

    return request;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Delete call from axios
 */
const axiosDelete = async (url) => {
  let request = await axios.delete(`${BASE_URL}/${url}`, getHeaders());

  return request;
};

export { axiosGet, axiosPost, axiosDelete, axiosSave, axiosPut };
