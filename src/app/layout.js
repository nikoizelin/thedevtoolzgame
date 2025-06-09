import React from "react";
import "./globals.css";
import Home from "./home.js";


const metadata = {
  title: "thedevtoolzgame",
  description: "a interactive game to learn web development",
  favicon: "/icon.ico",
  answer: "metadata"
};



function Layout() {

  return (
    <html lang="de-CH">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="answer" content={metadata.answer} />
        <link rel="icon" href={metadata.favicon} />
        <link rel="apple-touch-icon" href="/favicon_thedevtoolzgame.png" />
      </head>
      <body className="select-none">
        <Home />
      </body>
    </html>
  );
}

export default Layout;
