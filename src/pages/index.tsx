import { useAsync } from '@/hooks/useAsync';
import db from 'bridg/app/client/db';
import { DbRules } from 'bridg/app/server/request-handler';
import { NextPage } from 'next';

const BridgExample: NextPage = ({}) => {
  const data = useAsync(() =>
    // Query your DB from the frontend 😎
    db.user.findMany({
      // filter your results
      where: {
        email: { contains: '@prisma.io' },
      },
      // include related data
      include: { blogs: true },
    }),
  );

  return data === undefined ? <GetStarted /> : <pre>{JSON.stringify(data, null, 1)}</pre>;
};

export const dbRules: DbRules = { default: true };

export default BridgExample;

const GetStarted = () => <div>Fetch some data to get started</div>;
