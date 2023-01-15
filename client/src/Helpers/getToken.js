const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  } else {
    return false;
  }
};

export { getToken };

// const decodeToken = async (token) => {
//   let secret = "";
//   jsonwebtoken.verify(
//     token,
//     process.env.SECRET_JWT_KEY,
//     async function (err, decoded) {
//       if (err) {
//         return { error: "invalid signature" };
//       }
//       secret = decoded.sub;
//     }
//   );
//   return secret;
// };
