using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Worker
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                "Catchall", // Route name
                "{*url}", // URL with parameters
                new { controller = "Home", action = "Index" },
                null,
                new[] { "Worker.Controllers" }
                );
        }
    }
}