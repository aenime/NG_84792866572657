import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

export default function PostCard({ post }) {
  // Extract post excerpt (first 150 characters)
  const getExcerpt = (content) => {
    // Remove HTML tags
    const plainText = content.replace(/<[^>]+>/g, '');
    return plainText.length > 150
      ? `${plainText.substring(0, 150)}...`
      : plainText;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 w-full relative">
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            {format(new Date(post.published_at), 'MMM d, yyyy')}
          </span>
          
          {post.tags && post.tags.length > 0 && (
            <span className="text-xs font-medium text-primary bg-primary-light bg-opacity-20 px-2 py-1 rounded-full">
              {post.tags[0]}
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {getExcerpt(post.content)}
        </p>
        
        <Link 
          href={`/posts/${post.slug}`}
          className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center"
        >
          Read More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
