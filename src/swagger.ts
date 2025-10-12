import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;


dotenv.config();

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Wesoline Backend API',
        version: '1.0.0',
        description: 'A RESTful API for Wesoline Backend application',
        contact: {
          name: 'API Support',
          email: 'support@wesoline.com'
        }
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Development server'
        }
      ],
      components: {
        schemas: {
          Company: {
            type: 'object',
            required: ['name', 'email'],
            properties: {
              id: {
                type: 'integer',
                description: 'Company ID'
              },
              name: {
                type: 'string',
                description: 'Company name'
              },
              email: {
                type: 'string',
                format: 'email',
                description: 'Company email address'
              },
              phone: {
                type: 'string',
                description: 'Company phone number'
              },
              address: {
                type: 'string',
                description: 'Company address'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Last update timestamp'
              }
            }
          },
          Branch: {
            type: 'object',
            required: ['name', 'companyId'],
            properties: {
              id: {
                type: 'string',
                description: 'Branch ID (cuid)'
              },
              name: {
                type: 'string',
                description: 'Branch name'
              },
              companyId: {
                type: 'string',
                description: 'Owning company ID (cuid)'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Creation timestamp'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Last update timestamp'
              }
            }
          },
          Error: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'error'
              },
              message: {
                type: 'string',
                description: 'Error message'
              }
            }
          },
          Success: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                example: 'success'
              },
              message: {
                type: 'string',
                description: 'Success message'
              },
              data: {
                type: 'object',
                description: 'Response data'
              }
            }
          }
        }
      }
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts']
  };

export default swaggerOptions;