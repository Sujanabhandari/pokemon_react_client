// import axios from "axios";


// export const getUser = async (token) => {
//     try {
//       const { data } = await axios.get(`${url}/me`, {
//         headers: { Authorization: token }
//       });

//       return { data };
//     } catch (error) {
//       return { error };
//     }
//   };
  
//   export const registerUser = async (formData) => {
//     console.log("Register", formData)
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//   };
//     try {
//       console.log("Hello From Register")

//       // fetch.post(
//       //   `https://pokemon-server.onrender.com/signup`,{
//       //     method: "POST",
//       //     headers: { 'Content-Type': 'application/json' },
//       //     data:  JSON.stringify(formData)
//       //   }
//       // ).then((result) => console.log(result))
//       // ;
//       // return { data };
//       fetch('https://pokemon-server.onrender.com/signup', requestOptions)
//         .then(response => response.json());
//         // .then(data => setPostId(data.id));
//     } catch (error) {
//       return { error };
//     }
//   };

  
//   export const loginUser = async (formData) => {
//     console.log(formData);
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//   };
//     try {
//       const { data } = await axios.post(
//         `https://pokemon-server.onrender.com/signin`,
//         requestOptions
//       );
//       console.log("DATA", data)
//       return { data };
//     } catch (error) {
//       return { error };
//     }
//   };

import axios from "axios";

const url = "https://pokemon-server.onrender.com"

export const getUser = async (token) => {
  
  try {
    const { data } = await axios.get(`${process.env.BLOG_API}/me`, {
      headers: { Authorization: token }
    });
    return { data };
  } catch (error) {
    return { error };
  }
};

  export const registerUser = async (formData) => {
    console.log("Register", formData)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
  };
    try {
      console.log("Hello From Register")
      fetch('https://pokemon-server.onrender.com/signup', requestOptions)
        .then(response => console.log("here",response)).then(data=>console.log(data));
      
    } catch (error) {
      return { error };
    }
  };


export const loginUser = async (formData) => {
  try {
    const { data } = await axios.post(
      `${url}/signin`,
      formData
    );
    return { data };
  } catch (error) {
    return { error };
  }
};
