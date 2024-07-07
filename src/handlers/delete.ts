import type {
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import users from "../db/users";

export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { id } = JSON.parse(event.body);

  await users.destroy({
    where: {
      id,
    },
  });
  // .then((numDeletedRows) => {
  //   console.log(`Deleted ${numDeletedRows} users`);
  // })
  // .catch((err) => {
  //   console.error("Error deleting users:", err);
  // });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `id: ${id}`,
    }),
  };
};
