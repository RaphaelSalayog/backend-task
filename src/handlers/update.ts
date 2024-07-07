import type {
  APIGatewayProxyStructuredResultV2,
  APIGatewayProxyEventV2,
  Handler,
} from "aws-lambda";
import users from "../db/users";

export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { id, name, address } = JSON.parse(event.body);

  await users.update({ name, address }, { where: { id: id } });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: {
        id,
        name,
        address,
      },
    }),
  };
};
