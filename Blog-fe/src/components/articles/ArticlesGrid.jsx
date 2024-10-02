import React from "react";
import { Link } from "react-router-dom";

const ArticlesGrid = ({ articles }) => {
  return (
    <>
      {articles.map((article) => {
        const { name, thumbnail, title, content } = article;
        const previewContent =
          content && content.length > 0 ? content[0].substring(0, 100) : "";

        return (
          <div key={name} className="p-4 md:w-1/2">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
              <Link to={`/article/${name}`}>
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={thumbnail}
                  alt={`Thumbnail for ${title}`}
                />
              </Link>
              <div className="p-6">
                <Link to={`/article/${name}`}>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {title}
                  </h3>
                </Link>
                <p className="leading-relaxed mb-3">{previewContent}...</p>
                <div className="flex items-center flex-wrap">
                  <Link
                    className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                    to={`/article/${name}`}
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ArticlesGrid;
