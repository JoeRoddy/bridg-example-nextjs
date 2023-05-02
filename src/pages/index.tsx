import { Blog } from '@prisma/client';
import db from 'bridg/app/client/db';
import { DbRules } from 'bridg/app/server/request-handler';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const BridgExample: NextPage = ({}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      // Query your DB from the frontend 😎
      const data = await db.user.findMany({
        // filter your results
        where: {
          email: { contains: '@prisma.io' },
        },
        // include related data
        include: { blogs: true },
      });

      setData(data);
    })();
  }, []);

  const [searchResults, setSearchResults] = useState<Blog[]>([]);

  return data === undefined ? (
    <GetStarted />
  ) : (
    <div>
      <input
        placeholder="Search for blogs.."
        onChange={async (e) => {
          const query = e.target.value;
          if (!query) return setSearchResults([]);
          const blogs = await db.blog.findMany({ where: { title: { contains: query } } });
          setSearchResults(blogs);
        }}
      />
      <br />
      Blog Search Results:
      <pre>{JSON.stringify(searchResults, null, 1)}</pre>
      All Data:
      <pre>{JSON.stringify(data, null, 1)}</pre>
    </div>
  );
};

export const dbRules: DbRules = { default: true };

export default BridgExample;

const GetStarted = () => <div>Fetch some data to get started</div>;
