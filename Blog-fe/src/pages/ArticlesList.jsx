import React from "react";
import articleContent from "./Article-content";
import ArticlesGrid from "../components/articles/ArticlesGrid";

const ArticlesList = () => {
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Articles List
      </h1>
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap -m-4">
          <ArticlesGrid articles={articleContent} />
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;
