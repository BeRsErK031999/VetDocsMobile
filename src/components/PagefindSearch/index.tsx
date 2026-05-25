import React, {useCallback, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './styles.module.css';

type PagefindResultData = {
  url: string;
  meta: {
    title?: string;
  };
  excerpt?: string;
};

type PagefindResult = {
  id: string;
  data: () => Promise<PagefindResultData>;
};

type PagefindSearchResponse = {
  results: PagefindResult[];
};

type PagefindModule = {
  search: (query: string) => Promise<PagefindSearchResponse>;
};

type SearchState = 'idle' | 'loading' | 'ready' | 'empty' | 'unavailable' | 'error';

const MIN_QUERY_LENGTH = 2;

export default function PagefindSearch(): React.ReactNode {
  const pagefindPath = useBaseUrl('pagefind/pagefind.js');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<SearchState>('idle');
  const [results, setResults] = useState<PagefindResultData[]>([]);

  const statusText = useMemo(() => {
    if (status === 'loading') {
      return 'Идет поиск по документам...';
    }

    if (status === 'empty') {
      return 'Ничего не найдено. Попробуйте рабочий термин из документов: прием, анестезия, препарат, шок, стерилизация или выписка.';
    }

    if (status === 'unavailable') {
      return 'Индекс появится после команды npm run build:search.';
    }

    if (status === 'error') {
      return 'Не удалось выполнить поиск. Попробуйте изменить запрос.';
    }

    return '';
  }, [status]);

  const runSearch = useCallback(
    async (nextQuery: string) => {
      setQuery(nextQuery);

      const normalizedQuery = nextQuery.trim();
      if (normalizedQuery.length < MIN_QUERY_LENGTH) {
        setResults([]);
        setStatus('idle');
        return;
      }

      setStatus('loading');

      try {
        const runtimePagefindPath =
          window.location.protocol === 'file:' ? '../pagefind/pagefind.js' : pagefindPath;
        const pagefind = (await import(/* webpackIgnore: true */ runtimePagefindPath)) as PagefindModule;
        const search = await pagefind.search(normalizedQuery);
        const hydratedResults = await Promise.all(
          search.results.slice(0, 10).map((result) => result.data()),
        );

        setResults(hydratedResults);
        setStatus(hydratedResults.length > 0 ? 'ready' : 'empty');
      } catch (error) {
        setResults([]);
        setStatus(error instanceof TypeError ? 'unavailable' : 'error');
      }
    },
    [pagefindPath],
  );

  return (
    <section className={styles.search} aria-label="Поиск по документации">
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pagefind-search">
          Поиск по документам
        </label>
        <input
          id="pagefind-search"
          className={styles.input}
          type="search"
          value={query}
          placeholder="Например: шок, анестезия, выписка"
          enterKeyHint="search"
          onChange={(event) => void runSearch(event.target.value)}
        />
      </div>
      {status === 'idle' && results.length === 0 && (
        <p className={styles.hint}>
          Введите минимум два символа. Можно искать по названию раздела, словам внутри регламентов,
          препаратам, процедурам и документам для владельца.
        </p>
      )}
      {statusText && <p className={styles.status}>{statusText}</p>}
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((result) => (
            <li className={styles.result} key={result.url}>
              <Link className={styles.title} to={result.url}>
                {result.meta.title ?? 'Документ'}
              </Link>
              {result.excerpt && (
                <p
                  className={styles.excerpt}
                  dangerouslySetInnerHTML={{__html: result.excerpt}}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
