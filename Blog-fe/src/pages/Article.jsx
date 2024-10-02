import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import articleContent from "./Article-content";

// Component
import ArticlesGrid from "../components/articles/ArticlesGrid";
import CommentList from "../components/articles/CommentList";
import AddCommentForm from "../components/articles/AddCommentForm";

const Article = () => {
  const { name } = useParams();
  const [articleInfo, setArticleInfo] = useState({ comments: [] });
  const article = useMemo(
    () => articleContent.find((article) => article.name === name),
    [name]
  );

  useEffect(() => {
    fetchArticleData();
  }, [name]);

  const fetchArticleData = async () => {
    const response = await fetch(`/api/article/${name}`);
    const body = await response.json();
    setArticleInfo(body);
  };

  if (!article) {
    return (
      <div className="text-center my-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
          Article does not exist
        </h1>
        <Link to="/" className="text-blue-500 underline">
          Go back to Articles List
        </Link>
      </div>
    );
  }

  const { title, content } = article;
  const otherArticles = articleContent.filter((elem) => elem.name !== name);

  return (
    <article>
      <header>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 my-6">
          {title}
        </h1>
      </header>
      <section>
        {content.map((paragraph, index) => (
          <p key={index} className="mx-auto leading-relaxed mb-6 text-base">
            {paragraph}
          </p>
        ))}
      </section>
      <CommentList comments={articleInfo.comments} />
      <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
      <h2 className="sm:text-2xl text-xl font-bold my-4 text-gray-900">
        Other Articles
      </h2>
      <div className="flex flex-wrap -m-4">
        <ArticlesGrid articles={otherArticles} />
      </div>
    </article>
  );
};

export default Article;
