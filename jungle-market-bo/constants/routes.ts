export default {
  plannedRoutesList: {
    href: () => `/rutas`,
    as: (id) => `/rutas`,
  },
  plannedRoute: {
    href: () => `/rutas/[plannedRouteId]`,
    as: (plannedRouteId) => `/rutas/${plannedRouteId}`,
  },
};
