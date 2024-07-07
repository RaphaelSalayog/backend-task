import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyStructuredResultV2,
  Handler,
} from "aws-lambda";
import users from "../db/users";

export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
  const { id = null } = event.body ? JSON.parse(event.body) : {};

  const whereClause: { id?: number } = {};
  if (id !== null && id !== undefined) {
    whereClause.id = id;
  }

  const useLists = await users.findAll({
    where: whereClause,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: useLists,
    }),
  };
};
