import type {
    APIGatewayProxyStructuredResultV2,
    APIGatewayProxyEventV2,
    Handler,
} from 'aws-lambda';
import { DataTypes, Sequelize } from 'sequelize';

export const handler: Handler = async (
    event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyStructuredResultV2> => {
    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    const { ids } = JSON.parse(event.body);

    const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
    });

    sequelize.authenticate();

    const users = sequelize.define(
        'Users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: 'users_tb',
            timestamps: false,
        }
    );

    await users.destroy({
        where: {
          id: ids
        }
      })
      .then(numDeletedRows => {
        console.log(`Deleted ${numDeletedRows} users`);
      })
      .catch(err => {
        console.error('Error deleting users:', err);
      });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `id: ${ids}`,
        }),
    };
};
