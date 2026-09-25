import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Application } from "express";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HealthStream API",
      version: "1.0.0",
      description: "HealthStream enterprise healthcare API documentation.",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [
    // The first patterns cover the repository's current TypeScript module location.
    "./src/app/module/**/*.swagger.ts",
    "./src/app/module/**/*.swagger.js",
    // Keep the requested convention available for modules added at the workspace root.
    "./src/modules/**/*.swagger.ts",
    "./src/modules/**/*.swagger.js",
  ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api-docs/json", (_req, res) => {
    res.json(swaggerSpec);
  });
};
