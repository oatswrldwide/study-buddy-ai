import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  description: string;
}

interface RelatedArticlesProps {
  articles: Article[];
  currentSlug?: string;
}

export const RelatedArticles = ({ articles, currentSlug }: RelatedArticlesProps) => {
  const filtered = articles.filter(a => a.slug !== currentSlug).slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="font-display text-2xl font-bold">Related Resources</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            to={`/${article.slug}`}
            className="group flex items-start gap-4 p-4 border border-border rounded-lg hover:border-primary hover:shadow-sm transition-all"
          >
            <div className="flex-1">
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.description}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link
          to="/resources"
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          View all study resources
          <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedArticles;
