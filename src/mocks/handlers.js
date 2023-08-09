import { rest } from "msw";

const baseURL = "https://drf-api-walkthrough-18-b94666bc97ac.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "admin",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://res.cloudinary.com/watermelon1812/image/upload/v1/media/images/star-seekers-kasey_yivgur",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req,res,ctx) => {
    return res(ctx.status(200))
  })
];
