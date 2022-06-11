import { GetServerSideProps } from "next";
import React from "react";
import fs from "fs";
import request from "graphql-request";
import GRAPHQL_QUERIES from "../services/GraphQLQueries";

const Sitemap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    test: "http://localhost:3000",
    production: "https://wrestlingworld.co",
  }[process.env.NODE_ENV];

  // Get all static pages at root level
  const staticPages = fs
    .readdirSync("pages")
    .filter((staticPage) => {
      return (
        // Filter thos pages to not inlcude them in the sitemap
        !["_app.tsx", "_document.tsx", "sitemap_index.xml.tsx", "404.tsx", "index.tsx"].includes(staticPage) &&
        // Excludes directories
        /.tsx$/.test(staticPage)
      );
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath.split(".tsx")[0]}`;
    });

  staticPages.push(baseUrl + "/");
  const { categories } = await request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, GRAPHQL_QUERIES.GET_ALL_CATEGORIES);

  const categoriesPages = categories.nodes.map(({ slug }: { slug: string }) => `${baseUrl}/${slug}`);

  const allPages = [...staticPages, ...categoriesPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
