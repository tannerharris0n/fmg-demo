import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { Tile } from '../components/common/Tile';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';

/** Fallback for routes that don't exist. */
export default function Placeholder({ title = 'Page not found', note = "That page doesn't exist or has moved." }) {
  return (
    <div className="animate-fade-in max-w-xl mx-auto mt-10">
      <Tile padded={false}>
        <EmptyState
          icon={Compass}
          title={title}
          hint={note}
          action={<Link to="/"><Button variant="primary">Back to dashboard</Button></Link>}
        />
      </Tile>
    </div>
  );
}
