import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SearchResult = {
  title: string;
  snippet: string;
  link: string;
};

type SearchResultsProps = {
  query: string;
  results: SearchResult[];
};

export function SearchResults({ query, results }: SearchResultsProps) {
  return (
    <div className="space-y-4 my-6 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold">Search Results for "{query}"</h3>

      <div className="grid gap-4">
        {results?.map((result, index) => (
          <Card key={index} className="transition-shadow hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {result.title}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-600">
                {result.snippet}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
