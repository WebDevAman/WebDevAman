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

  const { posts } = await request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, GRAPHQL_QUERIES.GET_SITEMAP_URI_POSTS);

  const allPages = [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"       
          xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${posts.nodes
        .map(({ uri, title, date }: any) => {
          return `
            <url>
              <loc>${baseUrl + uri}</loc>
              <news:news>
                <news:publication>
                  <news:name>${title}</news:name>
                  <news:language>en</news:language>
                </news:publication>
                <news:publication_date>${date}+01:00</news:publication_date>
                <news:title>${title}</news:title>
              </news:news>
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
