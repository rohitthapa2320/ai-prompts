import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, {params}) => {
  const userId =params.id
  try {
    await connectToDB();
    const userInfo = await User.findById(userId);

    return new Response(JSON.stringify(userInfo), {
      status: 200
    })
  } catch (error) {
    return new Response(
      JSON.stringify("Failed to fetch user profile",{
        status: 500
      })
    )
  }
}