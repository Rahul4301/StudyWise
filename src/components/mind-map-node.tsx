'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface Node {
  name: string;
  children?: Node[];
  [key: string]: any;
}

interface MindMapNodeProps {
  node: Node;
  isRoot?: boolean;
}

export function MindMapNode({ node, isRoot = true }: MindMapNodeProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
  };
  
  const otherProps = Object.entries(node).filter(
    ([key]) => key !== 'name' && key !== 'children'
  );

  return (
    <div className={cn('relative flex flex-col items-start', !isRoot && 'pl-10 pt-4')}>
        {!isRoot && <div className="absolute left-2 top-0 h-full w-px bg-border -translate-y-1/2"></div>}
        {!isRoot && <div className="absolute left-2 top-1/2 h-px w-8 bg-border -translate-y-1/2"></div>}
      
      <div className="relative flex items-center gap-2 z-10">
        {hasChildren && (
          <button onClick={handleToggle} className="text-muted-foreground hover:text-foreground">
            {isExpanded ? <MinusCircle size={16} /> : <PlusCircle size={16} />}
          </button>
        )}
        <div className={cn(
            "px-4 py-2 rounded-lg shadow-sm",
            isRoot ? "bg-primary text-primary-foreground" : "bg-card border",
            hasChildren && "cursor-pointer"
        )} onClick={handleToggle}>
          <p className="font-medium">{node.name}</p>
        </div>
      </div>
      
       {otherProps.length > 0 && (
         <div className="mt-2 ml-8 flex flex-wrap gap-1">
            {otherProps.map(([key, value]) => (
                <Badge variant="secondary" key={key}>
                    <span className="font-semibold mr-1">{key}:</span>
                    <span>{String(value)}</span>
                </Badge>
            ))}
         </div>
       )}

      {hasChildren && isExpanded && (
        <div className="flex flex-col items-start">
          {node.children?.map((child, index) => (
            <MindMapNode key={index} node={child} isRoot={false} />
          ))}
        </div>
      )}
    </div>
  );
}
