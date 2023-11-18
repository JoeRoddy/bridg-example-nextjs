import { useAsync } from '@/hooks/useAsync';
import bridg from 'bridg';
import { NextPage } from 'next';
import { useState } from 'react';

const BridgExample: NextPage = ({}) => {
  // Query your DB from the frontend 😎
  // see /prisma/rules.ts for how to secure your database
  const data = useAsync(() =>
    bridg.user.findMany({
      // uncomment to filter your results:
      // where: { email: { contains: "alice@prisma" } },
      // uncomment include related data:
      // include: { blogs: true },
    }),
  );

  const [cookieVal, setCookieVal] = useState('');

  return data !== undefined ? (
    <div>
      <input
        placeholder="your cookie value"
        onChange={(e) => {
          setCookie('my-cookie', { someValue: e.target.value });
          setCookieVal(e.target.value);
        }}
        value={cookieVal}
      />
      <button onClick={() => bridg.blog.findFirst()}>
        run bridg request with cookie
      </button>
      <pre>{JSON.stringify(data, null, 1)}</pre>
    </div>
  ) : (
    <div>Fetch some data to get started</div>
  );
};

export default BridgExample;

function setCookie(name: string, value: any, days: number = 1) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(
    value,
  )};expires=${expires.toUTCString()};path=/`;
}
