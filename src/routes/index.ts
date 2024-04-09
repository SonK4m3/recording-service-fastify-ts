import { FastifyInstance, FastifyRequest } from "fastify";
import productRoutes from "./product.route";
import fooRoutes from "./foo.route";
import { productSchemas } from "../validators/product.schema";
import mediaRoutes from "./media.route";

const routes = async (server: FastifyInstance) => {
  for (const schema of [...productSchemas]) {
    server.addSchema(schema);
  }

  //authorization
  server.addHook("onRequest", async (request: FastifyRequest<{}>, reply) => {
    const routePath = request.routeOptions.url;

    const nonAuthenticatedRoutes: { route: string; method?: string }[] = [
      { route: "/api/users/login", method: "POST" },
      { route: "/api/users", method: "POST" },
    ];

    if (
      nonAuthenticatedRoutes.some(
        (it) => it.route === routePath && it.method === request.raw.method
      )
    ) {
      return;
    }

    // Verify JWT
    // await request.jwtVerify();
  });

  // register sub-routes
  server.register(fooRoutes, { prefix: "/foo" });
  server.register(productRoutes, { prefix: "/products" });
  server.register(mediaRoutes, { prefix: "/media" });
};

export default routes;
