export default {
  getMethod(url) {
    return http
      .get(url)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
  postMethod(url, data) {
    return http
      .post(url, data)
      .then(response => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
};
